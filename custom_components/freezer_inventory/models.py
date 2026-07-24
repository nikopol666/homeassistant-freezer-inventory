"""Data models for Freezer Inventory.

All models serialize to plain JSON-safe dicts. ``from_dict`` is tolerant:
a corrupted optional field falls back to its default with a warning instead
of crashing the whole integration (spec §24).
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any

_LOGGER = logging.getLogger(__name__)


def _opt_int(data: dict[str, Any], key: str, context: str) -> int | None:
    """Read an optional positive int field, degrading gracefully."""
    value = data.get(key)
    if value is None:
        return None
    try:
        value = int(value)
    except (TypeError, ValueError):
        _LOGGER.warning(
            "Ignoring invalid value %r for %r in %s", value, key, context
        )
        return None
    return value


def _opt_str(data: dict[str, Any], key: str, default: str | None) -> str | None:
    value = data.get(key, default)
    if value is None:
        return default
    return str(value)


@dataclass(slots=True)
class FreezerItem:
    """One physical package in a freezer."""

    id: str
    product_name: str
    month: int
    year: int
    product_id: str | None = None
    category_id: str | None = None
    category_name: str | None = None
    weight: int | None = None
    original_weight: int | None = None
    pieces: int | None = None
    original_pieces: int | None = None
    unit: str = "g"
    note: str = ""
    created_at: str = ""
    updated_at: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "product_id": self.product_id,
            "product_name": self.product_name,
            "category_id": self.category_id,
            "category_name": self.category_name,
            "month": self.month,
            "year": self.year,
            "weight": self.weight,
            "original_weight": self.original_weight,
            "pieces": self.pieces,
            "original_pieces": self.original_pieces,
            "unit": self.unit,
            "note": self.note,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> FreezerItem:
        context = f"item {data.get('id', '<no id>')}"
        return cls(
            id=str(data["id"]),
            product_name=str(data["product_name"]),
            month=int(data["month"]),
            year=int(data["year"]),
            product_id=_opt_str(data, "product_id", None),
            category_id=_opt_str(data, "category_id", None),
            category_name=_opt_str(data, "category_name", None),
            weight=_opt_int(data, "weight", context),
            original_weight=_opt_int(data, "original_weight", context),
            pieces=_opt_int(data, "pieces", context),
            original_pieces=_opt_int(data, "original_pieces", context),
            unit=_opt_str(data, "unit", "g") or "g",
            note=_opt_str(data, "note", "") or "",
            created_at=_opt_str(data, "created_at", "") or "",
            updated_at=_opt_str(data, "updated_at", "") or "",
        )

    @property
    def sort_key(self) -> tuple[int, int, str, str]:
        return (self.year, self.month, self.product_name.casefold(), self.created_at)


@dataclass(slots=True)
class Category:
    """A product category preset."""

    id: str
    name: str
    icon: str = "mdi:food"
    color: str | None = None
    order: int = 0
    enabled: bool = True
    max_months: int | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "icon": self.icon,
            "color": self.color,
            "order": self.order,
            "enabled": self.enabled,
            "max_months": self.max_months,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Category:
        context = f"category {data.get('id', '<no id>')}"
        return cls(
            id=str(data["id"]),
            name=str(data["name"]),
            icon=_opt_str(data, "icon", "mdi:food") or "mdi:food",
            color=_opt_str(data, "color", None),
            order=_opt_int(data, "order", context) or 0,
            enabled=bool(data.get("enabled", True)),
            max_months=_opt_int(data, "max_months", context),
        )


@dataclass(slots=True)
class Product:
    """A product preset offered in the add-item picker."""

    id: str
    name: str
    category_id: str | None = None
    icon: str = "mdi:food"
    default_weight: int | None = None
    quick_weights: list[int] = field(default_factory=list)
    quick_pieces: list[int] = field(default_factory=list)
    ask_for_weight: bool = True
    enabled: bool = True
    order: int = 0

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "category_id": self.category_id,
            "icon": self.icon,
            "default_weight": self.default_weight,
            "quick_weights": list(self.quick_weights),
            "quick_pieces": list(self.quick_pieces),
            "ask_for_weight": self.ask_for_weight,
            "enabled": self.enabled,
            "order": self.order,
        }

    @staticmethod
    def _int_list(data: dict[str, Any], key: str, context: str) -> list[int]:
        raw = data.get(key) or []
        result: list[int] = []
        if isinstance(raw, list):
            for value in raw:
                try:
                    result.append(int(value))
                except (TypeError, ValueError):
                    _LOGGER.warning(
                        "Ignoring invalid %s value %r in %s", key, value, context
                    )
        return result

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Product:
        context = f"product {data.get('id', '<no id>')}"
        quick_weights = cls._int_list(data, "quick_weights", context)
        quick_pieces = cls._int_list(data, "quick_pieces", context)
        return cls(
            id=str(data["id"]),
            name=str(data["name"]),
            category_id=_opt_str(data, "category_id", None),
            icon=_opt_str(data, "icon", "mdi:food") or "mdi:food",
            default_weight=_opt_int(data, "default_weight", context),
            quick_weights=quick_weights,
            quick_pieces=quick_pieces,
            ask_for_weight=bool(data.get("ask_for_weight", True)),
            enabled=bool(data.get("enabled", True)),
            order=_opt_int(data, "order", context) or 0,
        )


@dataclass(slots=True)
class Freezer:
    """A freezer holding items."""

    id: str
    name: str
    icon: str = "mdi:snowflake"
    enabled: bool = True
    items: list[FreezerItem] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "icon": self.icon,
            "enabled": self.enabled,
            "items": [item.to_dict() for item in self.items],
        }

    @classmethod
    def from_dict(cls, freezer_id: str, data: dict[str, Any]) -> Freezer:
        items: list[FreezerItem] = []
        for raw in data.get("items") or []:
            try:
                items.append(FreezerItem.from_dict(raw))
            except (KeyError, TypeError, ValueError) as err:
                _LOGGER.warning(
                    "Skipping corrupted item in freezer %s: %s (%r)",
                    freezer_id,
                    err,
                    raw,
                )
        return cls(
            id=freezer_id,
            name=_opt_str(data, "name", freezer_id) or freezer_id,
            icon=_opt_str(data, "icon", "mdi:snowflake") or "mdi:snowflake",
            enabled=bool(data.get("enabled", True)),
            items=items,
        )
