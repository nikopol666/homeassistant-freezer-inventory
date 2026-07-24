import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import type {
  CardConfig,
  Category,
  FreezerItem,
  HomeAssistant,
  IntegrationConfig,
  Product,
  UndoState,
  UpdatePayload,
  ViewName,
} from "./types";
import {
  createLocalize,
  itemCountText,
  itemLabel,
  type LocalizeFunc,
} from "./localize";
import { iconTemplate, loadHaComponents } from "./ha-helpers";
import { sharedStyles } from "./styles";
import * as ws from "./ws";
import "./views/list-view";
import "./views/product-picker";
import "./views/item-form";
import "./views/remove-dialog";
import "./views/manage-view";
import type { ItemFormResult } from "./views/item-form";

const CARD_VERSION = "1.0.1";
const DEFAULT_FREEZER = "main_freezer";
const UNDO_TIMEOUT = 6000;

console.info(
  `%c FREEZER-INVENTORY-CARD %c ${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);

class FreezerInventoryCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private _config: CardConfig = { type: "" };
  @state() private _items: FreezerItem[] = [];
  @state() private _products: Product[] = [];
  @state() private _categories: Category[] = [];
  @state() private _integration: IntegrationConfig | null = null;
  @state() private _dialogOpen = false;
  @state() private _view: ViewName = "list";
  @state() private _selectedItem: FreezerItem | null = null;
  @state() private _pickedProduct: Product | null = null;
  @state() private _customProduct = false;
  @state() private _errorText = "";
  @state() private _busy = false;
  @state() private _toast: { text: string; undo: UndoState | null } | null = null;
  @state() private _loaded = false;
  @state() private _connectionError = "";

  private _unsub?: Promise<() => Promise<void>>;
  private _toastTimer?: ReturnType<typeof setTimeout>;
  private _autoCloseTimer?: ReturnType<typeof setTimeout>;
  private _initStarted = false;

  // ------------------------------------------------------------------
  // Card contract

  static getConfigElement() {
    import("./editor");
    return document.createElement("freezer-inventory-card-editor");
  }

  static getStubConfig(): Partial<CardConfig> {
    return {
      freezer_id: DEFAULT_FREEZER,
      display_mode: "popup",
      touch_mode: true,
    };
  }

  setConfig(config: CardConfig) {
    this._config = { ...config };
  }

  getCardSize(): number {
    return this._config.display_mode === "list" ? 6 : 2;
  }

  getGridOptions() {
    return this._config.display_mode === "list"
      ? { rows: 8, columns: 12, min_rows: 4 }
      : { rows: 2, columns: 6, min_rows: 1 };
  }

  // ------------------------------------------------------------------
  // Lifecycle / data

  connectedCallback() {
    super.connectedCallback();
    loadHaComponents();
    this._maybeInit();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsub?.then((unsub) => unsub()).catch(() => undefined);
    this._unsub = undefined;
    this._initStarted = false;
    if (this._toastTimer) clearTimeout(this._toastTimer);
    if (this._autoCloseTimer) clearTimeout(this._autoCloseTimer);
    this._lockPageOverscroll(false);
  }

  /** Restart the inactivity timer that auto-closes the popup. */
  private _resetAutoClose() {
    if (this._autoCloseTimer) clearTimeout(this._autoCloseTimer);
    const seconds = Number(this._config.auto_close) || 0;
    if (seconds > 0 && this._dialogOpen) {
      this._autoCloseTimer = setTimeout(() => {
        if (this._dialogOpen) this._closeDialog();
      }, seconds * 1000);
    }
  }

  updated() {
    this._maybeInit();
    if (this._focusPending && this._dialogOpen) {
      this._focusPending = false;
      (
        this.renderRoot.querySelector(".overlay-card") as HTMLElement | null
      )?.focus();
    }
  }

  private get _freezerId(): string {
    return this._config.freezer_id || DEFAULT_FREEZER;
  }

  private get _localize(): LocalizeFunc {
    const language =
      this._config.language ||
      this._integration?.language ||
      (this.hass?.locale?.language === "cs" ? "cs" : "en");
    return createLocalize(language);
  }

  private get _touchMode(): boolean {
    return this._config.touch_mode !== false;
  }

  private get _oldMonths(): number {
    return this._config.old_months ?? this._integration?.old_months ?? 6;
  }

  private async _maybeInit() {
    if (this._initStarted || !this.hass || !this.isConnected) return;
    this._initStarted = true;
    try {
      const [integration, products, categories] = await Promise.all([
        ws.fetchConfig(this.hass),
        ws.fetchProducts(this.hass),
        ws.fetchCategories(this.hass),
      ]);
      this._integration = integration;
      this._products = products;
      this._categories = categories;
      this._unsub = ws.subscribeUpdates(this.hass, (payload) =>
        this._handleUpdate(payload)
      );
      await this._unsub;
      this._loaded = true;
      this._connectionError = "";
    } catch (err) {
      this._connectionError = ws.errorMessage(err, "Freezer Inventory not available");
      this._initStarted = false; // retry on next update
    }
  }

  private async _handleUpdate(payload: UpdatePayload) {
    if (payload.type === "items") {
      if (payload.freezer_id !== this._freezerId) return;
      this._items = payload.items;
      this._loaded = true;
      // The selected item may have changed or vanished under our hands
      if (this._selectedItem) {
        const fresh = payload.items.find((i) => i.id === this._selectedItem!.id);
        if (fresh) {
          this._selectedItem = fresh;
        } else if (this._view === "remove" || this._view === "amount") {
          this._selectedItem = null;
          this._view = "list";
        }
      }
    } else if (payload.type === "catalog" && this.hass) {
      const [products, categories] = await Promise.all([
        ws.fetchProducts(this.hass),
        ws.fetchCategories(this.hass),
      ]);
      this._products = products;
      this._categories = categories;
    }
  }

  // ------------------------------------------------------------------
  // Helpers

  private get _sortedItems(): FreezerItem[] {
    return this._config.sort === "newest_first"
      ? [...this._items].reverse()
      : this._items;
  }

  private _showToast(text: string, undo: UndoState | null = null) {
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toast = { text, undo };
    this._toastTimer = setTimeout(() => (this._toast = null), UNDO_TIMEOUT);
  }

  private async _undo() {
    const undo = this._toast?.undo;
    this._toast = null;
    if (!undo || !this.hass) return;
    try {
      if (undo.kind === "remove") {
        await ws.restoreItem(this.hass, this._freezerId, undo.item);
      } else {
        const changes: Record<string, unknown> = {};
        if (undo.previousWeight != null) changes.weight = undo.previousWeight;
        if (undo.previousPieces != null) changes.pieces = undo.previousPieces;
        if (Object.keys(changes).length) {
          await ws.updateItem(this.hass, this._freezerId, undo.item.id, changes);
        }
      }
    } catch (err) {
      this._showToast(ws.errorMessage(err, this._localize("err_generic")));
    }
  }

  private _focusPending = false;
  private _prevOverscroll?: { html: string; body: string };

  /** Disable pull-to-refresh while the popup is open (kiosk tablets). */
  private _lockPageOverscroll(lock: boolean) {
    const htmlStyle = document.documentElement.style;
    const bodyStyle = document.body.style;
    if (lock && !this._prevOverscroll) {
      this._prevOverscroll = {
        html: htmlStyle.overscrollBehaviorY,
        body: bodyStyle.overscrollBehaviorY,
      };
      htmlStyle.overscrollBehaviorY = "none";
      bodyStyle.overscrollBehaviorY = "none";
    } else if (!lock && this._prevOverscroll) {
      htmlStyle.overscrollBehaviorY = this._prevOverscroll.html;
      bodyStyle.overscrollBehaviorY = this._prevOverscroll.body;
      this._prevOverscroll = undefined;
    }
  }

  private _openDialog(view: ViewName = "list") {
    this._view = view;
    this._errorText = "";
    this._dialogOpen = true;
    this._focusPending = true;
    this._lockPageOverscroll(true);
    this._resetAutoClose();
  }

  private _closeDialog() {
    this._dialogOpen = false;
    this._view = "list";
    this._selectedItem = null;
    this._pickedProduct = null;
    this._customProduct = false;
    this._errorText = "";
    this._lockPageOverscroll(false);
    if (this._autoCloseTimer) clearTimeout(this._autoCloseTimer);
  }

  private _backToList() {
    this._view = "list";
    this._selectedItem = null;
    this._pickedProduct = null;
    this._customProduct = false;
    this._errorText = "";
    if (this._config.display_mode === "list") {
      this._dialogOpen = false;
    }
  }

  private async _mutate(action: () => Promise<void>, failText: string) {
    if (!this.hass) return;
    this._busy = true;
    this._errorText = "";
    try {
      await action();
      return true;
    } catch (err) {
      this._errorText = ws.errorMessage(err, failText);
      return false;
    } finally {
      this._busy = false;
    }
  }

  // ------------------------------------------------------------------
  // Event handlers from views

  private async _onFormSubmit(e: CustomEvent<{ result: ItemFormResult }>) {
    const result = e.detail.result;
    const l = this._localize;
    if (this._view === "edit" && this._selectedItem) {
      const item = this._selectedItem;
      const ok = await this._mutate(
        () =>
          ws.updateItem(this.hass!, this._freezerId, item.id, {
            product_name: result.product_name,
            month: result.month,
            year: result.year,
            weight: result.weight,
            original_weight: result.original_weight ?? null,
            pieces: result.pieces,
            note: result.note,
          }),
        l("err_generic")
      );
      if (ok) {
        this._backToList();
        this._showToast(l("item_updated"));
      }
    } else {
      const ok = await this._mutate(
        () =>
          ws.addItem(this.hass!, {
            freezer_id: this._freezerId,
            product_id: this._customProduct ? undefined : this._pickedProduct?.id,
            product_name: result.product_name,
            month: result.month,
            year: result.year,
            weight: result.weight ?? undefined,
            pieces: result.pieces ?? undefined,
            note: result.note || undefined,
            quantity: result.quantity,
          }),
        l("err_add_failed")
      );
      if (ok) {
        const label = [
          result.product_name,
          `${String(result.month).padStart(2, "0")}/${result.year}`,
          result.weight != null ? `${result.weight} g` : null,
          result.pieces != null
            ? `${result.pieces} ${l("pieces_short")}`
            : null,
        ]
          .filter(Boolean)
          .join(" · ");
        const prefix = result.quantity > 1 ? `${result.quantity}× ` : "";
        this._backToList();
        this._showToast(`${l("added_confirmation")} ${prefix}${label}`);
      }
    }
  }

  private async _onRemoveAll() {
    const item = this._selectedItem;
    if (!item) return;
    const l = this._localize;
    const ok = await this._mutate(
      () => ws.removeItem(this.hass!, this._freezerId, item.id),
      l("err_generic")
    );
    if (ok) {
      this._backToList();
      this._showToast(l("item_removed"), {
        kind: "remove",
        item,
        label: itemLabel(item, l),
      });
    }
  }

  private async _onRemoveHalf() {
    const item = this._selectedItem;
    if (!item) return;
    const l = this._localize;
    const previousWeight = item.weight ?? undefined;
    const previousPieces = item.pieces ?? undefined;
    const ok = await this._mutate(
      () => ws.removeHalf(this.hass!, this._freezerId, item.id),
      l("err_generic")
    );
    if (ok) {
      this._backToList();
      this._showToast(l("item_updated"), {
        kind: "weight",
        item,
        previousWeight,
        previousPieces,
        label: itemLabel(item, l),
      });
    }
  }

  private async _onRemoveAmount(
    e: CustomEvent<{ amount: number | null; pieces: number | null }>
  ) {
    const item = this._selectedItem;
    if (!item) return;
    const l = this._localize;
    const { amount, pieces } = e.detail;
    const previousWeight = item.weight ?? undefined;
    const previousPieces = item.pieces ?? undefined;
    const fullRemoval =
      (amount != null && amount === item.weight) ||
      (pieces != null && pieces === item.pieces);
    const ok = await this._mutate(
      () =>
        ws.removeAmount(this.hass!, this._freezerId, item.id, {
          amount: amount ?? undefined,
          pieces: pieces ?? undefined,
        }),
      l("err_generic")
    );
    if (ok) {
      this._backToList();
      this._showToast(
        fullRemoval ? l("item_removed") : l("item_updated"),
        fullRemoval
          ? { kind: "remove", item, label: itemLabel(item, l) }
          : {
              kind: "weight",
              item,
              previousWeight,
              previousPieces,
              label: itemLabel(item, l),
            }
      );
    }
  }

  private async _onFormRemove() {
    // Edit form asked to delete the item (weight set to 0)
    await this._onRemoveAll();
  }

  // ------------------------------------------------------------------
  // Rendering

  render() {
    if (this._connectionError && !this._loaded) {
      return html`<ha-card>
        <div class="error-banner card-error">${this._connectionError}</div>
      </ha-card>`;
    }

    const isList = this._config.display_mode === "list";
    return html`
      ${isList ? this._renderInlineList() : this._renderTile()}
      ${this._renderDialog()} ${this._renderToast()}
    `;
  }

  private _renderTile() {
    const l = this._localize;
    const name = this._config.name || this._friendlyName();
    const count = this._items.length;
    return html`
      <ha-card>
        <button class="tile" @click=${() => this._openDialog("list")}>
          <span class="avatar tile-avatar">
            ${iconTemplate(this._config.icon, "mdi:snowflake")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${name}</span>
            ${this._config.show_count !== false
              ? html`<span class="tile-count"
                  >${itemCountText(l, count)}</span
                >`
              : nothing}
          </span>
        </button>
      </ha-card>
    `;
  }

  private _renderInlineList() {
    const l = this._localize;
    const name = this._config.name || this._friendlyName();
    return html`
      <ha-card>
        <div class="inline-header">
          <span class="avatar tile-avatar">
            ${iconTemplate(this._config.icon, "mdi:snowflake")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${name}</span>
            ${this._config.show_count !== false
              ? html`<span class="tile-count"
                  >${itemCountText(l, this._items.length)}</span
                >`
              : nothing}
          </span>
        </div>
        <div class="inline-body">${this._renderListView()}</div>
      </ha-card>
    `;
  }

  private _friendlyName(): string {
    return this._integration?.language === "en" ? "Freezer" : "Mrazák";
  }

  private _renderListView() {
    return html`
      <fi-list-view
        ?touch=${this._touchMode}
        .items=${this._sortedItems}
        .categories=${this._categories}
        .localize=${this._localize}
        .oldMonths=${this._oldMonths}
        .showWeight=${this._config.show_weight !== false}
        .showNote=${this._config.show_note !== false}
        .isAdmin=${this.hass?.user?.is_admin ?? false}
        @fi-add=${() => this._openDialog("picker")}
        @fi-manage=${() => this._openDialog("manage")}
        @fi-select-item=${(e: CustomEvent<{ item: FreezerItem }>) => {
          this._selectedItem = e.detail.item;
          this._openDialog("remove");
        }}
      ></fi-list-view>
    `;
  }

  private _renderCurrentView(): TemplateResult {
    const l = this._localize;
    switch (this._view) {
      case "picker":
        return html`
          <fi-product-picker
            ?touch=${this._touchMode}
            .products=${this._products}
            .categories=${this._categories}
            .localize=${l}
            @fi-pick-product=${(e: CustomEvent<{ product: Product }>) => {
              this._pickedProduct = e.detail.product;
              this._customProduct = false;
              this._view = "form";
              this._errorText = "";
            }}
            @fi-pick-other=${() => {
              this._pickedProduct = null;
              this._customProduct = true;
              this._view = "form";
              this._errorText = "";
            }}
          ></fi-product-picker>
        `;
      case "form":
      case "edit":
        return html`
          <fi-item-form
            ?touch=${this._touchMode}
            .localize=${l}
            .product=${this._view === "edit" ? null : this._pickedProduct}
            .item=${this._view === "edit" ? this._selectedItem : null}
            .submitting=${this._busy}
            .errorText=${this._errorText}
            @fi-form-submit=${this._onFormSubmit}
            @fi-form-cancel=${() => this._backToList()}
            @fi-form-remove=${this._onFormRemove}
          ></fi-item-form>
        `;
      case "remove":
      case "amount":
        if (!this._selectedItem) return this._renderListView();
        return html`
          <fi-remove-dialog
            ?touch=${this._touchMode}
            .localize=${l}
            .item=${this._selectedItem}
            .mode=${this._view === "amount" ? "amount" : "confirm"}
            .submitting=${this._busy}
            .errorText=${this._errorText}
            @fi-remove-all=${this._onRemoveAll}
            @fi-remove-half=${this._onRemoveHalf}
            @fi-enter-amount=${() => {
              this._view = "amount";
              this._errorText = "";
            }}
            @fi-remove-amount=${this._onRemoveAmount}
            @fi-edit-item=${() => {
              this._view = "edit";
              this._errorText = "";
            }}
            @fi-remove-cancel=${() =>
              this._view === "amount"
                ? ((this._view = "remove"), (this._errorText = ""))
                : this._backToList()}
          ></fi-remove-dialog>
        `;
      case "manage":
        return html`
          <fi-manage-view
            ?touch=${this._touchMode}
            .hass=${this.hass}
            .localize=${l}
            .categories=${this._categories}
            .products=${this._products}
            @fi-manage-close=${() => this._backToList()}
          ></fi-manage-view>
        `;
      case "list":
      default:
        return this._renderListView();
    }
  }

  private _renderDialog() {
    if (!this._dialogOpen) return nothing;
    const l = this._localize;
    const name = this._config.name || this._friendlyName();
    // Own overlay dialog: fixed header, scrollable body. ha-dialog kept
    // biting us on mobile (own close button, scrolling header), so the card
    // controls the whole popup itself.
    return html`
      <div
        class="overlay"
        role="dialog"
        aria-modal="true"
        aria-label=${name}
        @keydown=${this._onDialogKeydown}
        @pointerdown=${(e: Event) => {
          this._resetAutoClose();
          if (e.target === e.currentTarget) this._closeDialog();
        }}
        @input=${() => this._resetAutoClose()}
      >
        <div
          class="overlay-card ${this._touchMode ? "touch" : ""}"
          tabindex="-1"
        >
          <div class="dialog-header">
            <h1 class="dialog-title">${name}</h1>
            <button
              class="close-btn"
              aria-label=${l("close")}
              @click=${() => this._closeDialog()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-content">${this._renderCurrentView()}</div>
        </div>
      </div>
    `;
  }

  private _onDialogKeydown = (e: KeyboardEvent) => {
    this._resetAutoClose();
    if (e.key === "Escape") {
      e.stopPropagation();
      this._closeDialog();
    }
  };

  private _renderToast() {
    if (!this._toast) return nothing;
    return html`
      <div class="toast" role="status">
        <span class="toast-text">${this._toast.text}</span>
        ${this._toast.undo
          ? html`
              <button class="toast-undo" @click=${() => this._undo()}>
                ${this._localize("undo")}
              </button>
            `
          : nothing}
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      ha-card {
        overflow: hidden;
      }

      .card-error {
        margin: 12px;
      }

      .tile,
      .inline-header {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;
        padding: 16px;
        text-align: left;
      }

      .tile {
        min-height: 76px;
      }

      .tile:hover {
        background: color-mix(in srgb, var(--fi-accent) 6%, transparent);
      }

      .tile-avatar {
        width: 52px;
        height: 52px;
      }

      .tile-avatar ha-icon {
        --mdc-icon-size: 30px;
      }

      .tile-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .tile-name {
        font-size: 18px;
        font-weight: 700;
      }

      .tile-count {
        font-size: 14px;
        color: var(--fi-secondary);
      }

      .inline-header {
        border-bottom: 1px solid var(--fi-divider);
      }

      .inline-body {
        padding: 12px 16px 16px;
      }

      /* Popup: own overlay with fixed header and scrollable body */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        padding: 16px;
      }

      .overlay-card {
        display: flex;
        flex-direction: column;
        min-width: 0;
        background: var(--card-background-color, var(--ha-card-background, #fff));
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        width: min(520px, 96vw);
        max-height: min(90dvh, 820px);
        overflow: hidden;
        outline: none;
      }

      /* Tablet mode on a wide screen: wider popup, forms fit without scroll */
      @media (min-width: 700px) {
        .overlay-card.touch {
          width: min(860px, 94vw);
        }
      }

      .dialog-header {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 20px 10px;
        border-bottom: 1px solid var(--fi-divider);
      }

      .dialog-title {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .close-btn {
        flex: none;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--fi-secondary);
      }

      .close-btn:hover {
        background: color-mix(in srgb, var(--fi-accent) 10%, transparent);
      }

      .dialog-content {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding: 12px 20px calc(16px + env(safe-area-inset-bottom, 0px));
      }

      /* Toast / undo snackbar */
      .toast {
        position: fixed;
        left: 50%;
        bottom: 28px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 18px;
        background: var(--primary-text-color, #1c1e24);
        color: var(--card-background-color, #fff);
        border-radius: 12px;
        padding: 14px 20px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: min(92vw, 560px);
        font-size: 15px;
      }

      .toast-undo {
        color: var(--fi-accent);
        font-weight: 700;
        letter-spacing: 0.5px;
        white-space: nowrap;
        min-height: 44px;
      }

      @media (max-width: 450px), (max-height: 500px) {
        .overlay {
          padding: 0;
        }

        .overlay-card {
          width: 100vw;
          height: 100dvh;
          max-height: 100dvh;
          border-radius: 0;
        }

        .dialog-header {
          padding-top: max(14px, env(safe-area-inset-top, 0px));
        }

        .dialog-content {
          padding: 12px 16px calc(16px + env(safe-area-inset-bottom, 0px));
        }
      }
    `,
  ];
}

customElements.define("freezer-inventory-card", FreezerInventoryCard);

declare global {
  interface Window {
    customCards?: unknown[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "freezer-inventory-card",
  name: "Freezer Inventory Card",
  description:
    "Touch-friendly freezer inventory card for the Freezer Inventory integration.",
  preview: false,
  documentationURL: "https://github.com/nikopol666/homeassistant-freezer-inventory",
});
