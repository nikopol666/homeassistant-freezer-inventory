import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { FreezerItem, Product } from "../types";
import type { LocalizeFunc } from "../localize";
import { fireEvent } from "../ha-helpers";
import { sharedStyles } from "../styles";

export interface ItemFormResult {
  product_id?: string;
  product_name: string;
  month: number;
  year: number;
  weight: number | null;
  original_weight?: number | null;
  pieces: number | null;
  note: string;
  quantity: number;
}

export class FiItemForm extends LitElement {
  @property({ attribute: false }) localize!: LocalizeFunc;
  /** Preset product when adding from the picker (null = custom name). */
  @property({ attribute: false }) product: Product | null = null;
  /** Existing item when editing (null = add mode). */
  @property({ attribute: false }) item: FreezerItem | null = null;
  @property({ attribute: false }) submitting = false;
  @property({ attribute: false }) errorText = "";

  @state() private _name = "";
  @state() private _weight = "";
  @state() private _originalWeight = "";
  @state() private _pieces = "";
  @state() private _month = new Date().getMonth() + 1;
  @state() private _year = new Date().getFullYear();
  @state() private _note = "";
  @state() private _quantity = 1;
  @state() private _validationError = "";
  @state() private _confirmZeroWeight = false;

  private get _isEdit(): boolean {
    return this.item !== null;
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("item") || changed.has("product")) {
      this._initFromProps();
    }
  }

  private _initFromProps() {
    this._validationError = "";
    this._confirmZeroWeight = false;
    this._quantity = 1;
    if (this.item) {
      this._name = this.item.product_name;
      this._weight = this.item.weight != null ? String(this.item.weight) : "";
      this._originalWeight =
        this.item.original_weight != null
          ? String(this.item.original_weight)
          : "";
      this._pieces = this.item.pieces != null ? String(this.item.pieces) : "";
      this._month = this.item.month;
      this._year = this.item.year;
      this._note = this.item.note ?? "";
    } else {
      this._name = this.product?.name ?? "";
      this._weight = ""; // optional fields must never be prefilled
      this._originalWeight = "";
      this._pieces = "";
      this._month = new Date().getMonth() + 1;
      this._year = new Date().getFullYear();
      this._note = "";
    }
  }

  private get _showWeightField(): boolean {
    if (this._isEdit) return true;
    return this.product ? this.product.ask_for_weight : true;
  }

  private _parseWeight(raw: string): number | null | false {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const value = Number(trimmed);
    if (!Number.isFinite(value) || value < 0 || !Number.isInteger(value)) {
      return false;
    }
    return value;
  }

  private _printAfter = false;

  private _submit() {
    const l = this.localize;
    this._validationError = "";

    const name = this._name.trim();
    if (!name) {
      this._validationError = l("err_name_required");
      return;
    }
    const weight = this._parseWeight(this._weight);
    if (weight === false) {
      this._validationError = l("err_invalid_weight");
      return;
    }
    let originalWeight: number | null | false = null;
    if (this._isEdit) {
      originalWeight = this._parseWeight(this._originalWeight);
      if (originalWeight === false || originalWeight === 0) {
        this._validationError = l("err_invalid_weight");
        return;
      }
    }
    const pieces = this._parseWeight(this._pieces);
    if (pieces === false || pieces === 0) {
      this._validationError = l("err_invalid_pieces");
      return;
    }
    if (this._month < 1 || this._month > 12) {
      this._validationError = l("err_invalid_month");
      return;
    }
    const currentYear = new Date().getFullYear();
    if (this._year < currentYear - 20 || this._year > currentYear + 5) {
      this._validationError = l("err_invalid_year");
      return;
    }
    if (!this._isEdit && weight === 0) {
      this._validationError = l("err_invalid_weight");
      return;
    }
    if (this._isEdit && weight === 0) {
      this._confirmZeroWeight = true;
      return;
    }

    const result: ItemFormResult = {
      product_id: this.product?.id ?? this.item?.product_id ?? undefined,
      product_name: name,
      month: this._month,
      year: this._year,
      weight: weight,
      pieces: pieces,
      note: this._note.trim(),
      quantity: this._quantity,
    };
    if (this._isEdit) {
      result.original_weight = originalWeight;
    }
    fireEvent(this, "fi-form-submit", { result, print: this._printAfter });
    this._printAfter = false;
  }

  render() {
    const l = this.localize;
    // Quick chips: quick_weights plus the product's default weight
    let quickWeights: number[] = [];
    let quickPieces: number[] = [];
    if (!this._isEdit) {
      const weights = new Set(this.product?.quick_weights ?? []);
      if (this.product?.default_weight != null) {
        weights.add(this.product.default_weight);
      }
      quickWeights = [...weights].sort((a, b) => a - b);
      quickPieces = this.product?.quick_pieces?.length
        ? this.product.quick_pieces
        : [1, 2, 3, 4, 6];
    }
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let y = currentYear + 1; y >= currentYear - 20; y--) years.push(y);

    if (this._confirmZeroWeight) {
      return html`
        <h2 class="view-title">${l("edit_item_title")}</h2>
        <p class="confirm-text">${l("weight_zero_remove")}</p>
        <div class="row-of-buttons">
          <button
            class="btn btn-danger"
            @click=${() => fireEvent(this, "fi-form-remove")}
          >
            ${l("remove_item_btn")}
          </button>
          <button
            class="btn btn-outline"
            @click=${() => (this._confirmZeroWeight = false)}
          >
            ${l("cancel")}
          </button>
        </div>
      `;
    }

    return html`
      <h2 class="view-title">
        ${this._isEdit
          ? l("edit_item_title")
          : l("add_product_title", { name: this._name || "…" })}
      </h2>

      ${this.errorText
        ? html`<div class="error-banner">${this.errorText}</div>`
        : nothing}
      ${this._validationError
        ? html`<div class="error-banner">${this._validationError}</div>`
        : nothing}

      <div class="form-body">
      ${this._isEdit || !this.product
        ? html`
            <div class="field">
              <label for="name">${l(this._isEdit ? "product" : "custom_product_name")}</label>
              <input
                id="name"
                type="text"
                .value=${this._name}
                @input=${(e: InputEvent) =>
                  (this._name = (e.target as HTMLInputElement).value)}
              />
            </div>
          `
        : nothing}

      ${this._showWeightField
        ? html`
            <div class="field">
              <label for="weight">
                ${l("weight")} <span class="opt">(${l("optional")})</span>
              </label>
              ${quickWeights.length
                ? html`
                    <div class="chips weight-chips">
                      ${quickWeights.map(
                        (w) => html`
                          <button
                            class="chip ${this._weight === String(w) ? "active" : ""}"
                            @click=${() =>
                              (this._weight =
                                this._weight === String(w) ? "" : String(w))}
                          >
                            ${w} g
                          </button>
                        `
                      )}
                    </div>
                  `
                : nothing}
              <div class="weight-input">
                <input
                  id="weight"
                  type="number"
                  inputmode="numeric"
                  min="0"
                  step="1"
                  .value=${this._weight}
                  @input=${(e: InputEvent) =>
                    (this._weight = (e.target as HTMLInputElement).value)}
                />
                <span class="unit">g</span>
              </div>
            </div>
          `
        : nothing}

      <div class="field">
        <label for="pieces">
          ${l("pieces_field")} <span class="opt">(${l("optional")})</span>
        </label>
        ${quickPieces.length
          ? html`
              <div class="chips weight-chips">
                ${quickPieces.map(
                  (p) => html`
                    <button
                      class="chip ${this._pieces === String(p) ? "active" : ""}"
                      @click=${() =>
                        (this._pieces =
                          this._pieces === String(p) ? "" : String(p))}
                    >
                      ${p} ${l("pieces_short")}
                    </button>
                  `
                )}
              </div>
            `
          : nothing}
        <div class="weight-input">
          <input
            id="pieces"
            type="number"
            inputmode="numeric"
            min="1"
            step="1"
            .value=${this._pieces}
            @input=${(e: InputEvent) =>
              (this._pieces = (e.target as HTMLInputElement).value)}
          />
          <span class="unit">${l("pieces_short")}</span>
        </div>
      </div>

      ${this._isEdit
        ? html`
            <div class="field">
              <label for="oweight">
                ${l("original_weight")} <span class="opt">(${l("optional")})</span>
              </label>
              <div class="weight-input">
                <input
                  id="oweight"
                  type="number"
                  inputmode="numeric"
                  min="1"
                  step="1"
                  .value=${this._originalWeight}
                  @input=${(e: InputEvent) =>
                    (this._originalWeight = (e.target as HTMLInputElement).value)}
                />
                <span class="unit">g</span>
              </div>
            </div>
          `
        : nothing}

      <div class="two-cols">
        <div class="field">
          <label for="month">${l("month")}</label>
          <select
            id="month"
            .value=${String(this._month)}
            @change=${(e: Event) =>
              (this._month = Number((e.target as HTMLSelectElement).value))}
          >
            ${Array.from({ length: 12 }, (_, i) => i + 1).map(
              (m) => html`
                <option value=${m} ?selected=${m === this._month}>
                  ${l(`month_${m}`)}
                </option>
              `
            )}
          </select>
        </div>
        <div class="field">
          <label for="year">${l("year")}</label>
          <select
            id="year"
            .value=${String(this._year)}
            @change=${(e: Event) =>
              (this._year = Number((e.target as HTMLSelectElement).value))}
          >
            ${years.map(
              (y) => html`
                <option value=${y} ?selected=${y === this._year}>${y}</option>
              `
            )}
          </select>
        </div>
      </div>

      ${!this._isEdit
        ? html`
            <div class="field">
              <label>${l("quantity")}</label>
              <div class="stepper">
                <button
                  class="step-btn"
                  aria-label="−"
                  @click=${() =>
                    (this._quantity = Math.max(1, this._quantity - 1))}
                >
                  −
                </button>
                <span class="step-value">${this._quantity}</span>
                <button
                  class="step-btn"
                  aria-label="+"
                  @click=${() =>
                    (this._quantity = Math.min(50, this._quantity + 1))}
                >
                  +
                </button>
              </div>
            </div>
          `
        : nothing}

      <div class="field">
        <label for="note">
          ${l("note")} <span class="opt">(${l("optional")})</span>
        </label>
        <input
          id="note"
          type="text"
          .value=${this._note}
          @input=${(e: InputEvent) =>
            (this._note = (e.target as HTMLInputElement).value)}
        />
      </div>
      </div>

      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${() => {
            this._printAfter = false;
            this._submit();
          }}
        >
          ${this._isEdit ? l("save") : l("add_to_freezer")}
        </button>
        ${!this._isEdit
          ? html`
              <button
                class="btn btn-outline"
                ?disabled=${this.submitting}
                @click=${() => {
                  this._printAfter = true;
                  this._submit();
                }}
              >
                ${l("add_and_print")}
              </button>
            `
          : nothing}
        <button
          class="btn btn-outline"
          @click=${() => fireEvent(this, "fi-form-cancel")}
        >
          ${l("cancel")}
        </button>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .two-cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .weight-chips {
        margin-bottom: 8px;
      }

      .weight-input {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .weight-input input {
        flex: 1;
      }

      .unit {
        color: var(--fi-secondary);
        font-weight: 600;
      }

      .stepper {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .step-btn {
        width: 52px;
        height: 48px;
        border: 1px solid var(--fi-divider);
        border-radius: 10px;
        font-size: 24px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .step-btn:hover {
        background: color-mix(in srgb, var(--fi-accent) 8%, transparent);
      }

      .step-value {
        min-width: 40px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
      }

      .confirm-text {
        font-size: 16px;
        margin: 0 0 20px;
      }

      button[disabled] {
        opacity: 0.6;
        pointer-events: none;
      }

      /* Tablet mode on a wide screen: two-column form, no scrolling needed */
      @media (min-width: 700px) {
        :host([touch]) .form-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 24px;
          align-items: start;
        }

        :host([touch]) .row-of-buttons {
          flex-direction: row-reverse;
          justify-content: flex-start;
          gap: 12px;
        }

        :host([touch]) .row-of-buttons .btn {
          width: auto;
          min-width: 220px;
        }
      }
    `,
  ];
}

customElements.define("fi-item-form", FiItemForm);
