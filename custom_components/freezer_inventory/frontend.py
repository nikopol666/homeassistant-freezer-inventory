"""Serve and auto-register the bundled Lovelace card."""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import CARD_FILENAME, CARD_URL, DATA_FRONTEND_REGISTERED, DOMAIN

_LOGGER = logging.getLogger(__name__)


async def async_register_frontend(hass: HomeAssistant) -> None:
    """Serve the card JS and register it as a Lovelace resource.

    Idempotent across config entry reloads within one HA run.
    """
    if hass.data.get(DATA_FRONTEND_REGISTERED):
        return
    hass.data[DATA_FRONTEND_REGISTERED] = True

    card_path = Path(__file__).parent / "frontend" / CARD_FILENAME
    await hass.http.async_register_static_paths(
        [StaticPathConfig(CARD_URL, str(card_path), True)]
    )

    integration = await async_get_integration(hass, DOMAIN)
    versioned_url = f"{CARD_URL}?v={integration.version}"

    try:
        await _async_register_resource(hass, versioned_url)
    except Exception:  # noqa: BLE001 - never break setup over resource registration
        _LOGGER.exception(
            "Could not register the Lovelace resource automatically; "
            "add %s as a module resource manually",
            versioned_url,
        )
        add_extra_js_url(hass, versioned_url)


async def _async_register_resource(hass: HomeAssistant, url: str) -> None:
    lovelace = hass.data.get("lovelace")
    resources = getattr(lovelace, "resources", None)

    if resources is None or not hasattr(resources, "async_create_item"):
        # YAML-mode dashboards have no writable resource collection
        add_extra_js_url(hass, url)
        return

    # CRITICAL: the collection must be loaded before it is inspected or
    # written, otherwise existing user resources can be wiped (core #165767).
    if not resources.loaded:
        await resources.async_load()
        resources.loaded = True

    for resource in resources.async_items():
        if resource["url"].split("?")[0] == CARD_URL:
            if resource["url"] != url:
                await resources.async_update_item(
                    resource["id"], {"res_type": "module", "url": url}
                )
                _LOGGER.debug("Updated Lovelace resource to %s", url)
            return

    await resources.async_create_item({"res_type": "module", "url": url})
    _LOGGER.debug("Registered Lovelace resource %s", url)
