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


async def test_options_flow_rename(hass, setup_integration):
    result = await hass.config_entries.options.async_init(
        setup_integration.entry_id
    )
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {
            CONF_LANGUAGE: "cs",
            CONF_FREEZER_NAME: "Truhlicový mrazák",
            CONF_OLD_MONTHS: 4,
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()

    assert setup_integration.title == "Truhlicový mrazák"
    assert setup_integration.options[CONF_OLD_MONTHS] == 4

    coordinator = hass.data[DOMAIN]
    assert coordinator.freezers()[0]["name"] == "Truhlicový mrazák"
