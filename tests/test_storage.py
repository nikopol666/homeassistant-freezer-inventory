"""Storage tests: persistence, concurrency, corruption tolerance."""

from __future__ import annotations

import asyncio

from custom_components.freezer_inventory.const import (
    DEFAULT_FREEZER_ID,
    DOMAIN,
    STORAGE_KEY,
)

from .conftest import add_item, get_items


async def test_data_survives_reload(hass, setup_integration, hass_storage):
    (item_id,) = await add_item(hass, weight=500)

    stored = hass_storage[STORAGE_KEY]["data"]
    assert len(stored["freezers"][DEFAULT_FREEZER_ID]["items"]) == 1

    await hass.config_entries.async_reload(setup_integration.entry_id)
    await hass.async_block_till_done()

    items = get_items(hass)
    assert len(items) == 1
    assert items[0]["id"] == item_id
    assert items[0]["weight"] == 500


async def test_loads_preseeded_storage(hass, mock_entry, hass_storage):
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "minor_version": 1,
        "key": STORAGE_KEY,
        "data": {
            "freezers": {
                DEFAULT_FREEZER_ID: {
                    "name": "Mrazák",
                    "icon": "mdi:snowflake",
                    "enabled": True,
                    "items": [
                        {
                            "id": "abc-123",
                            "product_id": None,
                            "product_name": "Vepřová kýta",
                            "month": 5,
                            "year": 2026,
                            "weight": 800,
                            "original_weight": 800,
                            "unit": "g",
                            "note": "",
                            "created_at": "2026-05-01T10:00:00+02:00",
                            "updated_at": "2026-05-01T10:00:00+02:00",
                        }
                    ],
                }
            },
            "categories": [],
            "products": [],
            "settings": {"defaults_seeded": True},
        },
    }
    mock_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(mock_entry.entry_id)
    await hass.async_block_till_done()

    items = get_items(hass)
    assert len(items) == 1
    assert items[0]["product_name"] == "Vepřová kýta"
    # defaults were already seeded → catalog stays as stored (empty)
    assert hass.data[DOMAIN].products() == []


async def test_concurrent_writes(hass, setup_integration):
    coordinator = hass.data[DOMAIN]
    await asyncio.gather(
        *(
            coordinator.async_add_item(
                DEFAULT_FREEZER_ID,
                product_name=f"Položka {i}",
                month=6,
                year=2026,
                weight=100,
            )
            for i in range(20)
        )
    )
    assert len(get_items(hass)) == 20


async def test_corrupted_optional_field_degrades(hass, mock_entry, hass_storage):
    """A corrupted optional field must not crash setup or drop the item."""
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "minor_version": 1,
        "key": STORAGE_KEY,
        "data": {
            "freezers": {
                DEFAULT_FREEZER_ID: {
                    "name": "Mrazák",
                    "items": [
                        {
                            "id": "bad-weight",
                            "product_name": "Kuřecí prsa",
                            "month": 6,
                            "year": 2026,
                            "weight": "abc",  # corrupted
                            # note + unit missing entirely
                        },
                        {
                            # completely broken item (missing product_name) is skipped
                            "id": "broken",
                            "month": 6,
                        },
                    ],
                }
            },
            "categories": [],
            "products": [],
            "settings": {"defaults_seeded": True},
        },
    }
    mock_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(mock_entry.entry_id)
    await hass.async_block_till_done()

    items = get_items(hass)
    assert len(items) == 1
    assert items[0]["id"] == "bad-weight"
    assert items[0]["weight"] is None
    assert items[0]["unit"] == "g"
    assert items[0]["note"] == ""


async def test_items_sorted_oldest_first(hass, setup_integration):
    await add_item(hass, product_name="Novější", month=7, year=2026, weight=None)
    await add_item(hass, product_name="Nejstarší", month=3, year=2025, weight=None)
    await add_item(hass, product_name="Střední", month=12, year=2025, weight=None)

    names = [item["product_name"] for item in get_items(hass)]
    assert names == ["Nejstarší", "Střední", "Novější"]
