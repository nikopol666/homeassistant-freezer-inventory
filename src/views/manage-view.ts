import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { Category, HomeAssistant, Product } from "../types";
import type { LocalizeFunc } from "../localize";
import { avatarStyle, fireEvent, iconTemplate } from "../ha-helpers";
import { sharedStyles } from "../styles";
import * as ws from "../ws";

type Editing =
  | { kind: "category"; category: Category | null }
  | { kind: "product"; product: Product | null }
  | null;

const COLOR_PALETTE = [
  "#f59e0b",
  "#f06292",
  "#c62828",
  "#8e24aa",
  "#0288d1",
  "#2e7d32",
  "#00897b",
  "#607d8b",
];

/** Category & product preset management. */
export class FiManageView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) localize!: LocalizeFunc;
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) products: Product[] = [];

  @state() private _tab: "products" | "categories" = "products";
  @state() private _editing: Editing = null;
  @state() private _confirm: { text: string; action: () => Promise<void> } | null =
    null;
  @state() private _error = "";
  @state() private _busy = false;

  // form fields
  @state() private _fName = "";
  @state() private _fIcon = "";
  @state() private _fCategoryId = "";
  @state() private _fDefaultWeight = "";
  @state() private _fQuickWeights = "";
  @state() private _fQuickPieces = "";
  @state() private _fAskForWeight = true;
  @state() private _fEnabled = true;
  @state() private _fMaxMonths = "";
  @state() private _fColor: string | null = null;

  private async _run(action: () => Promise<void>) {
    this._busy = true;
    this._error = "";
    try {
      await action();
      this._editing = null;
      this._confirm = null;
    } catch (err) {
      this._error = ws.errorMessage(err, this.localize("err_generic"));
    } finally {
      this._busy = false;
    }
  }

  private _startEditCategory(category: Category | null) {
    this._editing = { kind: "category", category };
    this._error = "";
    this._fName = category?.name ?? "";
    this._fIcon = category?.icon ?? "";
    this._fEnabled = category?.enabled ?? true;
    this._fMaxMonths =
      category?.max_months != null ? String(category.max_months) : "";
    this._fColor = category?.color ?? null;
  }

  private _startEditProduct(product: Product | null) {
    this._editing = { kind: "product", product };
    this._error = "";
    this._fName = product?.name ?? "";
    this._fIcon = product?.icon ?? "";
    this._fCategoryId = product?.category_id ?? "";
    this._fDefaultWeight =
      product?.default_weight != null ? String(product.default_weight) : "";
    this._fQuickWeights = (product?.quick_weights ?? []).join(", ");
    this._fQuickPieces = (product?.quick_pieces ?? []).join(", ");
    this._fAskForWeight = product?.ask_for_weight ?? true;
    this._fEnabled = product?.enabled ?? true;
  }

  private _parseOptionalInt(raw: string): number | null {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const value = Number(trimmed);
    return Number.isInteger(value) && value > 0 ? value : null;
  }

  private async _saveCategory() {
    const editing = this._editing;
    if (!editing || editing.kind !== "category") return;
    const data = {
      name: this._fName.trim(),
      icon: this._fIcon.trim() || "mdi:food",
      color: this._fColor,
      max_months: this._parseOptionalInt(this._fMaxMonths),
    };
    await this._run(async () => {
      if (editing.category) {
        await ws.updateCategory(this.hass, editing.category.id, {
          ...data,
          enabled: this._fEnabled,
        });
      } else {
        await ws.createCategory(this.hass, data);
      }
    });
  }

  private async _saveProduct() {
    const editing = this._editing;
    if (!editing || editing.kind !== "product") return;
    const parseIntList = (raw: string): number[] =>
      raw
        .split(",")
        .map((part) => Number(part.trim()))
        .filter((value) => Number.isInteger(value) && value > 0);
    const data = {
      name: this._fName.trim(),
      icon: this._fIcon.trim() || "mdi:food",
      category_id: this._fCategoryId || null,
      default_weight: this._parseOptionalInt(this._fDefaultWeight),
      quick_weights: parseIntList(this._fQuickWeights),
      quick_pieces: parseIntList(this._fQuickPieces),
      ask_for_weight: this._fAskForWeight,
    };
    await this._run(async () => {
      if (editing.product) {
        await ws.updateProduct(this.hass, editing.product.id, {
          ...data,
          enabled: this._fEnabled,
        });
      } else {
        await ws.createProduct(this.hass, data);
      }
    });
  }

  private async _move(kind: "category" | "product", id: string, delta: number) {
    if (kind === "category") {
      const ids = this.categories.map((c) => c.id);
      const index = ids.indexOf(id);
      const target = index + delta;
      if (index < 0 || target < 0 || target >= ids.length) return;
      [ids[index], ids[target]] = [ids[target], ids[index]];
      await this._run(() => ws.reorderCategories(this.hass, ids));
    } else {
      const ids = this.products.map((p) => p.id);
      const index = ids.indexOf(id);
      const target = index + delta;
      if (index < 0 || target < 0 || target >= ids.length) return;
      [ids[index], ids[target]] = [ids[target], ids[index]];
      await this._run(() => ws.reorderProducts(this.hass, ids));
    }
  }

  render() {
    const l = this.localize;
    if (this._confirm) {
      return html`
        <p class="confirm-text">${this._confirm.text}</p>
        ${this._error ? html`<div class="error-banner">${this._error}</div>` : nothing}
        <div class="row-of-buttons">
          <button
            class="btn btn-danger"
            ?disabled=${this._busy}
            @click=${() => this._confirm && this._run(this._confirm.action)}
          >
            ${l("confirm")}
          </button>
          <button class="btn btn-outline" @click=${() => (this._confirm = null)}>
            ${l("cancel")}
          </button>
        </div>
      `;
    }
    if (this._editing?.kind === "category") return this._renderCategoryForm();
    if (this._editing?.kind === "product") return this._renderProductForm();
    return this._renderOverview();
  }

  private _renderOverview() {
    const l = this.localize;
    return html`
      <h2 class="view-title">${l("manage")}</h2>
      <div class="chips tabs">
        <button
          class="chip ${this._tab === "products" ? "active" : ""}"
          @click=${() => (this._tab = "products")}
        >
          ${l("products")}
        </button>
        <button
          class="chip ${this._tab === "categories" ? "active" : ""}"
          @click=${() => (this._tab = "categories")}
        >
          ${l("categories")}
        </button>
      </div>
      ${this._error ? html`<div class="error-banner">${this._error}</div>` : nothing}
      ${this._tab === "products"
        ? this._renderProductList()
        : this._renderCategoryList()}
      <div class="row-of-buttons bottom">
        <button
          class="btn btn-primary"
          @click=${() =>
            this._tab === "products"
              ? this._startEditProduct(null)
              : this._startEditCategory(null)}
        >
          ${this._tab === "products" ? l("add_product_btn") : l("add_category")}
        </button>
        <button
          class="btn btn-outline"
          @click=${() =>
            (this._confirm = {
              text: l("restore_defaults_confirm"),
              action: () => ws.restoreDefaults(this.hass),
            })}
        >
          ${l("restore_defaults")}
        </button>
        <button class="btn btn-quiet" @click=${() => fireEvent(this, "fi-manage-close")}>
          ${l("back")}
        </button>
      </div>
    `;
  }

  private _renderCategoryList() {
    const l = this.localize;
    return html`
      <div class="rows">
        ${this.categories.map(
          (category, index) => html`
            <div class="row ${category.enabled ? "" : "disabled"}">
              <span class="avatar small" style=${avatarStyle(category.color)}>
                ${iconTemplate(category.icon)}
              </span>
              <button class="row-main" @click=${() => this._startEditCategory(category)}>
                <span class="row-name">${category.name}</span>
                ${category.max_months != null
                  ? html`<span class="row-sub"
                      >${l("max_months")}: ${category.max_months}</span
                    >`
                  : nothing}
              </button>
              <button
                class="icon-btn"
                title=${l("move_up")}
                ?disabled=${index === 0}
                @click=${() => this._move("category", category.id, -1)}
              >
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
              <button
                class="icon-btn"
                title=${l("move_down")}
                ?disabled=${index === this.categories.length - 1}
                @click=${() => this._move("category", category.id, 1)}
              >
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              <button
                class="icon-btn danger"
                title=${l("delete")}
                @click=${() =>
                  (this._confirm = {
                    text: l("delete_category_confirm", { name: category.name }),
                    action: () => ws.deleteCategory(this.hass, category.id),
                  })}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
          `
        )}
      </div>
    `;
  }

  private _renderProductList() {
    const l = this.localize;
    return html`
      <div class="rows">
        ${this.products.map((product, index) => {
          const category = this.categories.find(
            (c) => c.id === product.category_id
          );
          return html`
            <div class="row ${product.enabled ? "" : "disabled"}">
              <span class="avatar small" style=${avatarStyle(category?.color)}>
                ${iconTemplate(product.icon)}
              </span>
              <button class="row-main" @click=${() => this._startEditProduct(product)}>
                <span class="row-name">${product.name}</span>
                <span class="row-sub">
                  ${category?.name ?? l("no_category")}
                  ${product.default_weight != null
                    ? html` · ${product.default_weight} g`
                    : nothing}
                </span>
              </button>
              <button
                class="icon-btn"
                title=${l("move_up")}
                ?disabled=${index === 0}
                @click=${() => this._move("product", product.id, -1)}
              >
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
              <button
                class="icon-btn"
                title=${l("move_down")}
                ?disabled=${index === this.products.length - 1}
                @click=${() => this._move("product", product.id, 1)}
              >
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              <button
                class="icon-btn danger"
                title=${l("delete")}
                @click=${() =>
                  (this._confirm = {
                    text: l("delete_product_confirm", { name: product.name }),
                    action: () => ws.deleteProduct(this.hass, product.id),
                  })}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderCategoryForm() {
    const l = this.localize;
    const editing = this._editing as { kind: "category"; category: Category | null };
    return html`
      <h2 class="view-title">
        ${editing.category ? editing.category.name : l("add_category")}
      </h2>
      ${this._error ? html`<div class="error-banner">${this._error}</div>` : nothing}
      <div class="field">
        <label>${l("name")}</label>
        <input
          type="text"
          .value=${this._fName}
          @input=${(e: InputEvent) =>
            (this._fName = (e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="field">
        <label>${l("icon")} <span class="opt">(🍗 / mdi:…)</span></label>
        <input
          type="text"
          .value=${this._fIcon}
          @input=${(e: InputEvent) =>
            (this._fIcon = (e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="field">
        <label>${l("color")}</label>
        <div class="swatches">
          <button
            class="swatch none ${this._fColor === null ? "selected" : ""}"
            title="—"
            @click=${() => (this._fColor = null)}
          >
            ✕
          </button>
          ${COLOR_PALETTE.map(
            (color) => html`
              <button
                class="swatch ${this._fColor === color ? "selected" : ""}"
                style="background:${color}"
                title=${color}
                @click=${() => (this._fColor = color)}
              ></button>
            `
          )}
        </div>
      </div>
      <div class="field">
        <label>${l("max_months")} <span class="opt">(${l("optional")})</span></label>
        <input
          type="number"
          min="1"
          step="1"
          .value=${this._fMaxMonths}
          @input=${(e: InputEvent) =>
            (this._fMaxMonths = (e.target as HTMLInputElement).value)}
        />
      </div>
      ${editing.category ? this._renderEnabledToggle() : nothing}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this._busy || !this._fName.trim()}
          @click=${this._saveCategory}
        >
          ${l("save")}
        </button>
        <button class="btn btn-outline" @click=${() => (this._editing = null)}>
          ${l("cancel")}
        </button>
      </div>
    `;
  }

  private _renderProductForm() {
    const l = this.localize;
    const editing = this._editing as { kind: "product"; product: Product | null };
    return html`
      <h2 class="view-title">
        ${editing.product ? editing.product.name : l("add_product_btn")}
      </h2>
      ${this._error ? html`<div class="error-banner">${this._error}</div>` : nothing}
      <div class="field">
        <label>${l("name")}</label>
        <input
          type="text"
          .value=${this._fName}
          @input=${(e: InputEvent) =>
            (this._fName = (e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="field">
        <label>${l("category")}</label>
        <select
          .value=${this._fCategoryId}
          @change=${(e: Event) =>
            (this._fCategoryId = (e.target as HTMLSelectElement).value)}
        >
          <option value="" ?selected=${!this._fCategoryId}>
            ${l("no_category")}
          </option>
          ${this.categories.map(
            (category) => html`
              <option
                value=${category.id}
                ?selected=${category.id === this._fCategoryId}
              >
                ${category.name}
              </option>
            `
          )}
        </select>
      </div>
      <div class="field">
        <label>${l("icon")} <span class="opt">(🍗 / mdi:…)</span></label>
        <input
          type="text"
          .value=${this._fIcon}
          @input=${(e: InputEvent) =>
            (this._fIcon = (e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="field">
        <label>${l("default_weight")} <span class="opt">(${l("optional")})</span></label>
        <input
          type="number"
          min="1"
          step="1"
          .value=${this._fDefaultWeight}
          @input=${(e: InputEvent) =>
            (this._fDefaultWeight = (e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="field">
        <label>${l("quick_weights")}</label>
        <input
          type="text"
          placeholder="250, 500, 750, 1000"
          .value=${this._fQuickWeights}
          @input=${(e: InputEvent) =>
            (this._fQuickWeights = (e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="field">
        <label>${l("quick_pieces")}</label>
        <input
          type="text"
          placeholder="1, 2, 3, 4, 6"
          .value=${this._fQuickPieces}
          @input=${(e: InputEvent) =>
            (this._fQuickPieces = (e.target as HTMLInputElement).value)}
        />
      </div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked=${this._fAskForWeight}
          @change=${(e: Event) =>
            (this._fAskForWeight = (e.target as HTMLInputElement).checked)}
        />
        ${l("ask_for_weight")}
      </label>
      ${editing.product ? this._renderEnabledToggle() : nothing}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this._busy || !this._fName.trim()}
          @click=${this._saveProduct}
        >
          ${l("save")}
        </button>
        <button class="btn btn-outline" @click=${() => (this._editing = null)}>
          ${l("cancel")}
        </button>
      </div>
    `;
  }

  private _renderEnabledToggle() {
    return html`
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked=${this._fEnabled}
          @change=${(e: Event) =>
            (this._fEnabled = (e.target as HTMLInputElement).checked)}
        />
        ${this.localize("enabled")}
      </label>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .tabs {
        margin-bottom: 14px;
      }

      .rows {
        display: flex;
        flex-direction: column;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 56px;
        border-bottom: 1px solid var(--fi-divider);
        padding: 6px 0;
      }

      .row.disabled {
        opacity: 0.45;
      }

      .avatar.small {
        width: 38px;
        height: 38px;
      }

      .avatar.small ha-icon {
        --mdc-icon-size: 22px;
      }

      .row-main {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
        text-align: left;
        padding: 6px 0;
      }

      .row-name {
        font-weight: 600;
        font-size: 15px;
      }

      .row-sub {
        font-size: 13px;
        color: var(--fi-secondary);
      }

      .icon-btn {
        flex: none;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--fi-secondary);
      }

      .icon-btn:hover {
        background: color-mix(in srgb, var(--fi-accent) 10%, transparent);
      }

      .icon-btn.danger {
        color: var(--fi-danger);
      }

      .icon-btn[disabled] {
        opacity: 0.3;
        pointer-events: none;
      }

      .bottom {
        padding-top: 18px;
      }

      .toggle-row {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 44px;
        font-size: 15px;
        margin-bottom: 12px;
        cursor: pointer;
      }

      .toggle-row input {
        width: 20px;
        height: 20px;
      }

      .confirm-text {
        font-size: 16px;
        margin: 4px 0 20px;
        line-height: 1.4;
      }

      .swatches {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .swatch {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .swatch.selected {
        border-color: var(--fi-text);
        box-shadow: 0 0 0 2px var(--card-background-color, #fff) inset;
      }

      .swatch.none {
        border: 2px dashed var(--fi-divider);
        color: var(--fi-secondary);
        font-size: 14px;
      }

      button[disabled] {
        opacity: 0.6;
        pointer-events: none;
      }
    `,
  ];
}

customElements.define("fi-manage-view", FiManageView);
