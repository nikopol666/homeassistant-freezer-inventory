"""WebSocket API tests."""

from __future__ import annotations

from custom_components.freezer_inventory.const import DEFAULT_FREEZER_ID, DOMAIN

from .conftest import add_item


async def test_get_items(hass, setup_integration, hass_ws_client):
    await add_item(hass, weight=500)
    client = await hass_ws_client(hass)

    await client.send_json(
        {"id": 1, "type": f"{DOMAIN}/get_items", "freezer_id": DEFAULT_FREEZER_ID}
    )
    msg = await client.receive_json()
    assert msg["success"]
    assert len(msg["result"]["items"]) == 1
    assert msg["result"]["items"][0]["product_name"] == "Kuřecí prsa"


async def test_get_items_unknown_freezer(hass, setup_integration, hass_ws_client):
    client = await hass_ws_client(hass)
    await client.send_json(
        {"id": 1, "type": f"{DOMAIN}/get_items", "freezer_id": "nope"}
    )
    msg = await client.receive_json()
    assert not msg["success"]
    assert msg["error"]["code"] == "freezer_not_found"


async def test_get_products_categories_freezers_config(
    hass, setup_integration, hass_ws_client
):
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": f"{DOMAIN}/get_products"})
    msg = await client.receive_json()
    assert msg["success"]
    assert any(p["id"] == "chicken_breast" for p in msg["result"]["products"])

    await client.send_json({"id": 2, "type": f"{DOMAIN}/get_categories"})
    msg = await client.receive_json()
    assert msg["success"]
    assert any(c["id"] == "chicken" for c in msg["result"]["categories"])
    chicken = next(c for c in msg["result"]["categories"] if c["id"] == "chicken")
    assert chicken["max_months"] == 10

    await client.send_json({"id": 3, "type": f"{DOMAIN}/get_freezers"})
    msg = await client.receive_json()
    assert msg["success"]
    assert msg["result"]["freezers"][0]["id"] == DEFAULT_FREEZER_ID

    await client.send_json({"id": 4, "type": f"{DOMAIN}/get_config"})
    msg = await client.receive_json()
    assert msg["success"]
    assert msg["result"]["language"] == "cs"
    assert msg["result"]["default_unit"] == "g"
    assert msg["result"]["old_months"] == 6


async def test_subscribe_updates(hass, setup_integration, hass_ws_client):
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": f"{DOMAIN}/subscribe_updates"})
    msg = await client.receive_json()
    assert msg["success"]

    # Initial snapshot for the single freezer
    msg = await client.receive_json()
    assert msg["type"] == "event"
    assert msg["event"]["type"] == "items"
    assert msg["event"]["freezer_id"] == DEFAULT_FREEZER_ID
    assert msg["event"]["items"] == []

    # A mutation pushes an update
    await add_item(hass, weight=500)
    msg = await client.receive_json()
    assert msg["event"]["type"] == "items"
    assert len(msg["event"]["items"]) == 1


async def test_restore_item_over_websocket(hass, setup_integration, hass_ws_client):
    (item_id,) = await add_item(hass, weight=500)
    coordinator = hass.data[DOMAIN]
    original = coordinator.items(DEFAULT_FREEZER_ID)[0]
    await coordinator.async_remove_item(DEFAULT_FREEZER_ID, item_id)

    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": f"{DOMAIN}/restore_item",
            "freezer_id": DEFAULT_FREEZER_ID,
            "item": original,
        }
    )
    msg = await client.receive_json()
    assert msg["success"]
    assert msg["result"]["item"]["id"] == item_id
    assert len(coordinator.items(DEFAULT_FREEZER_ID)) == 1


async def test_catalog_management(hass, setup_integration, hass_ws_client):
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": f"{DOMAIN}/category/create",
            "name": "Zelenina",
            "icon": "🥕",
            "color": "#2e7d32",
            "max_months": 12,
        }
    )
    msg = await client.receive_json()
    assert msg["success"]
    category_id = msg["result"]["category"]["id"]
    assert msg["result"]["category"]["name"] == "Zelenina"
    assert msg["result"]["category"]["color"] == "#2e7d32"

    await client.send_json(
        {
            "id": 2,
            "type": f"{DOMAIN}/product/create",
            "name": "Mražený hrášek",
            "category_id": category_id,
            "default_weight": 350,
            "quick_weights": [350, 700],
        }
    )
    msg = await client.receive_json()
    assert msg["success"]
    product_id = msg["result"]["product"]["id"]

    await client.send_json(
        {
            "id": 3,
            "type": f"{DOMAIN}/product/update",
            "product_id": product_id,
            "name": "Hrášek",
            "enabled": False,
        }
    )
    msg = await client.receive_json()
    assert msg["success"]
    assert msg["result"]["product"]["name"] == "Hrášek"
    assert msg["result"]["product"]["enabled"] is False

    await client.send_json(
        {"id": 4, "type": f"{DOMAIN}/product/delete", "product_id": product_id}
    )
    msg = await client.receive_json()
    assert msg["success"]

    await client.send_json(
        {"id": 5, "type": f"{DOMAIN}/category/delete", "category_id": category_id}
    )
    msg = await client.receive_json()
    assert msg["success"]


async def test_restore_defaults_keeps_items(hass, setup_integration, hass_ws_client):
    await add_item(hass, weight=500)
    coordinator = hass.data[DOMAIN]

    # Break the catalog, then restore it
    await coordinator.async_delete_product("chicken_breast")
    assert not any(p["id"] == "chicken_breast" for p in coordinator.products())

    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": f"{DOMAIN}/restore_defaults"})
    msg = await client.receive_json()
    assert msg["success"]

    assert any(p["id"] == "chicken_breast" for p in coordinator.products())
    # Items must never be touched by a catalog restore
    assert len(coordinator.items(DEFAULT_FREEZER_ID)) == 1
