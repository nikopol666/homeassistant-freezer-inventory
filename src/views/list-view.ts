import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { Category, FreezerItem } from "../types";
import type { LocalizeFunc } from "../localize";
import { ageInMonths, formatDate } from "../localize";
import { avatarStyle, fireEvent, iconTemplate } from "../ha-helpers";
import { sharedStyles } from "../styles";

const UNCATEGORIZED = "__none__";

export class FiListView extends LitElement {
  @property({ attribute: false }) items: FreezerItem[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) localize!: LocalizeFunc;
  @property({ attribute: false }) oldMonths = 6;
  @property({ attribute: false }) showWeight = true;
  @property({ attribute: false }) showNote = true;
  @property({ attribute: false }) isAdmin = false;

  @state() private _filter: string | null = null;

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
    return html`
      ${chips.length > 1
        ? html`
            <div class="chips filter-row">
              <button
                class="chip ${this._filter === null ? "active" : ""}"
                @click=${() => (this._filter = null)}
              >
                ${this.localize("all")}
              </button>
              ${chips.map(
                (chip) => html`
                  <button
                    class="chip ${this._filter === chip.id ? "active" : ""}"
                    @click=${() =>
                      (this._filter = this._filter === chip.id ? null : chip.id)}
                  >
                    ${chip.name}
                  </button>
                `
              )}
            </div>
          `
        : nothing}
      <div class="list" role="list">
        ${this._visibleItems.map((item) => this._renderRow(item))}
      </div>
      <div class="footer">
        <button class="btn btn-primary" @click=${() => fireEvent(this, "fi-add")}>
          ${this.localize("add")}
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
    `;
  }

  private _renderRow(item: FreezerItem) {
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
        class="item-row ${ageClass}"
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
      .filter-row {
        padding: 4px 0 14px;
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
