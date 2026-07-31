import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { Category, FreezerItem } from "../types";
import type { LocalizeFunc } from "../localize";
import {
  ageInMonths,
  formatDate,
  formatWeight,
  itemCountText,
  shortId,
} from "../localize";
import { avatarStyle, fireEvent, iconTemplate } from "../ha-helpers";
import { sharedStyles } from "../styles";
import { scanSupported } from "./scan-view";

const UNCATEGORIZED = "__none__";

export class FiListView extends LitElement {
  @property({ attribute: false }) items: FreezerItem[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) localize!: LocalizeFunc;
  @property({ attribute: false }) oldMonths = 6;
  @property({ attribute: false }) showWeight = true;
  @property({ attribute: false }) showNote = true;
  @property({ attribute: false }) isAdmin = false;
  @property({ attribute: false }) language = "en";
  /** Start in the per-product summary view (card option group_by). */
  @property({ attribute: false }) defaultGrouped = false;

  @state() private _filter: string | null = null;
  @state() private _grouped = false;
  @state() private _expanded = new Set<string>();

  private _groupInitDone = false;

  willUpdate(changed: Map<string, unknown>) {
    if (!this._groupInitDone && changed.has("defaultGrouped")) {
      this._grouped = this.defaultGrouped;
      this._groupInitDone = true;
    }
  }

  private _ageClass(item: FreezerItem): string {
    const category = item.category_id
      ? this.categories.find((c) => c.id === item.category_id)
      : undefined;
    const threshold = category?.max_months ?? this.oldMonths;
    const age = ageInMonths(item);
    if (age >= threshold) return "danger";
    if (age >= Math.ceil(threshold / 2)) return "warn";
    return "";
  }

  private _categoryFor(item: FreezerItem): Category | undefined {
    return item.category_id
      ? this.categories.find((c) => c.id === item.category_id)
      : undefined;
  }

  private get _filterChips(): { id: string; name: string }[] {
    const used = new Set(
      this.items.map((item) => item.category_id ?? UNCATEGORIZED)
    );
    const chips = this.categories
      .filter((c) => c.enabled && used.has(c.id))
      .map((c) => ({ id: c.id, name: c.name }));
    if (used.has(UNCATEGORIZED) && chips.length) {
      chips.push({ id: UNCATEGORIZED, name: this.localize("uncategorized") });
    }
    return chips;
  }

  private get _visibleItems(): FreezerItem[] {
    if (!this._filter) return this.items;
    return this.items.filter(
      (item) => (item.category_id ?? UNCATEGORIZED) === this._filter
    );
  }

  /** Per-product aggregation for the summary view. */
  private get _productGroups() {
    const groups = new Map<
      string,
      {
        name: string;
        items: FreezerItem[];
        weight: number;
        pieces: number;
        worstAge: number;
        worstClass: string;
      }
    >();
    const rank = (cls: string) => (cls === "danger" ? 2 : cls === "warn" ? 1 : 0);
    for (const item of this._visibleItems) {
      const key = item.product_name.trim().toLocaleLowerCase();
      let group = groups.get(key);
      if (!group) {
        group = {
          name: item.product_name,
          items: [],
          weight: 0,
          pieces: 0,
          worstAge: 0,
          worstClass: "",
        };
        groups.set(key, group);
      }
      group.items.push(item);
      group.weight += item.weight ?? 0;
      group.pieces += item.pieces ?? 0;
      const age = ageInMonths(item);
      const cls = this._ageClass(item);
      if (rank(cls) > rank(group.worstClass)) group.worstClass = cls;
      if (age > group.worstAge) group.worstAge = age;
    }
    return [...groups.entries()]
      .map(([key, group]) => ({ key, ...group }))
      .sort((a, b) => a.name.localeCompare(b.name, this.language));
  }

  render() {
    if (!this.items.length) {
      return html`
        <div class="empty">
          <div class="empty-icon"><ha-icon icon="mdi:snowflake"></ha-icon></div>
          <p>${this.localize("empty_freezer")}</p>
          <div class="footer empty-footer">
            <button
              class="btn btn-primary"
              @click=${() => fireEvent(this, "fi-add")}
            >
              ${this.localize("add_first_item")}
            </button>
            ${this.isAdmin
              ? html`
                  <button
                    class="btn btn-quiet manage-btn"
                    title=${this.localize("manage")}
                    aria-label=${this.localize("manage")}
                    @click=${() => fireEvent(this, "fi-manage")}
                  >
                    <ha-icon icon="mdi:cog-outline"></ha-icon>
                  </button>
                `
              : nothing}
          </div>
        </div>
      `;
    }

    const chips = this._filterChips;
    const l = this.localize;
    return html`
      <div class="toolbar">
        ${chips.length > 1
          ? html`
              <div class="chips filter-row">
                <button
                  class="chip ${this._filter === null ? "active" : ""}"
                  @click=${() => (this._filter = null)}
                >
                  ${l("all")}
                </button>
                ${chips.map(
                  (chip) => html`
                    <button
                      class="chip ${this._filter === chip.id ? "active" : ""}"
                      @click=${() =>
                        (this._filter =
                          this._filter === chip.id ? null : chip.id)}
                    >
                      ${chip.name}
                    </button>
                  `
                )}
              </div>
            `
          : html`<span class="toolbar-spacer"></span>`}
        <div class="segment" role="group" aria-label=${l("view_toggle")}>
          <button
            class="segment-btn ${this._grouped ? "" : "active"}"
            title=${l("view_items")}
            aria-label=${l("view_items")}
            @click=${() => (this._grouped = false)}
          >
            <ha-icon icon="mdi:format-list-bulleted"></ha-icon>
          </button>
          <button
            class="segment-btn ${this._grouped ? "active" : ""}"
            title=${l("view_summary")}
            aria-label=${l("view_summary")}
            @click=${() => (this._grouped = true)}
          >
            <ha-icon icon="mdi:sigma"></ha-icon>
          </button>
        </div>
      </div>
      <div class="list" role="list">
        ${this._grouped
          ? this._productGroups.map((group) => this._renderGroup(group))
          : this._visibleItems.map((item) => this._renderRow(item))}
      </div>
      <div class="footer">
        <button class="btn btn-primary" @click=${() => fireEvent(this, "fi-add")}>
          ${this.localize("add")}
        </button>
        ${scanSupported()
          ? html`
              <button
                class="btn btn-quiet manage-btn"
                title=${this.localize("scan_button")}
                aria-label=${this.localize("scan_button")}
                @click=${() => fireEvent(this, "fi-scan")}
              >
                <ha-icon icon="mdi:qrcode-scan"></ha-icon>
              </button>
            `
          : nothing}
        ${this.isAdmin
          ? html`
              <button
                class="btn btn-quiet manage-btn"
                title=${this.localize("manage")}
                aria-label=${this.localize("manage")}
                @click=${() => fireEvent(this, "fi-manage")}
              >
                <ha-icon icon="mdi:cog-outline"></ha-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }

  private _renderGroup(group: {
    key: string;
    name: string;
    items: FreezerItem[];
    weight: number;
    pieces: number;
    worstAge: number;
    worstClass: string;
  }) {
    const l = this.localize;
    const category = this._categoryFor(group.items[0]);
    const expanded = this._expanded.has(group.key);
    const parts: string[] = [];
    if (group.weight > 0) parts.push(formatWeight(group.weight, this.language));
    if (group.pieces > 0) parts.push(`${group.pieces} ${l("pieces_short")}`);
    parts.push(itemCountText(l, group.items.length));
    return html`
      <button
        class="item-row group-row ${group.worstClass}"
        role="listitem"
        aria-expanded=${expanded}
        @click=${() => {
          const next = new Set(this._expanded);
          if (expanded) next.delete(group.key);
          else next.add(group.key);
          this._expanded = next;
        }}
      >
        <span
          class="avatar ${group.worstClass}"
          style=${group.worstClass ? "" : avatarStyle(category?.color)}
        >
          ${iconTemplate(category?.icon, "mdi:snowflake")}
        </span>
        <span class="item-main">
          <span class="item-name">${group.name}</span>
          <span class="item-sub">${parts.join(" · ")}</span>
        </span>
        ${group.worstClass
          ? html`<span class="age-badge ${group.worstClass}"
              >${l("months_old", { months: group.worstAge })}</span
            >`
          : nothing}
        <ha-icon
          class="chevron"
          icon=${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
        ></ha-icon>
      </button>
      ${expanded
        ? html`
            <div class="group-items">
              ${group.items.map((item) => this._renderRow(item, true))}
            </div>
          `
        : nothing}
    `;
  }

  private _renderRow(item: FreezerItem, nested = false) {
    const ageClass = this._ageClass(item);
    const age = ageInMonths(item);
    const category = this._categoryFor(item);
    const amountParts: string[] = [];
    if (item.weight != null) {
      amountParts.push(`${item.weight} ${item.unit || "g"}`);
    }
    if (item.pieces != null) {
      amountParts.push(`${item.pieces} ${this.localize("pieces_short")}`);
    }
    const weightText = amountParts.length
      ? amountParts.join(" · ")
      : this.localize("no_weight");
    return html`
      <button
        class="item-row ${ageClass} ${nested ? "nested" : ""}"
        role="listitem"
        @click=${() => fireEvent(this, "fi-select-item", { item })}
      >
        <span
          class="avatar ${ageClass}"
          style=${ageClass ? "" : avatarStyle(category?.color)}
        >
          ${iconTemplate(category?.icon, "mdi:snowflake")}
        </span>
        <span class="item-main">
          <span class="item-name">${item.product_name}</span>
          <span class="item-sub">
            ${formatDate(item)}${this.showWeight ? html` · ${weightText}` : nothing}
            ${this.showNote && item.note
              ? html`<span class="item-note"> · ${item.note}</span>`
              : nothing}
            <span class="row-id">${shortId(item.id)}</span>
          </span>
        </span>
        ${ageClass
          ? html`<span class="age-badge ${ageClass}"
              >${this.localize("months_old", { months: age })}</span
            >`
          : nothing}
      </button>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .toolbar {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 4px 0 14px;
      }

      .toolbar .filter-row {
        flex: 1;
        padding: 0;
      }

      .toolbar-spacer {
        flex: 1;
      }

      .segment {
        flex: none;
        display: flex;
        border: 1px solid var(--fi-divider);
        border-radius: 20px;
        overflow: hidden;
      }

      .segment-btn {
        width: 46px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--fi-secondary);
      }

      .segment-btn.active {
        background: color-mix(in srgb, var(--fi-accent) 16%, transparent);
        color: var(--fi-accent);
      }

      .segment-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .group-row .chevron {
        flex: none;
        color: var(--fi-secondary);
        --mdc-icon-size: 22px;
      }

      .group-items {
        border-left: 3px solid var(--fi-chip-bg);
        margin-left: 10px;
      }

      .item-row.nested {
        padding-left: 16px;
        min-height: calc(var(--fi-row-height) - 12px);
      }

      .item-row.nested .avatar {
        width: 34px;
        height: 34px;
      }

      .item-row.nested .avatar .emoji-icon {
        font-size: 18px;
      }

      .item-row.nested .avatar ha-icon {
        --mdc-icon-size: 20px;
      }

      .item-row.nested .item-name {
        font-size: 15px;
      }

      .list {
        display: flex;
        flex-direction: column;
      }

      .item-row {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        min-height: var(--fi-row-height);
        padding: 8px 6px;
        border-bottom: 1px solid var(--fi-divider);
        text-align: left;
        position: relative;
        border-radius: 8px;
      }

      .item-row:hover {
        background: color-mix(in srgb, var(--fi-accent) 6%, transparent);
      }

      .item-row.warn::before,
      .item-row.danger::before {
        content: "";
        position: absolute;
        left: -6px;
        top: 8px;
        bottom: 8px;
        width: 4px;
        border-radius: 2px;
      }

      .item-row.warn::before {
        background: var(--fi-warn);
      }

      .item-row.danger::before {
        background: var(--fi-danger);
      }

      .item-main {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        flex: 1;
      }

      .item-name {
        font-size: 16px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([touch]) .item-name {
        font-size: 18px;
      }

      .item-sub {
        font-size: 14px;
        color: var(--fi-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-note {
        font-style: italic;
      }

      .row-id {
        font-family: monospace;
        font-size: 11px;
        opacity: 0.55;
        margin-left: 6px;
      }

      .age-badge {
        flex: none;
        font-size: 12px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 12px;
      }

      .age-badge.warn {
        background: color-mix(in srgb, var(--fi-warn) 16%, transparent);
        color: var(--fi-warn);
      }

      .age-badge.danger {
        background: color-mix(in srgb, var(--fi-danger) 15%, transparent);
        color: var(--fi-danger);
      }

      .footer {
        display: flex;
        gap: 10px;
        padding-top: 16px;
        position: sticky;
        bottom: 0;
        background: var(--card-background-color, var(--ha-card-background, #fff));
      }

      .manage-btn {
        width: 52px;
        flex: none;
      }

      .empty {
        text-align: center;
        padding: 28px 8px;
      }

      .empty-icon ha-icon {
        --mdc-icon-size: 56px;
        color: var(--fi-secondary);
        opacity: 0.6;
      }

      .empty p {
        color: var(--fi-secondary);
        font-size: 16px;
        margin: 12px 0 20px;
      }

      .empty-footer {
        position: static;
        padding-top: 0;
      }
    `,
  ];
}

customElements.define("fi-list-view", FiListView);
