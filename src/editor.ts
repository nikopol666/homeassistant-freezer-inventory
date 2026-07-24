import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import type { CardConfig, FreezerInfo, HomeAssistant } from "./types";
import { fireEvent, loadHaComponents } from "./ha-helpers";
import { fetchFreezers } from "./ws";

const TEXTS: Record<string, Record<string, string>> = {
  cs: {
    freezer_id: "Mrazák",
    name: "Název (nepovinné)",
    icon: "Ikona",
    display_mode: "Režim zobrazení",
    popup: "Dlaždice s popupem",
    list: "Přímý seznam",
    touch_mode: "Tabletový režim (větší prvky)",
    show_count: "Zobrazit počet položek",
    show_weight: "Zobrazovat hmotnost",
    show_note: "Zobrazovat poznámku",
    sort: "Řazení",
    oldest_first: "Od nejstarších",
    newest_first: "Od nejnovějších",
    old_months: "Zvýraznit starší než (měsíců)",
    language: "Jazyk karty",
    lang_auto: "Podle integrace",
    auto_close: "Automaticky zavřít po nečinnosti (sekundy, prázdné = vypnuto)",
  },
  en: {
    freezer_id: "Freezer",
    name: "Name (optional)",
    icon: "Icon",
    display_mode: "Display mode",
    popup: "Tile with popup",
    list: "Inline list",
    touch_mode: "Tablet mode (larger elements)",
    show_count: "Show item count",
    show_weight: "Show weight",
    show_note: "Show note",
    sort: "Sorting",
    oldest_first: "Oldest first",
    newest_first: "Newest first",
    old_months: "Highlight older than (months)",
    language: "Card language",
    lang_auto: "Follow integration",
    auto_close: "Auto-close after inactivity (seconds, empty = off)",
  },
};

class FreezerInventoryCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private _config: CardConfig = { type: "" };
  @state() private _freezers: FreezerInfo[] = [];

  setConfig(config: CardConfig) {
    this._config = { ...config };
  }

  connectedCallback() {
    super.connectedCallback();
    loadHaComponents();
    this._loadFreezers();
  }

  private async _loadFreezers() {
    if (!this.hass) return;
    try {
      this._freezers = await fetchFreezers(this.hass);
    } catch {
      this._freezers = [];
    }
  }

  private get _t(): Record<string, string> {
    const language = this.hass?.locale?.language === "cs" ? "cs" : "en";
    return TEXTS[language];
  }

  private _update(changes: Partial<CardConfig>) {
    this._config = { ...this._config, ...changes };
    // Drop keys set to undefined so the YAML stays clean
    for (const [key, value] of Object.entries(this._config)) {
      if (value === undefined) {
        delete (this._config as unknown as Record<string, unknown>)[key];
      }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }

  render() {
    if (!this.hass) return html``;
    const t = this._t;
    const c = this._config;
    return html`
      <div class="editor">
        <div class="field">
          <label>${t.freezer_id}</label>
          <select
            .value=${c.freezer_id ?? "main_freezer"}
            @change=${(e: Event) =>
              this._update({ freezer_id: (e.target as HTMLSelectElement).value })}
          >
            ${(this._freezers.length
              ? this._freezers
              : [{ id: "main_freezer", name: "main_freezer" } as FreezerInfo]
            ).map(
              (freezer) => html`
                <option
                  value=${freezer.id}
                  ?selected=${(c.freezer_id ?? "main_freezer") === freezer.id}
                >
                  ${freezer.name}
                </option>
              `
            )}
          </select>
        </div>

        <div class="field">
          <label>${t.name}</label>
          <input
            type="text"
            .value=${c.name ?? ""}
            @input=${(e: InputEvent) =>
              this._update({
                name: (e.target as HTMLInputElement).value || undefined,
              })}
          />
        </div>

        <div class="field">
          <label>${t.icon}</label>
          <input
            type="text"
            placeholder="mdi:snowflake"
            .value=${c.icon ?? ""}
            @input=${(e: InputEvent) =>
              this._update({
                icon: (e.target as HTMLInputElement).value || undefined,
              })}
          />
        </div>

        <div class="field">
          <label>${t.display_mode}</label>
          <select
            .value=${c.display_mode ?? "popup"}
            @change=${(e: Event) =>
              this._update({
                display_mode: (e.target as HTMLSelectElement).value as
                  | "popup"
                  | "list",
              })}
          >
            <option value="popup" ?selected=${(c.display_mode ?? "popup") === "popup"}>
              ${t.popup}
            </option>
            <option value="list" ?selected=${c.display_mode === "list"}>
              ${t.list}
            </option>
          </select>
        </div>

        <div class="field">
          <label>${t.sort}</label>
          <select
            .value=${c.sort ?? "oldest_first"}
            @change=${(e: Event) =>
              this._update({
                sort: (e.target as HTMLSelectElement).value as
                  | "oldest_first"
                  | "newest_first",
              })}
          >
            <option
              value="oldest_first"
              ?selected=${(c.sort ?? "oldest_first") === "oldest_first"}
            >
              ${t.oldest_first}
            </option>
            <option value="newest_first" ?selected=${c.sort === "newest_first"}>
              ${t.newest_first}
            </option>
          </select>
        </div>

        <div class="field">
          <label>${t.old_months}</label>
          <input
            type="number"
            min="1"
            step="1"
            .value=${c.old_months != null ? String(c.old_months) : ""}
            @input=${(e: InputEvent) => {
              const raw = (e.target as HTMLInputElement).value.trim();
              const value = Number(raw);
              this._update({
                old_months:
                  raw && Number.isInteger(value) && value > 0 ? value : undefined,
              });
            }}
          />
        </div>

        <div class="field">
          <label>${t.auto_close}</label>
          <input
            type="number"
            min="5"
            step="5"
            .value=${c.auto_close != null ? String(c.auto_close) : ""}
            @input=${(e: InputEvent) => {
              const raw = (e.target as HTMLInputElement).value.trim();
              const value = Number(raw);
              this._update({
                auto_close:
                  raw && Number.isFinite(value) && value > 0
                    ? Math.round(value)
                    : undefined,
              });
            }}
          />
        </div>

        <div class="field">
          <label>${t.language}</label>
          <select
            .value=${c.language ?? ""}
            @change=${(e: Event) => {
              const value = (e.target as HTMLSelectElement).value;
              this._update({
                language: (value || undefined) as "cs" | "en" | undefined,
              });
            }}
          >
            <option value="" ?selected=${!c.language}>${t.lang_auto}</option>
            <option value="cs" ?selected=${c.language === "cs"}>Čeština</option>
            <option value="en" ?selected=${c.language === "en"}>English</option>
          </select>
        </div>

        ${(
          [
            ["touch_mode", t.touch_mode],
            ["show_count", t.show_count],
            ["show_weight", t.show_weight],
            ["show_note", t.show_note],
          ] as const
        ).map(
          ([key, label]) => html`
            <label class="toggle-row">
              <input
                type="checkbox"
                .checked=${this._config[key] !== false}
                @change=${(e: Event) =>
                  this._update({
                    [key]: (e.target as HTMLInputElement).checked
                      ? undefined
                      : false,
                  } as Partial<CardConfig>)}
              />
              ${label}
            </label>
          `
        )}
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      padding: 4px 0;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 14px;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }

    input,
    select {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      min-height: 40px;
      padding: 8px 12px;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 40px;
      font-size: 14px;
      color: var(--primary-text-color);
      cursor: pointer;
    }

    .toggle-row input {
      width: 18px;
      height: 18px;
      min-height: 0;
    }
  `;
}

customElements.define(
  "freezer-inventory-card-editor",
  FreezerInventoryCardEditor
);
