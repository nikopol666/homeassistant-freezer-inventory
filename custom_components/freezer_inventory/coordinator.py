"""Domain logic for Freezer Inventory.

All mutations follow the same contract: take the lock, validate the whole
request first (so an invalid request never causes a partial write), mutate the
in-memory model, persist, then fire the bus event and dispatcher signal.
"""

from __future__ import annotations

import asyncio
import logging
import uuid
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.util import dt as dt_util, slugify

from . import default_catalog
from .const import (
    CONF_CREATE_DEFAULTS,
    CONF_FREEZER_NAME,
    CONF_LANGUAGE,
    DEFAULT_FREEZER_ID,
    DEFAULT_FREEZER_NAMES,
    DEFAULT_LANGUAGE,
    DOMAIN,
    ERR_CATEGORY_NOT_FOUND,
    ERR_DUPLICATE_ID,
    ERR_FREEZER_NOT_FOUND,
    ERR_INVALID_AMOUNT,
    ERR_INVALID_MONTH,
    ERR_INVALID_NAME,
    ERR_INVALID_QUANTITY,
    ERR_INVALID_WEIGHT,
    ERR_INVALID_YEAR,
    ERR_ITEM_EXISTS,
    ERR_ITEM_NOT_FOUND,
    ERR_INVALID_PIECES,
    ERR_MISSING_PRODUCT,
    ERR_NO_PIECES,
    ERR_NO_WEIGHT,
    ERR_NOT_ENOUGH_PIECES,
    ERR_NOT_ENOUGH_WEIGHT,
    ERR_PRODUCT_NOT_FOUND,
    EVENT_ITEM_ADDED,
    EVENT_ITEM_REMOVED,
    EVENT_ITEM_UPDATED,
    MAX_MONTH,
    MAX_QUANTITY,
    MIN_MONTH,
    SIGNAL_UPDATED,
    YEAR_FUTURE_RANGE,
    YEAR_PAST_RANGE,
)
from .models import Category, Freezer, FreezerItem, Product
from .storage import FreezerStore, empty_data

_LOGGER = logging.getLogger(__name__)

_UNSET: Any = object()


class InventoryError(ServiceValidationError):
    """Validation/domain error with a stable machine-readable code."""

    def __init__(self, code: str, placeholders: dict[str, str] | None = None) -> None:
        super().__init__(
            translation_domain=DOMAIN,
            translation_key=code,
            translation_placeholders=placeholders or {},
        )
        self.code = code
        self.placeholders = placeholders or {}


def _round_half(weight: int) -> int:
    """Mathematical rounding of weight / 2 (Python's round() is banker's)."""
    return int(weight / 2 + 0.5)


class FreezerInventoryCoordinator:
    """Owns the inventory data and all operations on it."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self._store = FreezerStore(hass)
        self._lock = asyncio.Lock()
        self._freezers: dict[str, Freezer] = {}
        self._categories: list[Category] = []
        self._products: list[Product] = []
        self._settings: dict[str, Any] = {}

    # ------------------------------------------------------------------
    # Config helpers

    @property
    def language(self) -> str:
        options = self.entry.options
        data = self.entry.data
        return options.get(CONF_LANGUAGE) or data.get(CONF_LANGUAGE) or DEFAULT_LANGUAGE

    @property
    def _configured_freezer_name(self) -> str:
        options = self.entry.options
        data = self.entry.data
        return (
            options.get(CONF_FREEZER_NAME)
            or data.get(CONF_FREEZER_NAME)
            or DEFAULT_FREEZER_NAMES.get(self.language, DEFAULT_FREEZER_NAMES["en"])
        )

    # ------------------------------------------------------------------
    # Load / persist

    async def async_load(self) -> None:
        """Load stored data, seeding defaults on first run."""
        async with self._lock:
            data = await self._store.async_load()
            if data is None:
                data = empty_data()

            self._freezers = {
                freezer_id: Freezer.from_dict(freezer_id, raw)
                for freezer_id, raw in (data.get("freezers") or {}).items()
            }
            self._categories = self._load_list(
                data.get("categories") or [], Category.from_dict, "category"
            )
            self._products = self._load_list(
                data.get("products") or [], Product.from_dict, "product"
            )
            self._settings = dict(data.get("settings") or {})

            changed = False

            if not self._freezers:
                self._freezers[DEFAULT_FREEZER_ID] = Freezer(
                    id=DEFAULT_FREEZER_ID, name=self._configured_freezer_name
                )
                changed = True

            # Keep the main freezer name in sync with the config entry
            main = self._freezers.get(DEFAULT_FREEZER_ID)
            if main is not None and main.name != self._configured_freezer_name:
                main.name = self._configured_freezer_name
                changed = True

            if (
                not self._categories
                and not self._products
                and self.entry.data.get(CONF_CREATE_DEFAULTS, True)
                and not self._settings.get("defaults_seeded")
            ):
                self._seed_defaults()
                self._settings["defaults_seeded"] = True
                changed = True

            if changed:
                await self._async_save()

    @staticmethod
    def _load_list(raw_list: list, factory, kind: str) -> list:
        result = []
        for raw in raw_list:
            try:
                result.append(factory(raw))
            except (KeyError, TypeError, ValueError) as err:
                _LOGGER.warning("Skipping corrupted %s: %s (%r)", kind, err, raw)
        return result

    def _seed_defaults(self) -> None:
        language = self.language
        self._categories = [
            Category.from_dict(raw) for raw in default_catalog.default_categories(language)
        ]
        self._products = [
            Product.from_dict(raw) for raw in default_catalog.default_products(language)
        ]

    def _to_dict(self) -> dict[str, Any]:
        return {
            "freezers": {
                freezer_id: freezer.to_dict()
                for freezer_id, freezer in self._freezers.items()
            },
            "categories": [category.to_dict() for category in self._categories],
            "products": [product.to_dict() for product in self._products],
            "settings": self._settings,
        }

    async def _async_save(self) -> None:
        await self._store.async_save(self._to_dict())

    # ------------------------------------------------------------------
    # Read side

    @callback
    def freezers(self) -> list[dict[str, Any]]:
        return [
            {
                "id": freezer.id,
                "name": freezer.name,
                "icon": freezer.icon,
                "enabled": freezer.enabled,
                "item_count": len(freezer.items),
            }
            for freezer in self._freezers.values()
        ]

    @callback
    def items(self, freezer_id: str) -> list[dict[str, Any]]:
        freezer = self._get_freezer(freezer_id)
        return [
            item.to_dict() for item in sorted(freezer.items, key=lambda i: i.sort_key)
        ]

    @callback
    def categories(self) -> list[dict[str, Any]]:
        return [
            category.to_dict()
            for category in sorted(self._categories, key=lambda c: c.order)
        ]

    @callback
    def products(self) -> list[dict[str, Any]]:
        return [
            product.to_dict()
            for product in sorted(self._products, key=lambda p: p.order)
        ]

    @callback
    def summary(self, freezer_id: str) -> dict[str, Any]:
        """Summary attributes for the sensor (never the full item list)."""
        freezer = self._get_freezer(freezer_id)
        items = freezer.items
        total_known_weight = sum(item.weight for item in items if item.weight)
        without_weight = sum(1 for item in items if item.weight is None)
        oldest = min(items, key=lambda i: i.sort_key) if items else None
        return {
            "item_count": len(items),
            "total_known_weight": total_known_weight,
            "items_without_weight": without_weight,
            "oldest_item": (
                {
                    "id": oldest.id,
                    "name": oldest.product_name,
                    "month": oldest.month,
                    "year": oldest.year,
                    "weight": oldest.weight,
                }
                if oldest
                else None
            ),
        }

    # ------------------------------------------------------------------
    # Internal lookup / validation helpers

    def _get_freezer(self, freezer_id: str) -> Freezer:
        freezer = self._freezers.get(freezer_id)
        if freezer is None:
            raise InventoryError(ERR_FREEZER_NOT_FOUND, {"freezer_id": str(freezer_id)})
        return freezer

    def _get_item(self, freezer: Freezer, item_id: str) -> FreezerItem:
        for item in freezer.items:
            if item.id == item_id:
                return item
        raise InventoryError(ERR_ITEM_NOT_FOUND, {"item_id": str(item_id)})

    def _get_product(self, product_id: str) -> Product:
        for product in self._products:
            if product.id == product_id:
                return product
        raise InventoryError(ERR_PRODUCT_NOT_FOUND, {"product_id": str(product_id)})

    def _get_category(self, category_id: str) -> Category:
        for category in self._categories:
            if category.id == category_id:
                return category
        raise InventoryError(ERR_CATEGORY_NOT_FOUND, {"category_id": str(category_id)})

    @staticmethod
    def _validate_month(month: Any) -> int:
        try:
            month = int(month)
        except (TypeError, ValueError):
            raise InventoryError(ERR_INVALID_MONTH, {"month": str(month)}) from None
        if not MIN_MONTH <= month <= MAX_MONTH:
            raise InventoryError(ERR_INVALID_MONTH, {"month": str(month)})
        return month

    @staticmethod
    def _validate_year(year: Any) -> int:
        try:
            year = int(year)
        except (TypeError, ValueError):
            raise InventoryError(ERR_INVALID_YEAR, {"year": str(year)}) from None
        current = dt_util.now().year
        if not current - YEAR_PAST_RANGE <= year <= current + YEAR_FUTURE_RANGE:
            raise InventoryError(ERR_INVALID_YEAR, {"year": str(year)})
        return year

    @staticmethod
    def _validate_weight(weight: Any) -> int | None:
        if weight is None:
            return None
        try:
            weight = int(weight)
        except (TypeError, ValueError):
            raise InventoryError(ERR_INVALID_WEIGHT, {"weight": str(weight)}) from None
        if weight <= 0:
            raise InventoryError(ERR_INVALID_WEIGHT, {"weight": str(weight)})
        return weight

    @staticmethod
    def _validate_pieces(pieces: Any) -> int | None:
        if pieces is None:
            return None
        try:
            pieces = int(pieces)
        except (TypeError, ValueError):
            raise InventoryError(ERR_INVALID_PIECES, {"pieces": str(pieces)}) from None
        if pieces <= 0:
            raise InventoryError(ERR_INVALID_PIECES, {"pieces": str(pieces)})
        return pieces

    @staticmethod
    def _validate_name(name: Any) -> str:
        name = str(name or "").strip()
        if not name:
            raise InventoryError(ERR_INVALID_NAME)
        return name

    # ------------------------------------------------------------------
    # Notifications

    def _fire(self, event_type: str, data: dict[str, Any]) -> None:
        self.hass.bus.async_fire(event_type, data)

    def _notify_items(self, freezer_id: str) -> None:
        async_dispatcher_send(
            self.hass,
            SIGNAL_UPDATED,
            {
                "type": "items",
                "freezer_id": freezer_id,
                "items": self.items(freezer_id),
            },
        )

    def _notify_catalog(self) -> None:
        async_dispatcher_send(self.hass, SIGNAL_UPDATED, {"type": "catalog"})

    def _notify_freezers(self) -> None:
        async_dispatcher_send(self.hass, SIGNAL_UPDATED, {"type": "freezers"})

    # ------------------------------------------------------------------
    # Item mutations

    async def async_add_item(
        self,
        freezer_id: str,
        *,
        product_id: str | None = None,
        product_name: str | None = None,
        month: Any,
        year: Any,
        weight: Any = None,
        pieces: Any = None,
        note: str = "",
        quantity: int = 1,
    ) -> list[FreezerItem]:
        """Add one or more identical packages. Returns the created items."""
        async with self._lock:
            freezer = self._get_freezer(freezer_id)
            month = self._validate_month(month)
            year = self._validate_year(year)
            weight = self._validate_weight(weight)
            pieces = self._validate_pieces(pieces)

            try:
                quantity = int(quantity)
            except (TypeError, ValueError):
                raise InventoryError(
                    ERR_INVALID_QUANTITY, {"quantity": str(quantity)}
                ) from None
            if not 1 <= quantity <= MAX_QUANTITY:
                raise InventoryError(ERR_INVALID_QUANTITY, {"quantity": str(quantity)})

            category_id: str | None = None
            category_name: str | None = None
            if product_id is not None:
                product = self._get_product(product_id)
                if product_name is None:
                    product_name = product.name
                if product.category_id:
                    category_id = product.category_id
                    for category in self._categories:
                        if category.id == category_id:
                            category_name = category.name
                            break
            elif product_name is None:
                raise InventoryError(ERR_MISSING_PRODUCT)

            product_name = self._validate_name(product_name)
            note = str(note or "").strip()
            now = dt_util.now().isoformat()

            created = [
                FreezerItem(
                    id=str(uuid.uuid4()),
                    product_id=product_id,
                    product_name=product_name,
                    category_id=category_id,
                    category_name=category_name,
                    month=month,
                    year=year,
                    weight=weight,
                    original_weight=weight,
                    pieces=pieces,
                    original_pieces=pieces,
                    note=note,
                    created_at=now,
                    updated_at=now,
                )
                for _ in range(quantity)
            ]
            freezer.items.extend(created)
            await self._async_save()

        for item in created:
            self._fire(
                EVENT_ITEM_ADDED,
                {
                    "freezer_id": freezer_id,
                    "item_id": item.id,
                    "product_name": item.product_name,
                    "month": item.month,
                    "year": item.year,
                    "weight": item.weight,
                    "pieces": item.pieces,
                },
            )
        self._notify_items(freezer_id)
        return created

    async def async_remove_item(self, freezer_id: str, item_id: str) -> FreezerItem:
        """Remove a whole item. Returns the removed item (for undo)."""
        async with self._lock:
            freezer = self._get_freezer(freezer_id)
            item = self._get_item(freezer, item_id)
            freezer.items.remove(item)
            await self._async_save()

        self._fire(
            EVENT_ITEM_REMOVED,
            {
                "freezer_id": freezer_id,
                "item_id": item.id,
                "product_name": item.product_name,
                "month": item.month,
                "year": item.year,
                "weight": item.weight,
            },
        )
        self._notify_items(freezer_id)
        return item

    async def async_remove_half(self, freezer_id: str, item_id: str) -> FreezerItem:
        """Halve the current weight and/or pieces (mathematical rounding)."""
        async with self._lock:
            freezer = self._get_freezer(freezer_id)
            item = self._get_item(freezer, item_id)
            if item.weight is None and item.pieces is None:
                raise InventoryError(ERR_NO_WEIGHT)
            old_weight = item.weight
            old_pieces = item.pieces
            if item.weight is not None:
                item.weight = _round_half(item.weight)
            if item.pieces is not None:
                item.pieces = _round_half(item.pieces)
            item.updated_at = dt_util.now().isoformat()
            await self._async_save()

        self._fire(
            EVENT_ITEM_UPDATED,
            {
                "freezer_id": freezer_id,
                "item_id": item.id,
                "product_name": item.product_name,
                "old_weight": old_weight,
                "new_weight": item.weight,
                "removed_weight": (
                    old_weight - item.weight if old_weight is not None else None
                ),
                "old_pieces": old_pieces,
                "new_pieces": item.pieces,
            },
        )
        self._notify_items(freezer_id)
        return item

    async def async_remove_amount(
        self,
        freezer_id: str,
        item_id: str,
        amount: Any = None,
        pieces: Any = None,
    ) -> FreezerItem | None:
        """Remove a specific weight and/or number of pieces.

        Removing the full weight or all pieces removes the whole item.
        Returns the updated item, or None if the item was removed.
        """
        async with self._lock:
            freezer = self._get_freezer(freezer_id)
            item = self._get_item(freezer, item_id)

            if amount is None and pieces is None:
                raise InventoryError(ERR_INVALID_AMOUNT, {"amount": "-"})

            if amount is not None:
                if item.weight is None:
                    raise InventoryError(ERR_NO_WEIGHT)
                try:
                    amount = int(amount)
                except (TypeError, ValueError):
                    raise InventoryError(
                        ERR_INVALID_AMOUNT, {"amount": str(amount)}
                    ) from None
                if amount <= 0:
                    raise InventoryError(ERR_INVALID_AMOUNT, {"amount": str(amount)})
                if amount > item.weight:
                    raise InventoryError(
                        ERR_NOT_ENOUGH_WEIGHT,
                        {"amount": str(amount), "weight": str(item.weight)},
                    )

            if pieces is not None:
                if item.pieces is None:
                    raise InventoryError(ERR_NO_PIECES)
                try:
                    pieces = int(pieces)
                except (TypeError, ValueError):
                    raise InventoryError(
                        ERR_INVALID_PIECES, {"pieces": str(pieces)}
                    ) from None
                if pieces <= 0:
                    raise InventoryError(ERR_INVALID_PIECES, {"pieces": str(pieces)})
                if pieces > item.pieces:
                    raise InventoryError(
                        ERR_NOT_ENOUGH_PIECES,
                        {"pieces": str(pieces), "count": str(item.pieces)},
                    )

            old_weight = item.weight
            old_pieces = item.pieces
            removed_entirely = (amount is not None and amount == item.weight) or (
                pieces is not None and pieces == item.pieces
            )
            if removed_entirely:
                freezer.items.remove(item)
            else:
                if amount is not None:
                    item.weight = (item.weight or 0) - amount
                if pieces is not None:
                    item.pieces = (item.pieces or 0) - pieces
                item.updated_at = dt_util.now().isoformat()
            await self._async_save()

        if removed_entirely:
            self._fire(
                EVENT_ITEM_REMOVED,
                {
                    "freezer_id": freezer_id,
                    "item_id": item.id,
                    "product_name": item.product_name,
                    "month": item.month,
                    "year": item.year,
                    "weight": old_weight,
                    "pieces": old_pieces,
                },
            )
        else:
            self._fire(
                EVENT_ITEM_UPDATED,
                {
                    "freezer_id": freezer_id,
                    "item_id": item.id,
                    "product_name": item.product_name,
                    "old_weight": old_weight,
                    "new_weight": item.weight,
                    "removed_weight": amount,
                    "old_pieces": old_pieces,
                    "new_pieces": item.pieces,
                    "removed_pieces": pieces,
                },
            )
        self._notify_items(freezer_id)
        return None if removed_entirely else item

    async def async_update_item(
        self,
        freezer_id: str,
        item_id: str,
        *,
        product_id: Any = _UNSET,
        product_name: Any = _UNSET,
        month: Any = _UNSET,
        year: Any = _UNSET,
        weight: Any = _UNSET,
        original_weight: Any = _UNSET,
        pieces: Any = _UNSET,
        original_pieces: Any = _UNSET,
        note: Any = _UNSET,
    ) -> FreezerItem:
        """Update only the provided fields of an item."""
        async with self._lock:
            freezer = self._get_freezer(freezer_id)
            item = self._get_item(freezer, item_id)

            # Validate everything before touching the item (no partial writes)
            if month is not _UNSET:
                month = self._validate_month(month)
            if year is not _UNSET:
                year = self._validate_year(year)
            if weight is not _UNSET:
                weight = self._validate_weight(weight)
            if original_weight is not _UNSET:
                original_weight = self._validate_weight(original_weight)
            if pieces is not _UNSET:
                pieces = self._validate_pieces(pieces)
            if original_pieces is not _UNSET:
                original_pieces = self._validate_pieces(original_pieces)
            if product_name is not _UNSET:
                product_name = self._validate_name(product_name)
            new_product: Product | None = None
            if product_id is not _UNSET and product_id is not None:
                new_product = self._get_product(product_id)

            old_weight = item.weight

            if month is not _UNSET:
                item.month = month
            if year is not _UNSET:
                item.year = year
            if weight is not _UNSET:
                item.weight = weight
            if original_weight is not _UNSET:
                item.original_weight = original_weight
            if pieces is not _UNSET:
                item.pieces = pieces
            if original_pieces is not _UNSET:
                item.original_pieces = original_pieces
            if note is not _UNSET:
                item.note = str(note or "").strip()
            if new_product is not None:
                item.product_id = new_product.id
                if product_name is _UNSET:
                    item.product_name = new_product.name
                item.category_id = new_product.category_id
                item.category_name = next(
                    (
                        category.name
                        for category in self._categories
                        if category.id == new_product.category_id
                    ),
                    None,
                )
            elif product_id is not _UNSET:
                item.product_id = None
            if product_name is not _UNSET:
                item.product_name = product_name

            item.updated_at = dt_util.now().isoformat()
            await self._async_save()

        self._fire(
            EVENT_ITEM_UPDATED,
            {
                "freezer_id": freezer_id,
                "item_id": item.id,
                "product_name": item.product_name,
                "old_weight": old_weight,
                "new_weight": item.weight,
                "removed_weight": (
                    old_weight - item.weight
                    if old_weight is not None and item.weight is not None
                    else None
                ),
            },
        )
        self._notify_items(freezer_id)
        return item

    async def async_move_item(
        self, item_id: str, source_freezer_id: str, target_freezer_id: str
    ) -> None:
        """Move an item between freezers."""
        async with self._lock:
            source = self._get_freezer(source_freezer_id)
            target = self._get_freezer(target_freezer_id)
            item = self._get_item(source, item_id)
            if source is not target:
                source.items.remove(item)
                target.items.append(item)
                item.updated_at = dt_util.now().isoformat()
                await self._async_save()

        self._notify_items(source_freezer_id)
        if source_freezer_id != target_freezer_id:
            self._notify_items(target_freezer_id)

    async def async_restore_item(
        self, freezer_id: str, item_data: dict[str, Any]
    ) -> FreezerItem:
        """Re-insert a previously removed item (undo)."""
        async with self._lock:
            freezer = self._get_freezer(freezer_id)
            try:
                item = FreezerItem.from_dict(item_data)
            except (KeyError, TypeError, ValueError) as err:
                raise InventoryError(ERR_INVALID_NAME) from err
            self._validate_month(item.month)
            self._validate_year(item.year)
            if any(existing.id == item.id for existing in freezer.items):
                raise InventoryError(ERR_ITEM_EXISTS, {"item_id": item.id})
            item.updated_at = dt_util.now().isoformat()
            freezer.items.append(item)
            await self._async_save()

        self._fire(
            EVENT_ITEM_ADDED,
            {
                "freezer_id": freezer_id,
                "item_id": item.id,
                "product_name": item.product_name,
                "month": item.month,
                "year": item.year,
                "weight": item.weight,
            },
        )
        self._notify_items(freezer_id)
        return item

    # ------------------------------------------------------------------
    # Catalog mutations

    def _unique_id(self, base: str, existing: set[str]) -> str:
        candidate = slugify(base) or str(uuid.uuid4())[:8]
        result = candidate
        suffix = 2
        while result in existing:
            result = f"{candidate}_{suffix}"
            suffix += 1
        return result

    async def async_add_category(
        self,
        name: str,
        *,
        icon: str = "mdi:food",
        color: str | None = None,
        max_months: Any = None,
    ) -> Category:
        async with self._lock:
            name = self._validate_name(name)
            category = Category(
                id=self._unique_id(name, {c.id for c in self._categories}),
                name=name,
                icon=icon or "mdi:food",
                color=str(color) if color else None,
                order=max((c.order for c in self._categories), default=0) + 1,
                max_months=self._validate_weight(max_months),
            )
            self._categories.append(category)
            await self._async_save()
        self._notify_catalog()
        return category

    async def async_update_category(self, category_id: str, **changes: Any) -> Category:
        async with self._lock:
            category = self._get_category(category_id)
            if "name" in changes:
                category.name = self._validate_name(changes["name"])
            if "icon" in changes and changes["icon"]:
                category.icon = str(changes["icon"])
            if "color" in changes:
                color = changes["color"]
                category.color = str(color) if color else None
            if "enabled" in changes:
                category.enabled = bool(changes["enabled"])
            if "max_months" in changes:
                category.max_months = self._validate_weight(changes["max_months"])
            await self._async_save()
        self._notify_catalog()
        return category

    async def async_delete_category(self, category_id: str) -> None:
        async with self._lock:
            category = self._get_category(category_id)
            self._categories.remove(category)
            for product in self._products:
                if product.category_id == category_id:
                    product.category_id = None
            await self._async_save()
        self._notify_catalog()

    async def async_reorder_categories(self, category_ids: list[str]) -> None:
        async with self._lock:
            known = {category.id for category in self._categories}
            for category_id in category_ids:
                if category_id not in known:
                    raise InventoryError(
                        ERR_CATEGORY_NOT_FOUND, {"category_id": category_id}
                    )
            order_map = {cid: index for index, cid in enumerate(category_ids, start=1)}
            fallback = len(category_ids) + 1
            for category in self._categories:
                category.order = order_map.get(category.id, fallback)
            await self._async_save()
        self._notify_catalog()

    async def async_add_product(
        self,
        name: str,
        *,
        category_id: str | None = None,
        icon: str = "mdi:food",
        default_weight: Any = None,
        quick_weights: list[Any] | None = None,
        quick_pieces: list[Any] | None = None,
        ask_for_weight: bool = True,
    ) -> Product:
        async with self._lock:
            name = self._validate_name(name)
            if category_id is not None:
                self._get_category(category_id)
            product = Product(
                id=self._unique_id(name, {p.id for p in self._products}),
                name=name,
                category_id=category_id,
                icon=icon or "mdi:food",
                default_weight=self._validate_weight(default_weight),
                quick_weights=[
                    w for w in (self._validate_weight(q) for q in quick_weights or []) if w
                ],
                quick_pieces=[
                    p for p in (self._validate_pieces(q) for q in quick_pieces or []) if p
                ],
                ask_for_weight=bool(ask_for_weight),
                order=max((p.order for p in self._products), default=0) + 1,
            )
            self._products.append(product)
            await self._async_save()
        self._notify_catalog()
        return product

    async def async_update_product(self, product_id: str, **changes: Any) -> Product:
        async with self._lock:
            product = self._get_product(product_id)
            if "name" in changes:
                product.name = self._validate_name(changes["name"])
            if "category_id" in changes:
                category_id = changes["category_id"]
                if category_id is not None:
                    self._get_category(category_id)
                product.category_id = category_id
            if "icon" in changes and changes["icon"]:
                product.icon = str(changes["icon"])
            if "default_weight" in changes:
                product.default_weight = self._validate_weight(changes["default_weight"])
            if "quick_weights" in changes:
                product.quick_weights = [
                    w
                    for w in (
                        self._validate_weight(q)
                        for q in changes["quick_weights"] or []
                    )
                    if w
                ]
            if "quick_pieces" in changes:
                product.quick_pieces = [
                    p
                    for p in (
                        self._validate_pieces(q)
                        for q in changes["quick_pieces"] or []
                    )
                    if p
                ]
            if "ask_for_weight" in changes:
                product.ask_for_weight = bool(changes["ask_for_weight"])
            if "enabled" in changes:
                product.enabled = bool(changes["enabled"])
            await self._async_save()
        self._notify_catalog()
        return product

    async def async_delete_product(self, product_id: str) -> None:
        async with self._lock:
            product = self._get_product(product_id)
            self._products.remove(product)
            await self._async_save()
        self._notify_catalog()

    async def async_reorder_products(self, product_ids: list[str]) -> None:
        async with self._lock:
            known = {product.id for product in self._products}
            for product_id in product_ids:
                if product_id not in known:
                    raise InventoryError(
                        ERR_PRODUCT_NOT_FOUND, {"product_id": product_id}
                    )
            order_map = {pid: index for index, pid in enumerate(product_ids, start=1)}
            fallback = len(product_ids) + 1
            for product in self._products:
                product.order = order_map.get(product.id, fallback)
            await self._async_save()
        self._notify_catalog()

    async def async_restore_default_catalog(self) -> None:
        """Restore the default catalog. Never touches freezer items."""
        async with self._lock:
            self._seed_defaults()
            self._settings["defaults_seeded"] = True
            await self._async_save()
        self._notify_catalog()
