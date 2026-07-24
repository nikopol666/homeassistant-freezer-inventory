"""The Freezer Inventory integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from . import frontend, services, websocket
from .const import DOMAIN
from .coordinator import FreezerInventoryCoordinator

PLATFORMS = [Platform.SENSOR]

type FreezerConfigEntry = ConfigEntry[FreezerInventoryCoordinator]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the integration (runs once per HA start)."""
    websocket.async_register_commands(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: FreezerConfigEntry) -> bool:
    """Set up Freezer Inventory from a config entry."""
    coordinator = FreezerInventoryCoordinator(hass, entry)
    await coordinator.async_load()
    entry.runtime_data = coordinator
    hass.data[DOMAIN] = coordinator

    await frontend.async_register_frontend(hass)
    services.async_register_services(hass)

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: FreezerConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data.pop(DOMAIN, None)
    return unload_ok
