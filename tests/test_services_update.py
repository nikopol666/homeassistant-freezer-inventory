"""Tests for updating and moving items."""

from __future__ import annotations

import pytest

from homeassistant.exceptions import ServiceValidationError

from custom_components.freezer_inventory.const import DEFAULT_FREEZER_ID, DOMAIN

from .conftest import add_item, get_items


async def test_update_only_passed_fields(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500, note="původní")
    await hass.services.async_call(
        DOMAIN,
        "update_item",
        {
            "freezer_id": DEFAULT_FREEZER_ID,
            "item_id": item_id,
            "weight": 350,
        },
        blocking=True,
    )
    item = get_items(hass)[0]
    assert item["weight"] == 350
    assert item["original_weight"] == 500  # untouched
    assert item["note"] == "původní"  # untouched
    assert item["product_name"] == "Kuřecí prsa"  # untouched


async def test_update_all_fields(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500)
    await hass.services.async_call(
        DOMAIN,
        "update_item",
        {
            "freezer_id": DEFAULT_FREEZER_ID,
            "item_id": item_id,
            "product_name": "Kuřecí stehna",
            "month": 5,
            "year": 2025,
            "weight": 300,
            "original_weight": 600,
            "note": "Na pečení",
        },
        blocking=True,
    )
    item = get_items(hass)[0]
    assert item["product_name"] == "Kuřecí stehna"
    assert item["month"] == 5
    assert item["year"] == 2025
    assert item["weight"] == 300
    assert item["original_weight"] == 600
    assert item["note"] == "Na pečení"


async def test_update_change_product(hass, setup_integration):
    (item_id,) = await add_item(hass, product_id="chicken_breast", product_name=None)
    coordinator = hass.data[DOMAIN]
    await coordinator.async_update_item(
        DEFAULT_FREEZER_ID, item_id, product_id="pork_leg"
    )
    item = get_items(hass)[0]
    assert item["product_id"] == "pork_leg"
    assert item["product_name"] == "Vepřová kýta"
    assert item["category_id"] == "pork"
    assert item["category_name"] == "Vepřové"


async def test_update_invalid_month_no_partial_write(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500)
    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(
            DOMAIN,
            "update_item",
            {
                "freezer_id": DEFAULT_FREEZER_ID,
                "item_id": item_id,
                "weight": 100,
                "month": 99,
            },
            blocking=True,
        )
    item = get_items(hass)[0]
    assert item["weight"] == 500  # nothing was applied
    assert item["month"] == 6


async def test_update_nonexistent_item(hass, setup_integration):
    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(
            DOMAIN,
            "update_item",
            {
                "freezer_id": DEFAULT_FREEZER_ID,
                "item_id": "nope",
                "weight": 100,
            },
            blocking=True,
        )


async def test_move_item_unknown_target(hass, setup_integration):
    (item_id,) = await add_item(hass)
    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(
            DOMAIN,
            "move_item",
            {
                "item_id": item_id,
                "source_freezer_id": DEFAULT_FREEZER_ID,
                "target_freezer_id": "basement",
            },
            blocking=True,
        )
    assert len(get_items(hass)) == 1
