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
    """Options for an existing entry (auto-reloads on change)."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            freezer_name = user_input[CONF_FREEZER_NAME].strip()
            if not freezer_name:
                errors[CONF_FREEZER_NAME] = "invalid_name"
            else:
                self.hass.config_entries.async_update_entry(
                    self.config_entry, title=freezer_name
                )
                return self.async_create_entry(
                    title="",
                    data={
                        CONF_LANGUAGE: user_input[CONF_LANGUAGE],
                        CONF_FREEZER_NAME: freezer_name,
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
                    CONF_FREEZER_NAME,
                    default=options.get(CONF_FREEZER_NAME)
                    or data.get(CONF_FREEZER_NAME, ""),
                ): selector.TextSelector(),
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
        return self.async_show_form(step_id="init", data_schema=schema, errors=errors)
