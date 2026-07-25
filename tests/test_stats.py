"""History log and statistics tests."""

from __future__ import annotations

from custom_components.freezer_inventory.const import DEFAULT_FREEZER_ID, DOMAIN

from .conftest import add_item, get_items


async def test_stats_current_composition(hass, setup_integration):
    await add_item(hass, product_id="chicken_breast", product_name=None, weight=500)
    await add_item(hass, product_id="chicken_breast", product_name=None, weight=750)
    await add_item(hass, product_id="pork_leg", product_name=None, weight=800)
    await add_item(hass, product_name="Bez kategorie", weight=None)

    stats = hass.data[DOMAIN].stats(DEFAULT_FREEZER_ID)
    current = stats["current"]
    assert current["item_count"] == 4
    assert current["total_weight"] == 2050
    assert current["items_without_weight"] == 1
    assert current["avg_age_months"] is not None

    chicken = next(
        c for c in current["categories"] if c["category_id"] == "chicken"
    )
    assert chicken["count"] == 2
    assert chicken["weight"] == 1250


async def test_stats_monthly_consumption(hass, setup_integration):
    coordinator = hass.data[DOMAIN]
    (item_id,) = await add_item(hass, weight=500)
    await hass.services.async_call(
        DOMAIN,
        "remove_amount",
        {"freezer_id": DEFAULT_FREEZER_ID, "item_id": item_id, "amount": 200},
        blocking=True,
    )
    await hass.services.async_call(
        DOMAIN,
        "remove_item",
        {"freezer_id": DEFAULT_FREEZER_ID, "item_id": item_id},
        blocking=True,
    )

    stats = coordinator.stats(DEFAULT_FREEZER_ID)
    assert len(stats["monthly"]) == 1
    month = stats["monthly"][0]
    assert month["added_count"] == 1
    assert month["added_weight"] == 500
    assert month["removed_count"] == 2  # partial + full removal
    assert month["removed_weight"] == 500  # 200 + remaining 300
    assert month["removed_by_category"] == {"_none": 500}


async def test_undo_erases_removal_from_history(hass, setup_integration):
    coordinator = hass.data[DOMAIN]
    (item_id,) = await add_item(hass, weight=500)
    original = get_items(hass)[0]

    await coordinator.async_remove_item(DEFAULT_FREEZER_ID, item_id)
    stats = coordinator.stats(DEFAULT_FREEZER_ID)
    assert stats["monthly"][0]["removed_count"] == 1

    await coordinator.async_restore_item(DEFAULT_FREEZER_ID, original)
    stats = coordinator.stats(DEFAULT_FREEZER_ID)
    assert stats["monthly"][0]["removed_count"] == 0
    assert stats["monthly"][0]["added_count"] == 1  # only the original add


async def test_history_survives_reload(hass, setup_integration, hass_storage):
    (item_id,) = await add_item(hass, weight=500)
    await hass.config_entries.async_reload(setup_integration.entry_id)
    await hass.async_block_till_done()

    stats = hass.data[DOMAIN].stats()
    assert stats["monthly"][0]["added_count"] == 1


async def test_stats_websocket(hass, setup_integration, hass_ws_client):
    await add_item(hass, weight=500)
    client = await hass_ws_client(hass)
    await client.send_json(
        {"id": 1, "type": f"{DOMAIN}/get_stats", "freezer_id": DEFAULT_FREEZER_ID}
    )
    msg = await client.receive_json()
    assert msg["success"]
    assert msg["result"]["current"]["item_count"] == 1
    assert len(msg["result"]["monthly"]) == 1


async def test_weight_sensor(hass, setup_integration):
    await add_item(hass, weight=500)
    await add_item(hass, product_name="Stehna", weight=300)
    await hass.async_block_till_done()

    state = hass.states.get("sensor.mrazak_hmotnost")
    assert state is not None
    assert state.state == "800"
    assert state.attributes["unit_of_measurement"] == "g"
    assert state.attributes["state_class"] == "measurement"


async def test_move_item_between_freezers(hass, setup_integration):
    coordinator = hass.data[DOMAIN]
    freezer = await coordinator.async_add_freezer("Sklep")
    (item_id,) = await add_item(hass, weight=500)

    await hass.services.async_call(
        DOMAIN,
        "move_item",
        {
            "item_id": item_id,
            "source_freezer_id": DEFAULT_FREEZER_ID,
            "target_freezer_id": freezer.id,
        },
        blocking=True,
    )
    assert get_items(hass, DEFAULT_FREEZER_ID) == []
    moved = coordinator.items(freezer.id)
    assert len(moved) == 1
    assert moved[0]["id"] == item_id


async def test_export_import_roundtrip(hass, setup_integration):
    coordinator = hass.data[DOMAIN]
    (item_id,) = await add_item(hass, weight=500, note="Na řízky")

    export = coordinator.export_data()
    assert any(f["id"] == DEFAULT_FREEZER_ID for f in export["freezers"])
    assert len(export["products"]) > 0

    # Wipe everything via replace-import of an empty-ish structure, then restore
    await coordinator.async_remove_item(DEFAULT_FREEZER_ID, item_id)
    assert get_items(hass) == []

    await coordinator.async_import_data(export, "replace")
    items = get_items(hass)
    assert len(items) == 1
    assert items[0]["id"] == item_id
    assert items[0]["note"] == "Na řízky"


async def test_import_merge_keeps_existing(hass, setup_integration):
    coordinator = hass.data[DOMAIN]
    (existing_id,) = await add_item(hass, weight=500)
    export = coordinator.export_data()

    (second_id,) = await add_item(hass, product_name="Nové po exportu", weight=300)
    await coordinator.async_import_data(export, "merge")

    ids = {item["id"] for item in get_items(hass)}
    assert ids == {existing_id, second_id}  # nothing duplicated, nothing lost


async def test_import_invalid_data(hass, setup_integration):
    import pytest
    from homeassistant.exceptions import ServiceValidationError

    coordinator = hass.data[DOMAIN]
    with pytest.raises(ServiceValidationError):
        await coordinator.async_import_data({"foo": "bar"}, "merge")
