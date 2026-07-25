"""Persistent storage for Freezer Inventory."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_MINOR_VERSION, STORAGE_VERSION


def empty_data() -> dict[str, Any]:
    """Return the empty storage structure."""
    return {
        "freezers": {},
        "categories": [],
        "products": [],
        "settings": {},
        "history": [],
    }


class FreezerStore(Store[dict[str, Any]]):
    """Versioned store for the freezer inventory data."""

    def __init__(self, hass: HomeAssistant) -> None:
        super().__init__(
            hass,
            STORAGE_VERSION,
            STORAGE_KEY,
            minor_version=STORAGE_MINOR_VERSION,
            atomic_writes=True,
        )

    async def _async_migrate_func(
        self,
        old_major_version: int,
        old_minor_version: int,
        old_data: dict[str, Any],
    ) -> dict[str, Any]:
        """Migrate stored data to the current version (v1: nothing to do)."""
        return old_data
