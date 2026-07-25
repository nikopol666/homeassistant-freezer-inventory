"""Sensor entities for Freezer Inventory."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.const import UnitOfMass
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SIGNAL_UPDATED
from .coordinator import FreezerInventoryCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up an item-count and total-weight sensor per freezer."""
    coordinator: FreezerInventoryCoordinator = entry.runtime_data
    entities: list[SensorEntity] = []
    for freezer in coordinator.freezers():
        entities.append(FreezerSensor(coordinator, entry.entry_id, freezer))
        entities.append(FreezerWeightSensor(coordinator, entry.entry_id, freezer))
    async_add_entities(entities)


class FreezerSensorBase(SensorEntity):
    """Shared base: one device per freezer, refresh via dispatcher."""

    _attr_should_poll = False
    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: FreezerInventoryCoordinator,
        entry_id: str,
        freezer: dict[str, Any],
    ) -> None:
        self._coordinator = coordinator
        self._freezer_id = freezer["id"]
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, freezer["id"])},
            name=freezer["name"],
            manufacturer="Freezer Inventory",
            entry_type=DeviceEntryType.SERVICE,
        )

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(self.hass, SIGNAL_UPDATED, self._handle_update)
        )

    @callback
    def _handle_update(self, payload: dict[str, Any]) -> None:
        if payload.get("type") == "items" and payload.get("freezer_id") != self._freezer_id:
            return
        self.async_write_ha_state()


class FreezerSensor(FreezerSensorBase):
    """Item count sensor for a freezer, with summary attributes."""

    _attr_name = None  # take the device (freezer) name

    def __init__(
        self,
        coordinator: FreezerInventoryCoordinator,
        entry_id: str,
        freezer: dict[str, Any],
    ) -> None:
        super().__init__(coordinator, entry_id, freezer)
        self._attr_unique_id = f"{entry_id}_{freezer['id']}"
        self._attr_icon = freezer.get("icon") or "mdi:snowflake"

    @property
    def native_value(self) -> int:
        return self._coordinator.summary(self._freezer_id)["item_count"]

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        # Summary only — the full item list is served over websocket
        return self._coordinator.summary(self._freezer_id)


class FreezerWeightSensor(FreezerSensorBase):
    """Total known weight of a freezer — recorded for HA statistics graphs."""

    _attr_device_class = SensorDeviceClass.WEIGHT
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfMass.GRAMS
    _attr_icon = "mdi:weight-gram"

    def __init__(
        self,
        coordinator: FreezerInventoryCoordinator,
        entry_id: str,
        freezer: dict[str, Any],
    ) -> None:
        super().__init__(coordinator, entry_id, freezer)
        self._attr_unique_id = f"{entry_id}_{freezer['id']}_weight"
        self._attr_name = "Hmotnost" if coordinator.language == "cs" else "Weight"

    @property
    def native_value(self) -> int:
        return self._coordinator.summary(self._freezer_id)["total_known_weight"]
