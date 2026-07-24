"""Tests for removing items (spec §27 – Odebrání)."""

from __future__ import annotations

import pytest
from pytest_homeassistant_custom_component.common import async_capture_events

from homeassistant.exceptions import ServiceValidationError

from custom_components.freezer_inventory.const import (
    DEFAULT_FREEZER_ID,
    DOMAIN,
    EVENT_ITEM_REMOVED,
    EVENT_ITEM_UPDATED,
)

from .conftest import add_item, get_items


async def _call(hass, service: str, **data):
    await hass.services.async_call(
        DOMAIN, service, {"freezer_id": DEFAULT_FREEZER_ID, **data}, blocking=True
    )


async def test_remove_whole_item(hass, setup_integration):
    events = async_capture_events(hass, EVENT_ITEM_REMOVED)
    (item_id,) = await add_item(hass)
    await _call(hass, "remove_item", item_id=item_id)
    await hass.async_block_till_done()

    assert get_items(hass) == []
    assert len(events) == 1
    assert events[0].data["item_id"] == item_id


async def test_remove_half(hass, setup_integration):
    events = async_capture_events(hass, EVENT_ITEM_UPDATED)
    (item_id,) = await add_item(hass, weight=500)
    await _call(hass, "remove_half", item_id=item_id)
    await hass.async_block_till_done()

    item = get_items(hass)[0]
    assert item["weight"] == 250
    assert item["original_weight"] == 500

    assert len(events) == 1
    assert events[0].data["old_weight"] == 500
    assert events[0].data["new_weight"] == 250
    assert events[0].data["removed_weight"] == 250


async def test_remove_half_mathematical_rounding(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=501)
    await _call(hass, "remove_half", item_id=item_id)
    item = get_items(hass)[0]
    assert item["weight"] == 251  # 501 / 2 = 250.5 → 251 (not banker's 250)
    assert item["original_weight"] == 501


async def test_remove_half_without_weight(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=None)
    with pytest.raises(ServiceValidationError):
        await _call(hass, "remove_half", item_id=item_id)
    assert get_items(hass)[0]["weight"] is None


async def test_remove_amount_partial(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500)
    await _call(hass, "remove_amount", item_id=item_id, amount=150)
    item = get_items(hass)[0]
    assert item["weight"] == 350
    assert item["original_weight"] == 500


async def test_remove_amount_full_removes_item(hass, setup_integration):
    events = async_capture_events(hass, EVENT_ITEM_REMOVED)
    (item_id,) = await add_item(hass, weight=500)
    await _call(hass, "remove_amount", item_id=item_id, amount=500)
    await hass.async_block_till_done()

    assert get_items(hass) == []
    assert len(events) == 1


async def test_remove_amount_too_large(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500)
    with pytest.raises(ServiceValidationError):
        await _call(hass, "remove_amount", item_id=item_id, amount=600)
    assert get_items(hass)[0]["weight"] == 500


async def test_remove_amount_zero(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500)
    with pytest.raises(ServiceValidationError):
        await _call(hass, "remove_amount", item_id=item_id, amount=0)
    assert get_items(hass)[0]["weight"] == 500


async def test_remove_amount_without_weight(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=None)
    with pytest.raises(ServiceValidationError):
        await _call(hass, "remove_amount", item_id=item_id, amount=100)


async def test_remove_nonexistent_item(hass, setup_integration):
    with pytest.raises(ServiceValidationError):
        await _call(hass, "remove_item", item_id="does-not-exist")


async def test_restore_item_undo(hass, setup_integration):
    """Undo: a removed item can be restored with identical data."""
    (item_id,) = await add_item(hass, weight=500, note="Na řízky")
    original = get_items(hass)[0]

    coordinator = hass.data[DOMAIN]
    await coordinator.async_remove_item(DEFAULT_FREEZER_ID, item_id)
    assert get_items(hass) == []

    await coordinator.async_restore_item(DEFAULT_FREEZER_ID, original)
    restored = get_items(hass)[0]
    assert restored["id"] == item_id
    assert restored["weight"] == 500
    assert restored["note"] == "Na řízky"
    assert restored["created_at"] == original["created_at"]

    # Restoring twice must fail (item already exists)
    with pytest.raises(ServiceValidationError):
        await coordinator.async_restore_item(DEFAULT_FREEZER_ID, original)


async def test_pieces_lifecycle(hass, setup_integration):
    """Pieces: add, halve, partial removal, full removal by pieces."""
    coordinator = hass.data[DOMAIN]

    # Add with both weight and pieces
    response = await hass.services.async_call(
        DOMAIN,
        "add_item",
        {
            "freezer_id": DEFAULT_FREEZER_ID,
            "product_name": "Kuřecí řízky",
            "month": 6,
            "year": 2026,
            "weight": 1200,
            "pieces": 6,
        },
        blocking=True,
        return_response=True,
    )
    item_id = response["item_ids"][0]
    item = get_items(hass)[0]
    assert item["pieces"] == 6
    assert item["original_pieces"] == 6

    # Halving halves both measures
    await _call(hass, "remove_half", item_id=item_id)
    item = get_items(hass)[0]
    assert item["weight"] == 600
    assert item["pieces"] == 3
    assert item["original_pieces"] == 6

    # Remove 1 piece only (weight untouched)
    await _call(hass, "remove_amount", item_id=item_id, pieces=1)
    item = get_items(hass)[0]
    assert item["pieces"] == 2
    assert item["weight"] == 600

    # Combined removal: grams and pieces at once
    await _call(hass, "remove_amount", item_id=item_id, amount=100, pieces=1)
    item = get_items(hass)[0]
    assert item["weight"] == 500
    assert item["pieces"] == 1

    # Removing the last piece removes the item entirely
    await _call(hass, "remove_amount", item_id=item_id, pieces=1)
    assert get_items(hass) == []


async def test_pieces_only_item(hass, setup_integration):
    """An item can track pieces without any weight."""
    coordinator = hass.data[DOMAIN]
    items = await coordinator.async_add_item(
        DEFAULT_FREEZER_ID,
        product_name="Buchty",
        month=6,
        year=2026,
        pieces=8,
    )
    item_id = items[0].id
    item = get_items(hass)[0]
    assert item["weight"] is None
    assert item["pieces"] == 8

    # remove_half works on pieces alone
    await _call(hass, "remove_half", item_id=item_id)
    assert get_items(hass)[0]["pieces"] == 4

    # Removing grams from a weightless item fails
    with pytest.raises(ServiceValidationError):
        await _call(hass, "remove_amount", item_id=item_id, amount=100)


async def test_remove_too_many_pieces(hass, setup_integration):
    coordinator = hass.data[DOMAIN]
    items = await coordinator.async_add_item(
        DEFAULT_FREEZER_ID,
        product_name="Řízky",
        month=6,
        year=2026,
        pieces=3,
    )
    with pytest.raises(ServiceValidationError):
        await _call(hass, "remove_amount", item_id=items[0].id, pieces=4)
    assert get_items(hass)[0]["pieces"] == 3


async def test_remove_pieces_from_item_without_pieces(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500)
    with pytest.raises(ServiceValidationError):
        await _call(hass, "remove_amount", item_id=item_id, pieces=1)


async def test_update_pieces(hass, setup_integration):
    (item_id,) = await add_item(hass, weight=500)
    await hass.services.async_call(
        DOMAIN,
        "update_item",
        {
            "freezer_id": DEFAULT_FREEZER_ID,
            "item_id": item_id,
            "pieces": 4,
            "original_pieces": 4,
        },
        blocking=True,
    )
    item = get_items(hass)[0]
    assert item["pieces"] == 4
    assert item["original_pieces"] == 4
    assert item["weight"] == 500
