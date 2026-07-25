"""Config flow for Freezer Inventory."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlowWithReload,
)
from homeassistant.core import callback
from homeassistant.helpers import selector
from homeassistant.util import dt as dt_util

from .const import (
    CONF_CREATE_DEFAULTS,
    CONF_DEFAULT_UNIT,
    CONF_FREEZER_NAME,
    CONF_LANGUAGE,
    CONF_OLD_MONTHS,
    DEFAULT_FREEZER_NAMES,
    DEFAULT_LANGUAGE,
    DEFAULT_OLD_MONTHS,
    DEFAULT_UNIT,
    DOMAIN,
    LANGUAGES,
    UNITS,
)

_LANGUAGE_SELECTOR = selector.SelectSelector(
    selector.SelectSelectorConfig(
        options=LANGUAGES,
        mode=selector.SelectSelectorMode.DROPDOWN,
        translation_key="language",
    )
)

_UNIT_SELECTOR = selector.SelectSelector(
    selector.SelectSelectorConfig(
        options=UNITS,
        mode=selector.SelectSelectorMode.DROPDOWN,
        translation_key="default_unit",
    )
)


class FreezerInventoryConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the initial configuration."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the initial step."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        errors: dict[str, str] = {}
        if user_input is not None:
            freezer_name = user_input[CONF_FREEZER_NAME].strip()
            if not freezer_name:
                errors[CONF_FREEZER_NAME] = "invalid_name"
            else:
                return self.async_create_entry(
                    title=freezer_name,
                    data={
                        CONF_LANGUAGE: user_input[CONF_LANGUAGE],
                        CONF_FREEZER_NAME: freezer_name,
                        CONF_CREATE_DEFAULTS: user_input[CONF_CREATE_DEFAULTS],
                        CONF_DEFAULT_UNIT: user_input[CONF_DEFAULT_UNIT],
                    },
                    options={CONF_OLD_MONTHS: DEFAULT_OLD_MONTHS},
                )

        language = (
            user_input[CONF_LANGUAGE] if user_input is not None else DEFAULT_LANGUAGE
        )
        schema = vol.Schema(
            {
                vol.Required(CONF_LANGUAGE, default=language): _LANGUAGE_SELECTOR,
                vol.Required(
                    CONF_FREEZER_NAME,
                    default=DEFAULT_FREEZER_NAMES.get(
                        language, DEFAULT_FREEZER_NAMES["en"]
                    ),
                ): selector.TextSelector(),
                vol.Required(CONF_CREATE_DEFAULTS, default=True): selector.BooleanSelector(),
                vol.Required(CONF_DEFAULT_UNIT, default=DEFAULT_UNIT): _UNIT_SELECTOR,
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> "FreezerOptionsFlow":
        return FreezerOptionsFlow()


class FreezerOptionsFlow(OptionsFlowWithReload):
    """Options + freezer management (auto-reloads on finish)."""

    _freezer_id: str | None = None

    def _coordinator(self):
        from .coordinator import FreezerInventoryCoordinator  # noqa: PLC0415

        coordinator: FreezerInventoryCoordinator | None = self.hass.data.get(DOMAIN)
        return coordinator

    def _finish(self) -> ConfigFlowResult:
        """Finish the flow keeping current options.

        Options stay identical, so OptionsFlowWithReload skips the automatic
        reload — schedule one explicitly so new/removed freezers get sensors.
        """
        self.hass.config_entries.async_schedule_reload(self.config_entry.entry_id)
        return self.async_create_entry(
            title="", data=dict(self.config_entry.options)
        )

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        return self.async_show_menu(
            step_id="init",
            menu_options=[
                "settings",
                "add_freezer",
                "edit_freezer",
                "export_data",
                "import_data",
            ],
        )

    async def async_step_export_data(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        coordinator = self._coordinator()
        if coordinator is None:
            return self.async_abort(reason="not_loaded")

        if user_input is not None:
            return self.async_create_entry(
                title="", data=dict(self.config_entry.options)
            )

        import json  # noqa: PLC0415

        data = coordinator.export_data()
        filename = f"freezer_inventory_export_{dt_util.now().strftime('%Y%m%d_%H%M%S')}.json"
        path = self.hass.config.path(filename)

        def _write() -> None:
            with open(path, "w", encoding="utf-8") as file:
                json.dump(data, file, ensure_ascii=False, indent=2)

        await self.hass.async_add_executor_job(_write)
        return self.async_show_form(
            step_id="export_data",
            data_schema=vol.Schema({}),
            description_placeholders={"path": path},
        )

    async def async_step_import_data(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        from .coordinator import InventoryError  # noqa: PLC0415

        coordinator = self._coordinator()
        if coordinator is None:
            return self.async_abort(reason="not_loaded")

        errors: dict[str, str] = {}
        if user_input is not None:
            import json  # noqa: PLC0415

            try:
                data = json.loads(user_input["data"])
            except ValueError:
                data = None
            if not isinstance(data, dict):
                errors["data"] = "invalid_json"
            else:
                try:
                    await coordinator.async_import_data(data, user_input["mode"])
                    return self._finish()
                except InventoryError:
                    errors["data"] = "invalid_import"

        schema = vol.Schema(
            {
                vol.Required("mode", default="merge"): selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=["merge", "replace"],
                        mode=selector.SelectSelectorMode.DROPDOWN,
                        translation_key="import_mode",
                    )
                ),
                vol.Required("data"): selector.TextSelector(
                    selector.TextSelectorConfig(multiline=True)
                ),
            }
        )
        return self.async_show_form(
            step_id="import_data", data_schema=schema, errors=errors
        )

    async def async_step_settings(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(
                title="",
                data={
                    CONF_LANGUAGE: user_input[CONF_LANGUAGE],
                    CONF_OLD_MONTHS: user_input[CONF_OLD_MONTHS],
                },
            )

        data = self.config_entry.data
        options = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_LANGUAGE,
                    default=options.get(CONF_LANGUAGE)
                    or data.get(CONF_LANGUAGE, DEFAULT_LANGUAGE),
                ): _LANGUAGE_SELECTOR,
                vol.Required(
                    CONF_OLD_MONTHS,
                    default=options.get(CONF_OLD_MONTHS, DEFAULT_OLD_MONTHS),
                ): selector.NumberSelector(
                    selector.NumberSelectorConfig(
                        min=1, max=60, step=1, mode=selector.NumberSelectorMode.BOX
                    )
                ),
            }
        )
        return self.async_show_form(step_id="settings", data_schema=schema)

    async def async_step_add_freezer(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        coordinator = self._coordinator()
        if coordinator is None:
            return self.async_abort(reason="not_loaded")

        errors: dict[str, str] = {}
        if user_input is not None:
            name = user_input["name"].strip()
            if not name:
                errors["name"] = "invalid_name"
            else:
                await coordinator.async_add_freezer(
                    name, icon=user_input.get("icon", "").strip() or "mdi:snowflake"
                )
                return self._finish()

        schema = vol.Schema(
            {
                vol.Required("name"): selector.TextSelector(),
                vol.Optional("icon", default="mdi:snowflake"): selector.TextSelector(),
            }
        )
        return self.async_show_form(
            step_id="add_freezer", data_schema=schema, errors=errors
        )

    async def async_step_edit_freezer(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        coordinator = self._coordinator()
        if coordinator is None:
            return self.async_abort(reason="not_loaded")

        if user_input is not None:
            self._freezer_id = user_input["freezer"]
            return await self.async_step_edit_freezer_details()

        freezers = coordinator.freezers()
        schema = vol.Schema(
            {
                vol.Required("freezer"): selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=[
                            selector.SelectOptionDict(
                                value=freezer["id"],
                                label=f"{freezer['name']} ({freezer['item_count']})",
                            )
                            for freezer in freezers
                        ],
                        mode=selector.SelectSelectorMode.LIST,
                    )
                )
            }
        )
        return self.async_show_form(step_id="edit_freezer", data_schema=schema)

    async def async_step_edit_freezer_details(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        from .coordinator import InventoryError  # noqa: PLC0415

        coordinator = self._coordinator()
        if coordinator is None or self._freezer_id is None:
            return self.async_abort(reason="not_loaded")

        current = next(
            (f for f in coordinator.freezers() if f["id"] == self._freezer_id), None
        )
        if current is None:
            return self.async_abort(reason="not_loaded")

        errors: dict[str, str] = {}
        if user_input is not None:
            if user_input.get("delete"):
                try:
                    await coordinator.async_delete_freezer(self._freezer_id)
                    return self._finish()
                except InventoryError as err:
                    errors["base"] = err.code
            else:
                name = user_input["name"].strip()
                if not name:
                    errors["name"] = "invalid_name"
                else:
                    await coordinator.async_update_freezer(
                        self._freezer_id,
                        name=name,
                        icon=user_input.get("icon", "").strip() or "mdi:snowflake",
                    )
                    return self._finish()

        schema = vol.Schema(
            {
                vol.Required("name", default=current["name"]): selector.TextSelector(),
                vol.Optional(
                    "icon", default=current.get("icon") or "mdi:snowflake"
                ): selector.TextSelector(),
                vol.Optional("delete", default=False): selector.BooleanSelector(),
            }
        )
        return self.async_show_form(
            step_id="edit_freezer_details",
            data_schema=schema,
            errors=errors,
            description_placeholders={"name": current["name"]},
        )
