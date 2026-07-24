"""Shared fixtures."""

from __future__ import annotations

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.freezer_inventory.const import (
    CONF_CREATE_DEFAULTS,
    CONF_DEFAULT_UNIT,
    CONF_FREEZER_NAME,
    CONF_LANGUAGE,
    CONF_OLD_MONTHS,
    DEFAULT_FREEZER_ID,
    DOMAIN,
)


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Enable loading custom integrations in all tests."""
    yield


@pytest.fixture
def mock_entry() -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title="Mrazák",
        data={
            CONF_LANGUAGE: "cs",
            CONF_FREEZER_NAME: "Mrazák",
            CONF_CREATE_DEFAULTS: True,
            CONF_DEFAULT_UNIT: "g",
        },
        options={CONF_OLD_MONTHS: 6},
    )


@pytest.fixture
async def setup_integration(hass, mock_entry):
    """Set up the integration from a mock config entry."""
    mock_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(mock_entry.entry_id)
    await hass.async_block_till_done()
    return mock_entry


async def add_item(
    hass,
    *,
    freezer_id: str = DEFAULT_FREEZER_ID,
    product_id: str | None = None,
    product_name: str | None = "Kuřecí prsa",
    month: int = 6,
    year: int = 2026,
    weight: int | None = 500,
    note: str = "",
    quantity: int = 1,
) -> list[str]:
    """Call the add_item service and return the created item ids."""
    data = {
        "freezer_id": freezer_id,
        "month": month,
        "year": year,
        "note": note,
        "quantity": quantity,
    }
    if product_id is not None:
        data["product_id"] = product_id
    if product_name is not None:
        data["product_name"] = product_name
    if weight is not None:
        data["weight"] = weight
    response = await hass.services.async_call(
        DOMAIN, "add_item", data, blocking=True, return_response=True
    )
    return response["item_ids"]


def get_items(hass, freezer_id: str = DEFAULT_FREEZER_ID) -> list[dict]:
    """Read items straight from the coordinator."""
    return hass.data[DOMAIN].items(freezer_id)
