"""Tests for adding items (spec §27 – Přidání)."""

from __future__ import annotations

import pytest
from pytest_homeassistant_custom_component.common import async_capture_events

from homeassistant.exceptions import ServiceValidationError

from custom_components.freezer_inventory.const import (
    DEFAULT_FREEZER_ID,
    DOMAIN,
    EVENT_ITEM_ADDED,
)

from .conftest import add_item, get_items


async def test_add_item_with_weight(hass, setup_integration):
    events = async_capture_events(hass, EVENT_ITEM_ADDED)
    item_ids = await add_item(hass, weight=500)
    await hass.async_block_till_done()

    assert len(item_ids) == 1
    items = get_items(hass)
    assert len(items) == 1
    item = items[0]
    assert item["id"] == item_ids[0]
    assert item["product_name"] == "Kuřecí prsa"
    assert item["month"] == 6
    assert item["year"] == 2026
    assert item["weight"] == 500
    assert item["original_weight"] == 500
    assert item["unit"] == "g"

    assert len(events) == 1
    assert events[0].data["item_id"] == item_ids[0]
    assert events[0].data["product_name"] == "Kuřecí prsa"
    assert events[0].data["weight"] == 500


async def test_add_item_without_weight(hass, setup_integration):
    await add_item(hass, weight=None)
    item = get_items(hass)[0]
    assert item["weight"] is None
    assert item["original_weight"] is None


async def test_add_item_with_preset_product(hass, setup_integration):
    await add_item(hass, product_id="chicken_breast", product_name=None)
    item = get_items(hass)[0]
    assert item["product_id"] == "chicken_breast"
    assert item["product_name"] == "Kuřecí prsa"
    assert item["category_id"] == "chicken"
    assert item["category_name"] == "Kuřecí"


async def test_add_custom_product(hass, setup_integration):
    await add_item(hass, product_name="  Domácí sekaná  ")
    item = get_items(hass)[0]
    assert item["product_id"] is None
    assert item["product_name"] == "Domácí sekaná"


async def test_add_item_quantity(hass, setup_integration):
    item_ids = await add_item(hass, quantity=4)
    assert len(item_ids) == 4
    assert len(set(item_ids)) == 4
    assert len(get_items(hass)) == 4


async def test_add_item_invalid_month(hass, setup_integration):
    with pytest.raises(ServiceValidationError):
        await add_item(hass, month=13)
    assert get_items(hass) == []


async def test_add_item_invalid_year(hass, setup_integration):
    with pytest.raises(ServiceValidationError):
        await add_item(hass, year=1990)
    assert get_items(hass) == []


async def test_add_item_negative_weight(hass, setup_integration):
    with pytest.raises(ServiceValidationError):
        await add_item(hass, weight=-100)
    assert get_items(hass) == []


async def test_add_item_requires_product(hass, setup_integration):
    with pytest.raises(Exception):
        await hass.services.async_call(
            DOMAIN,
            "add_item",
            {"freezer_id": DEFAULT_FREEZER_ID, "month": 6, "year": 2026},
            blocking=True,
        )
    assert get_items(hass) == []


async def test_add_item_unknown_freezer(hass, setup_integration):
    with pytest.raises(ServiceValidationError):
        await add_item(hass, freezer_id="nope")
