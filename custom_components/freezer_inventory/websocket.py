"""WebSocket API for the Freezer Inventory card."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import (
    CONF_DEFAULT_UNIT,
    CONF_OLD_MONTHS,
    DEFAULT_OLD_MONTHS,
    DEFAULT_UNIT,
    DOMAIN,
    SIGNAL_UPDATED,
)
from .coordinator import FreezerInventoryCoordinator, InventoryError

ERR_NOT_LOADED = "not_loaded"


def _coordinator(hass: HomeAssistant) -> FreezerInventoryCoordinator | None:
    return hass.data.get(DOMAIN)


def _require_coordinator(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg_id: int
) -> FreezerInventoryCoordinator | None:
    coordinator = _coordinator(hass)
    if coordinator is None:
        connection.send_error(
            msg_id, ERR_NOT_LOADED, "Freezer Inventory is not set up"
        )
    return coordinator


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    """Register all websocket commands (called once from async_setup)."""
    websocket_api.async_register_command(hass, ws_get_items)
    websocket_api.async_register_command(hass, ws_get_products)
    websocket_api.async_register_command(hass, ws_get_categories)
    websocket_api.async_register_command(hass, ws_get_freezers)
    websocket_api.async_register_command(hass, ws_get_config)
    websocket_api.async_register_command(hass, ws_subscribe_updates)
    websocket_api.async_register_command(hass, ws_restore_item)
    websocket_api.async_register_command(hass, ws_product_create)
    websocket_api.async_register_command(hass, ws_product_update)
    websocket_api.async_register_command(hass, ws_product_delete)
    websocket_api.async_register_command(hass, ws_products_reorder)
    websocket_api.async_register_command(hass, ws_category_create)
    websocket_api.async_register_command(hass, ws_category_update)
    websocket_api.async_register_command(hass, ws_category_delete)
    websocket_api.async_register_command(hass, ws_categories_reorder)
    websocket_api.async_register_command(hass, ws_restore_defaults)


# ----------------------------------------------------------------------
# Read commands

@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/get_items",
        vol.Required("freezer_id"): str,
    }
)
@callback
def ws_get_items(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    try:
        connection.send_result(msg["id"], {"items": coordinator.items(msg["freezer_id"])})
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/get_products"})
@callback
def ws_get_products(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    connection.send_result(msg["id"], {"products": coordinator.products()})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/get_categories"})
@callback
def ws_get_categories(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    connection.send_result(msg["id"], {"categories": coordinator.categories()})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/get_freezers"})
@callback
def ws_get_freezers(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    connection.send_result(msg["id"], {"freezers": coordinator.freezers()})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/get_config"})
@callback
def ws_get_config(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    entry = coordinator.entry
    connection.send_result(
        msg["id"],
        {
            "language": coordinator.language,
            "default_unit": entry.data.get(CONF_DEFAULT_UNIT, DEFAULT_UNIT),
            "old_months": entry.options.get(CONF_OLD_MONTHS, DEFAULT_OLD_MONTHS),
        },
    )


# ----------------------------------------------------------------------
# Subscription

@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe_updates"})
@websocket_api.async_response
async def ws_subscribe_updates(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return

    @callback
    def push(payload: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], payload))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass, SIGNAL_UPDATED, push
    )
    connection.send_result(msg["id"])
    # Initial snapshot so the card renders immediately
    for freezer in coordinator.freezers():
        push(
            {
                "type": "items",
                "freezer_id": freezer["id"],
                "items": coordinator.items(freezer["id"]),
            }
        )


# ----------------------------------------------------------------------
# Mutations used by the card

@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/restore_item",
        vol.Required("freezer_id"): str,
        vol.Required("item"): dict,
    }
)
@websocket_api.async_response
async def ws_restore_item(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    try:
        item = await coordinator.async_restore_item(msg["freezer_id"], msg["item"])
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"], {"item": item.to_dict()})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/product/create",
        vol.Required("name"): str,
        vol.Optional("category_id"): vol.Any(None, str),
        vol.Optional("icon"): str,
        vol.Optional("default_weight"): vol.Any(None, int),
        vol.Optional("quick_weights"): [int],
        vol.Optional("quick_pieces"): [int],
        vol.Optional("ask_for_weight"): bool,
    }
)
@websocket_api.async_response
async def ws_product_create(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    try:
        product = await coordinator.async_add_product(
            msg["name"],
            category_id=msg.get("category_id"),
            icon=msg.get("icon", "mdi:food"),
            default_weight=msg.get("default_weight"),
            quick_weights=msg.get("quick_weights"),
            quick_pieces=msg.get("quick_pieces"),
            ask_for_weight=msg.get("ask_for_weight", True),
        )
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"], {"product": product.to_dict()})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/product/update",
        vol.Required("product_id"): str,
        vol.Optional("name"): str,
        vol.Optional("category_id"): vol.Any(None, str),
        vol.Optional("icon"): str,
        vol.Optional("default_weight"): vol.Any(None, int),
        vol.Optional("quick_weights"): [int],
        vol.Optional("quick_pieces"): [int],
        vol.Optional("ask_for_weight"): bool,
        vol.Optional("enabled"): bool,
    }
)
@websocket_api.async_response
async def ws_product_update(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    changes = {
        key: msg[key]
        for key in (
            "name",
            "category_id",
            "icon",
            "default_weight",
            "quick_weights",
            "quick_pieces",
            "ask_for_weight",
            "enabled",
        )
        if key in msg
    }
    try:
        product = await coordinator.async_update_product(msg["product_id"], **changes)
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"], {"product": product.to_dict()})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/product/delete",
        vol.Required("product_id"): str,
    }
)
@websocket_api.async_response
async def ws_product_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    try:
        await coordinator.async_delete_product(msg["product_id"])
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/products/reorder",
        vol.Required("product_ids"): [str],
    }
)
@websocket_api.async_response
async def ws_products_reorder(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    try:
        await coordinator.async_reorder_products(msg["product_ids"])
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/category/create",
        vol.Required("name"): str,
        vol.Optional("icon"): str,
        vol.Optional("color"): vol.Any(None, str),
        vol.Optional("max_months"): vol.Any(None, int),
    }
)
@websocket_api.async_response
async def ws_category_create(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    try:
        category = await coordinator.async_add_category(
            msg["name"],
            icon=msg.get("icon", "mdi:food"),
            color=msg.get("color"),
            max_months=msg.get("max_months"),
        )
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"], {"category": category.to_dict()})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/category/update",
        vol.Required("category_id"): str,
        vol.Optional("name"): str,
        vol.Optional("icon"): str,
        vol.Optional("color"): vol.Any(None, str),
        vol.Optional("enabled"): bool,
        vol.Optional("max_months"): vol.Any(None, int),
    }
)
@websocket_api.async_response
async def ws_category_update(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    changes = {
        key: msg[key]
        for key in ("name", "icon", "color", "enabled", "max_months")
        if key in msg
    }
    try:
        category = await coordinator.async_update_category(msg["category_id"], **changes)
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"], {"category": category.to_dict()})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/category/delete",
        vol.Required("category_id"): str,
    }
)
@websocket_api.async_response
async def ws_category_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    try:
        await coordinator.async_delete_category(msg["category_id"])
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/categories/reorder",
        vol.Required("category_ids"): [str],
    }
)
@websocket_api.async_response
async def ws_categories_reorder(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    try:
        await coordinator.async_reorder_categories(msg["category_ids"])
    except InventoryError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/restore_defaults"})
@websocket_api.async_response
async def ws_restore_defaults(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if (coordinator := _require_coordinator(hass, connection, msg["id"])) is None:
        return
    await coordinator.async_restore_default_catalog()
    connection.send_result(msg["id"])
