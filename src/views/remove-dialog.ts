import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { FreezerItem } from "../types";
import type { LocalizeFunc } from "../localize";
import { itemLabel } from "../localize";
import { fireEvent } from "../ha-helpers";
import { sharedStyles } from "../styles";
import { qrSvg } from "../labels";

/** Confirm view for removing an item: whole / half / amount / edit / cancel. */
export class FiRemoveDialog extends LitElement {
  @property({ attribute: false }) localize!: LocalizeFunc;
  @property({ attribute: false }) item!: FreezerItem;
  @property({ attribute: false }) submitting = false;
  @property({ attribute: false }) errorText = "";
  /** "confirm" = button list, "amount" = numeric entry. */
  @property({ attribute: false }) mode: "confirm" | "amount" = "confirm";
  /** Show the MOVE button (more than one freezer exists). */
  @property({ attribute: false }) canMove = false;

  @state() private _amount = "";
  @state() private _pieces = "";
  @state() private _validationError = "";

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("item") || changed.has("mode")) {
      this._amount = "";
      this._pieces = "";
      this._validationError = "";
    }
  }

  private get _halfLabel(): string {
    const l = this.localize;
    if (this.item.weight != null) {
      return l("remove_half", {
        half: Math.floor(this.item.weight / 2 + 0.5),
      });
    }
    return l("remove_half_pieces", {
      half: Math.floor((this.item.pieces ?? 0) / 2 + 0.5),
    });
  }

  /** Parse an optional positive-int field; false = invalid, null = empty. */
  private _parseField(raw: string): number | null | false {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const value = Number(trimmed);
    if (!Number.isFinite(value) || !Number.isInteger(value) || value <= 0) {
      return false;
    }
    return value;
  }

  private _submitAmount() {
    const l = this.localize;
    this._validationError = "";

    const amount = this.item.weight != null ? this._parseField(this._amount) : null;
    const pieces = this.item.pieces != null ? this._parseField(this._pieces) : null;

    if (amount === false) {
      this._validationError = l("err_invalid_amount");
      return;
    }
    if (pieces === false) {
      this._validationError = l("err_invalid_pieces");
      return;
    }
    if (amount === null && pieces === null) {
      this._validationError = l("err_nothing_to_remove");
      return;
    }
    if (amount !== null && amount > (this.item.weight ?? 0)) {
      this._validationError = l("err_amount_too_big", {
        amount,
        weight: this.item.weight ?? 0,
      });
      return;
    }
    if (pieces !== null && pieces > (this.item.pieces ?? 0)) {
      this._validationError = l("err_pieces_too_big", {
        pieces,
        count: this.item.pieces ?? 0,
      });
      return;
    }
    fireEvent(this, "fi-remove-amount", { amount, pieces });
  }

  render() {
    return this.mode === "amount" ? this._renderAmount() : this._renderConfirm();
  }

  private _renderConfirm() {
    const l = this.localize;
    const hasWeight = this.item.weight != null;
    const hasPieces = this.item.pieces != null;
    const canHalve = hasWeight || (hasPieces && (this.item.pieces ?? 0) > 1);
    return html`
      <div class="title-row">
        <h2 class="view-title question">
          ${l("remove_question", { label: itemLabel(this.item, l) })}
        </h2>
        <div class="qr" title=${this.item.id}>${unsafeHTML(qrSvg(this.item, 3))}</div>
      </div>
      ${this.item.note
        ? html`
            <p class="note">
              <span class="note-label">${l("note_label")}</span> ${this.item.note}
            </p>
          `
        : nothing}
      ${this.errorText
        ? html`<div class="error-banner">${this.errorText}</div>`
        : nothing}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${() => fireEvent(this, "fi-remove-all")}
        >
          ${l("remove_all")}
        </button>
        ${canHalve
          ? html`
              <button
                class="btn btn-outline"
                ?disabled=${this.submitting}
                @click=${() => fireEvent(this, "fi-remove-half")}
              >
                ${this._halfLabel}
              </button>
            `
          : nothing}
        ${hasWeight || hasPieces
          ? html`
              <button
                class="btn btn-outline"
                @click=${() => fireEvent(this, "fi-enter-amount")}
              >
                ${l("remove_amount")}
              </button>
            `
          : nothing}
        <button
          class="btn btn-outline"
          @click=${() => fireEvent(this, "fi-edit-item")}
        >
          ${l("edit")}
        </button>
        ${this.canMove
          ? html`
              <button
                class="btn btn-outline"
                @click=${() => fireEvent(this, "fi-move-item")}
              >
                ${l("move")}
              </button>
            `
          : nothing}
        <button
          class="btn btn-outline"
          @click=${() => fireEvent(this, "fi-print-label")}
        >
          ${l("print_label")}
        </button>
        <button
          class="btn btn-quiet"
          @click=${() => fireEvent(this, "fi-remove-cancel")}
        >
          ${l("cancel")}
        </button>
      </div>
    `;
  }

  private _renderAmount() {
    const l = this.localize;
    const hasWeight = this.item.weight != null;
    const hasPieces = this.item.pieces != null;
    const weight = this.item.weight ?? 0;
    const pieceCount = this.item.pieces ?? 0;
    const unit = this.item.unit || "g";
    const piecesUnit = l("pieces_short");

    const amountValue = this._parseField(this._amount);
    const piecesValue = this._parseField(this._pieces);
    const remainingWeight =
      hasWeight && amountValue && amountValue <= weight ? weight - amountValue : null;
    const remainingPieces =
      hasPieces && piecesValue && piecesValue <= pieceCount
        ? pieceCount - piecesValue
        : null;

    const currentParts: string[] = [];
    if (hasWeight) currentParts.push(`${weight} ${unit}`);
    if (hasPieces) currentParts.push(`${pieceCount} ${piecesUnit}`);

    const remainingParts: string[] = [];
    if (remainingWeight !== null) remainingParts.push(`${remainingWeight} ${unit}`);
    else if (hasWeight && piecesValue) remainingParts.push(`${weight} ${unit}`);
    if (remainingPieces !== null)
      remainingParts.push(`${remainingPieces} ${piecesUnit}`);
    else if (hasPieces && amountValue)
      remainingParts.push(`${pieceCount} ${piecesUnit}`);

    return html`
      <h2 class="view-title">${l("how_much_remove")}</h2>
      <p class="current">
        ${l("currently_in_freezer")}
        <strong>${currentParts.join(" · ")}</strong>
      </p>
      ${this.errorText
        ? html`<div class="error-banner">${this.errorText}</div>`
        : nothing}
      ${this._validationError
        ? html`<div class="error-banner">${this._validationError}</div>`
        : nothing}
      <div class="form-body">
      ${hasWeight
        ? html`
            <div class="field">
              <label>${l("weight")}</label>
              <div class="amount-input">
                <input
                  type="number"
                  inputmode="numeric"
                  min="1"
                  max=${weight}
                  step="1"
                  .value=${this._amount}
                  @input=${(e: InputEvent) =>
                    (this._amount = (e.target as HTMLInputElement).value)}
                />
                <span class="unit">${unit}</span>
              </div>
            </div>
          `
        : nothing}
      ${hasPieces
        ? html`
            <div class="field">
              <label>${l("pieces_field")}</label>
              <div class="amount-input">
                <input
                  type="number"
                  inputmode="numeric"
                  min="1"
                  max=${pieceCount}
                  step="1"
                  .value=${this._pieces}
                  @input=${(e: InputEvent) =>
                    (this._pieces = (e.target as HTMLInputElement).value)}
                />
                <span class="unit">${piecesUnit}</span>
              </div>
            </div>
          `
        : nothing}
      </div>
      ${remainingParts.length && (amountValue || piecesValue)
        ? html`
            <p class="remaining">
              ${l("remaining_after")}
              <strong>${remainingParts.join(" · ")}</strong>
            </p>
          `
        : nothing}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${this._submitAmount}
        >
          ${l("confirm")}
        </button>
        <button
          class="btn btn-quiet"
          @click=${() => fireEvent(this, "fi-remove-cancel")}
        >
          ${l("cancel")}
        </button>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .question {
        line-height: 1.35;
      }

      .title-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 14px;
      }

      .title-row .view-title {
        flex: 1;
        min-width: 0;
      }

      .qr {
        flex: none;
        width: 84px;
        height: 84px;
        padding: 6px;
        background: #fff;
        border-radius: 8px;
      }

      .qr svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .note {
        margin: -6px 0 16px;
        font-size: 15px;
      }

      .note-label {
        color: var(--fi-secondary);
        font-weight: 600;
      }

      .current,
      .remaining {
        font-size: 15px;
        margin: 0 0 14px;
      }

      .amount-input {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .amount-input input {
        flex: 1;
        font-size: 22px;
        font-weight: 700;
        text-align: center;
      }

      .unit {
        color: var(--fi-secondary);
        font-weight: 600;
        font-size: 18px;
      }

      button[disabled] {
        opacity: 0.6;
        pointer-events: none;
      }

      /* Tablet mode on a wide screen: fields side by side, buttons in a grid */
      @media (min-width: 700px) {
        :host([touch]) .form-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 24px;
          align-items: start;
        }

        :host([touch]) .row-of-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        :host([touch]) .row-of-buttons .btn:first-child {
          grid-column: 1 / -1;
        }
      }
    `,
  ];
}

customElements.define("fi-remove-dialog", FiRemoveDialog);
