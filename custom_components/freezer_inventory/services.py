"""Service registration for Freezer Inventory."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.core import (
    HomeAssistant,
    ServiceCall,
    ServiceResponse,
    SupportsResponse,
    callback,
)
import homeassistant.helpers.config_validation as cv

from .const import (
    DATA_SERVICES_REGISTERED,
    DOMAIN,
    MAX_QUANTITY,
    SERVICE_ADD_ITEM,
    SERVICE_ADD_PRODUCT,
    SERVICE_MOVE_ITEM,
    SERVICE_REMOVE_AMOUNT,
    SERVICE_REMOVE_HALF,
    SERVICE_REMOVE_ITEM,
    SERVICE_UPDATE_ITEM,
)
from .coordinator import FreezerInventoryCoordinator

ADD_ITEM_SCHEMA = vol.All(
    vol.Schema(
        {
            vol.Required("freezer_id"): cv.string,
            vol.Optional("product_id"): cv.string,
            vol.Optional("product_name"): cv.string,
            vol.Required("month"): vol.Coerce(int),
            vol.Required("year"): vol.Coerce(int),
            vol.Optional("weight"): vol.Coerce(int),
            vol.Optional("pieces"): vol.Coerce(int),
            vol.Optional("note", default=""): cv.string,
            vol.Optional("quantity", default=1): vol.All(
                vol.Coerce(int), vol.Range(min=1, max=MAX_QUANTITY)
            ),
        }
    ),
    cv.has_at_least_one_key("product_id", "product_name"),
)

REMOVE_ITEM_SCHEMA = vol.Schema(
    {
        vol.Required("freezer_id"): cv.string,
        vol.Required("item_id"): cv.string,
    }
)

REMOVE_AMOUNT_SCHEMA = vol.All(
    REMOVE_ITEM_SCHEMA.extend(
        {
            vol.Optional("amount"): vol.Coerce(int),
            vol.Optional("pieces"): vol.Coerce(int),
        }
    ),
    cv.has_at_least_one_key("amount", "pieces"),
)

UPDATE_ITEM_SCHEMA = vol.Schema(
    {
        vol.Required("freezer_id"): cv.string,
        vol.Required("item_id"): cv.string,
        vol.Optional("product_id"): vol.Any(None, cv.string),
        vol.Optional("product_name"): cv.string,
        vol.Optional("month"): vol.Coerce(int),
        vol.Optional("year"): vol.Coerce(int),
        vol.Optional("weight"): vol.Any(None, vol.Coerce(int)),
        vol.Optional("original_weight"): vol.Any(None, vol.Coerce(int)),
        vol.Optional("pieces"): vol.Any(None, vol.Coerce(int)),
        vol.Optional("original_pieces"): vol.Any(None, vol.Coerce(int)),
        vol.Optional("note"): cv.string,
    }
)

MOVE_ITEM_SCHEMA = vol.Schema(
    {
        vol.Required("item_id"): cv.string,
        vol.Required("source_freezer_id"): cv.string,
        vol.Required("target_freezer_id"): cv.string,
    }
)

ADD_PRODUCT_SCHEMA = vol.Schema(
    {
        vol.Required("name"): cv.string,
        vol.Optional("category_id"): cv.string,
        vol.Optional("icon"): cv.string,
        vol.Optional("default_weight"): vol.Coerce(int),
        vol.Optional("quick_weights"): [vol.Coerce(int)],
        vol.Optional("quick_pieces"): [vol.Coerce(int)],
        vol.Optional("ask_for_weight", default=True): cv.boolean,
    }
)

UPDATE_ITEM_FIELDS = (
    "product_id",
    "product_name",
    "month",
    "year",
    "weight",
    "original_weight",
    "pieces",
    "original_pieces",
    "note",
)


def _coordinator(hass: HomeAssistant) -> FreezerInventoryCoordinator:
    return hass.data[DOMAIN]


@callback
def async_register_services(hass: HomeAssistant) -> None:
    """Register services (idempotent across entry reloads)."""
    if hass.data.get(DATA_SERVICES_REGISTERED):
        return
    hass.data[DATA_SERVICES_REGISTERED] = True

    async def handle_add_item(call: ServiceCall) -> ServiceResponse:
        items = await _coordinator(hass).async_add_item(
            call.data["freezer_id"],
            product_id=call.data.get("product_id"),
            product_name=call.data.get("product_name"),
            month=call.data["month"],
            year=call.data["year"],
            weight=call.data.get("weight"),
            pieces=call.data.get("pieces"),
            note=call.data.get("note", ""),
            quantity=call.data.get("quantity", 1),
        )
        if call.return_response:
            return {"item_ids": [item.id for item in items]}
        return None

    async def handle_remove_item(call: ServiceCall) -> None:
        await _coordinator(hass).async_remove_item(
            call.data["freezer_id"], call.data["item_id"]
        )

    async def handle_remove_half(call: ServiceCall) -> None:
        await _coordinator(hass).async_remove_half(
            call.data["freezer_id"], call.data["item_id"]
        )

    async def handle_remove_amount(call: ServiceCall) -> None:
        await _coordinator(hass).async_remove_amount(
            call.data["freezer_id"],
            call.data["item_id"],
            amount=call.data.get("amount"),
            pieces=call.data.get("pieces"),
        )

    async def handle_update_item(call: ServiceCall) -> None:
        changes: dict[str, Any] = {
            field: call.data[field]
            for field in UPDATE_ITEM_FIELDS
            if field in call.data
        }
        await _coordinator(hass).async_update_item(
            call.data["freezer_id"], call.data["item_id"], **changes
        )

    async def handle_move_item(call: ServiceCall) -> None:
        await _coordinator(hass).async_move_item(
            call.data["item_id"],
            call.data["source_freezer_id"],
            call.data["target_freezer_id"],
        )

    async def handle_add_product(call: ServiceCall) -> None:
        await _coordinator(hass).async_add_product(
            call.data["name"],
            category_id=call.data.get("category_id"),
            icon=call.data.get("icon", "mdi:food"),
            default_weight=call.data.get("default_weight"),
            quick_weights=call.data.get("quick_weights"),
            quick_pieces=call.data.get("quick_pieces"),
            ask_for_weight=call.data.get("ask_for_weight", True),
        )

    hass.services.async_register(
        DOMAIN,
        SERVICE_ADD_ITEM,
        handle_add_item,
        schema=ADD_ITEM_SCHEMA,
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN, SERVICE_REMOVE_ITEM, handle_remove_item, schema=REMOVE_ITEM_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_REMOVE_HALF, handle_remove_half, schema=REMOVE_ITEM_SCHEMA
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_REMOVE_AMOUNT,
        handle_remove_amount,
        schema=REMOVE_AMOUNT_SCHEMA,
    )
    hass.services.async_register(
        DOMAIN, SERVICE_UPDATE_ITEM, handle_update_item, schema=UPDATE_ITEM_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_MOVE_ITEM, handle_move_item, schema=MOVE_ITEM_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_ADD_PRODUCT, handle_add_product, schema=ADD_PRODUCT_SCHEMA
    )
