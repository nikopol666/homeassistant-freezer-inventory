"""Sensor tests."""

from __future__ import annotations

from custom_components.freezer_inventory.const import DEFAULT_FREEZER_ID, DOMAIN

from .conftest import add_item

SENSOR_ID = "sensor.mrazak"


async def test_sensor_counts_items(hass, setup_integration):
    state = hass.states.get(SENSOR_ID)
    assert state is not None
    assert state.state == "0"

    await add_item(hass, weight=500)
    await add_item(hass, product_name="Kuřecí stehna", weight=None)
    await hass.async_block_till_done()

    state = hass.states.get(SENSOR_ID)
    assert state.state == "2"
    assert state.attributes["item_count"] == 2
    assert state.attributes["total_known_weight"] == 500
    assert state.attributes["items_without_weight"] == 1


async def test_sensor_oldest_item(hass, setup_integration):
    await add_item(hass, product_name="Novější", month=7, year=2026, weight=None)
    await add_item(hass, product_name="Vepřová kýta", month=3, year=2026, weight=800)
    await hass.async_block_till_done()

    state = hass.states.get(SENSOR_ID)
    oldest = state.attributes["oldest_item"]
    assert oldest["name"] == "Vepřová kýta"
    assert oldest["month"] == 3
    assert oldest["year"] == 2026
    assert oldest["weight"] == 800


async def test_sensor_has_no_full_item_list(hass, setup_integration):
    """The full item list must never live in sensor attributes."""
    await add_item(hass, weight=500)
    await hass.async_block_till_done()

    state = hass.states.get(SENSOR_ID)
    assert "items" not in state.attributes


async def test_sensor_updates_after_removal(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500)
    await hass.async_block_till_done()
    assert hass.states.get(SENSOR_ID).state == "1"

    coordinator = hass.data[DOMAIN]
    await coordinator.async_remove_item(DEFAULT_FREEZER_ID, item_id)
    await hass.async_block_till_done()
    assert hass.states.get(SENSOR_ID).state == "0"
