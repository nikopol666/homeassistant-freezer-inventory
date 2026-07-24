"""Setup / unload tests."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntryState

from custom_components.freezer_inventory.const import DOMAIN


async def test_setup_and_unload(hass, setup_integration):
    assert setup_integration.state is ConfigEntryState.LOADED
    assert DOMAIN in hass.data
    assert hass.services.has_service(DOMAIN, "add_item")
    assert hass.services.has_service(DOMAIN, "remove_half")

    assert await hass.config_entries.async_unload(setup_integration.entry_id)
    await hass.async_block_till_done()
    assert setup_integration.state is ConfigEntryState.NOT_LOADED
    assert DOMAIN not in hass.data


async def test_reload_is_idempotent(hass, setup_integration):
    """Reloading must not blow up on duplicate service/frontend registration."""
    assert await hass.config_entries.async_reload(setup_integration.entry_id)
    await hass.async_block_till_done()
    assert setup_integration.state is ConfigEntryState.LOADED
    assert hass.services.has_service(DOMAIN, "add_item")
