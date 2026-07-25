"""Config flow and options flow tests."""

from __future__ import annotations

from homeassistant.data_entry_flow import FlowResultType

from custom_components.freezer_inventory.const import (
    CONF_CREATE_DEFAULTS,
    CONF_DEFAULT_UNIT,
    CONF_FREEZER_NAME,
    CONF_LANGUAGE,
    CONF_OLD_MONTHS,
    DEFAULT_FREEZER_ID,
    DOMAIN,
)


async def _start_user_flow(hass):
    return await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": "user"}
    )


async def test_first_setup_seeds_czech_defaults(hass):
    result = await _start_user_flow(hass)
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_LANGUAGE: "cs",
            CONF_FREEZER_NAME: "Mrazák",
            CONF_CREATE_DEFAULTS: True,
            CONF_DEFAULT_UNIT: "g",
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Mrazák"
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN]
    freezers = coordinator.freezers()
    assert len(freezers) == 1
    assert freezers[0]["id"] == DEFAULT_FREEZER_ID
    assert freezers[0]["name"] == "Mrazák"

    products = coordinator.products()
    categories = coordinator.categories()
    assert any(p["name"] == "Kuřecí prsa" for p in products)
    assert any(c["name"] == "Kuřecí" for c in categories)


async def test_setup_english_defaults(hass):
    result = await _start_user_flow(hass)
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_LANGUAGE: "en",
            CONF_FREEZER_NAME: "Freezer",
            CONF_CREATE_DEFAULTS: True,
            CONF_DEFAULT_UNIT: "g",
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN]
    products = coordinator.products()
    assert any(p["name"] == "Chicken breast" for p in products)
    # ids stay language-neutral
    assert any(p["id"] == "chicken_breast" for p in products)


async def test_setup_without_defaults(hass):
    result = await _start_user_flow(hass)
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_LANGUAGE: "cs",
            CONF_FREEZER_NAME: "Mrazák",
            CONF_CREATE_DEFAULTS: False,
            CONF_DEFAULT_UNIT: "g",
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN]
    assert coordinator.products() == []
    assert coordinator.categories() == []
    assert len(coordinator.freezers()) == 1


async def test_duplicate_entry_aborts(hass, setup_integration):
    result = await _start_user_flow(hass)
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def test_options_flow_settings(hass, setup_integration):
    result = await hass.config_entries.options.async_init(
        setup_integration.entry_id
    )
    assert result["type"] is FlowResultType.MENU

    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "settings"}
    )
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {CONF_LANGUAGE: "cs", CONF_OLD_MONTHS: 4},
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert setup_integration.options[CONF_OLD_MONTHS] == 4


async def test_options_flow_add_and_edit_freezer(hass, setup_integration):
    # Add a second freezer
    result = await hass.config_entries.options.async_init(
        setup_integration.entry_id
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "add_freezer"}
    )
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"name": "Truhlicový mrazák", "icon": "🧊"}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN]
    freezers = coordinator.freezers()
    assert len(freezers) == 2
    new_freezer = next(f for f in freezers if f["name"] == "Truhlicový mrazák")
    assert new_freezer["icon"] == "🧊"
    # A sensor pair exists for the new freezer after reload
    assert hass.states.get("sensor.truhlicovy_mrazak") is not None

    # Rename it
    result = await hass.config_entries.options.async_init(
        setup_integration.entry_id
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "edit_freezer"}
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"freezer": new_freezer["id"]}
    )
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"name": "Sklep", "icon": "🧊", "delete": False}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN]
    assert any(f["name"] == "Sklep" for f in coordinator.freezers())

    # Delete it (empty → allowed)
    result = await hass.config_entries.options.async_init(
        setup_integration.entry_id
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "edit_freezer"}
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"freezer": new_freezer["id"]}
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"name": "Sklep", "icon": "🧊", "delete": True}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert len(hass.data[DOMAIN].freezers()) == 1


async def test_options_flow_delete_guards(hass, setup_integration):
    from custom_components.freezer_inventory.const import DEFAULT_FREEZER_ID

    coordinator = hass.data[DOMAIN]

    # The last freezer cannot be deleted
    result = await hass.config_entries.options.async_init(
        setup_integration.entry_id
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "edit_freezer"}
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"freezer": DEFAULT_FREEZER_ID}
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"name": "Mrazák", "delete": True}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["errors"]["base"] == "last_freezer"

    # A non-empty freezer cannot be deleted
    await coordinator.async_add_freezer("Sklep")
    sklep = next(f for f in coordinator.freezers() if f["name"] == "Sklep")
    await coordinator.async_add_item(
        sklep["id"], product_name="Kuře", month=6, year=2026
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"name": "Mrazák", "delete": False}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN]
    result = await hass.config_entries.options.async_init(
        setup_integration.entry_id
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "edit_freezer"}
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"freezer": sklep["id"]}
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"name": "Sklep", "delete": True}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["errors"]["base"] == "freezer_not_empty"
