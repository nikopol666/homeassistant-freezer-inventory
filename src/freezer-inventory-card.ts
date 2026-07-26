import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import type {
  CardConfig,
  Category,
  FreezerInfo,
  FreezerItem,
  HomeAssistant,
  IntegrationConfig,
  Product,
  Stats,
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
import "./views/scan-view";
import "./views/stats-view";
import type { ItemFormResult } from "./views/item-form";
import {
  niimbotPrintData,
  parseLabelFormat,
  printLabels,
  printUnsupported,
  qrAppLink,
  qrLink,
  qrPayload,
  QR_LINK_PARAM,
  shareLabelImages,
} from "./labels";

const CARD_VERSION = "1.5.0";
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
  @state() private _freezers: FreezerInfo[] = [];
  @state() private _stats: Stats | null = null;

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
    window.removeEventListener("popstate", this._onPopstate);
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

  /** Resolver for the string encoded in printed/displayed QR codes. */
  private get _qrData() {
    if (this._config.qr_content === "link") {
      const base =
        this._config.qr_link_base ||
        window.location.origin + window.location.pathname;
      return (item: Pick<FreezerItem, "id">) => qrLink(base, item);
    }
    if (this._config.qr_content === "app") {
      const basePath = this._config.qr_link_base || window.location.pathname;
      return (item: Pick<FreezerItem, "id">) => qrAppLink(basePath, item);
    }
    return qrPayload;
  }

  /** Deep link (?fi_item=<id> from a scanned label): open that item. */
  private _deepLinkChecked = false;

  private _checkDeepLink() {
    if (this._deepLinkChecked || this._config.display_mode === "stats") return;
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get(QR_LINK_PARAM);
    if (!itemId) {
      this._deepLinkChecked = true;
      return;
    }
    const item = this._items.find((i) => i.id === itemId);
    if (!item) return; // maybe another card's freezer — leave the param alone
    this._deepLinkChecked = true;
    params.delete(QR_LINK_PARAM);
    const query = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + (query ? `?${query}` : "") + window.location.hash
    );
    this._selectedItem = item;
    this._openDialog("remove");
  }

  private async _maybeInit() {
    if (this._initStarted || !this.hass || !this.isConnected) return;
    this._initStarted = true;
    try {
      const [integration, products, categories, freezers] = await Promise.all([
        ws.fetchConfig(this.hass),
        ws.fetchProducts(this.hass),
        ws.fetchCategories(this.hass),
        ws.fetchFreezers(this.hass),
      ]);
      this._integration = integration;
      this._products = products;
      this._categories = categories;
      this._freezers = freezers;
      if (this._config.display_mode === "stats") {
        this._stats = await ws.fetchStats(this.hass, this._freezerId);
      }
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
    if (payload.type === "freezers" && this.hass) {
      this._freezers = await ws.fetchFreezers(this.hass);
      return;
    }
    if (payload.type === "items") {
      if (this._config.display_mode === "stats" && this.hass) {
        this._stats = await ws.fetchStats(this.hass, this._freezerId);
      }
      if (payload.freezer_id !== this._freezerId) return;
      this._items = payload.items;
      this._loaded = true;
      this._checkDeepLink();
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
  private _historyPushed = false;

  /**
   * Android/browser back while the popup is open: go back to the list from a
   * subview, or close the popup — never leave the dashboard (same history
   * trick HA's own dialogs use).
   */
  private _onPopstate = () => {
    this._historyPushed = false;
    if (!this._dialogOpen) return;
    if (this._view !== "list" && this._config.display_mode !== "list") {
      this._backToList();
      window.history.pushState({ freezerInventoryDialog: true }, "");
      this._historyPushed = true;
    } else {
      this._closeDialog(true);
    }
  };

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
    if (!this._historyPushed) {
      window.history.pushState({ freezerInventoryDialog: true }, "");
      this._historyPushed = true;
      window.addEventListener("popstate", this._onPopstate);
    }
    this._resetAutoClose();
  }

  private _closeDialog(fromHistory = false) {
    this._dialogOpen = false;
    this._view = "list";
    this._selectedItem = null;
    this._pickedProduct = null;
    this._customProduct = false;
    this._errorText = "";
    this._lockPageOverscroll(false);
    if (this._autoCloseTimer) clearTimeout(this._autoCloseTimer);
    window.removeEventListener("popstate", this._onPopstate);
    if (this._historyPushed && !fromHistory) {
      // Consume the history entry we pushed so back works normally again
      this._historyPushed = false;
      window.history.back();
    }
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

  private async _onFormSubmit(
    e: CustomEvent<{ result: ItemFormResult; print?: boolean }>
  ) {
    const result = e.detail.result;
    const printAfter = e.detail.print === true;
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
      const data = {
        freezer_id: this._freezerId,
        product_id: this._customProduct ? undefined : this._pickedProduct?.id,
        product_name: result.product_name,
        month: result.month,
        year: result.year,
        weight: result.weight ?? undefined,
        pieces: result.pieces ?? undefined,
        note: result.note || undefined,
        quantity: result.quantity,
      };
      let createdIds: string[] = [];
      const ok = await this._mutate(async () => {
        if (printAfter) {
          createdIds = await ws.addItemWithIds(this.hass!, data);
        } else {
          await ws.addItem(this.hass!, data);
        }
      }, l("err_add_failed"));
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
        if (printAfter && createdIds.length) {
          // One label per created package, built from the submitted values
          const product = this._customProduct ? null : this._pickedProduct;
          const category = product?.category_id
            ? this._categories.find((c) => c.id === product.category_id)
            : undefined;
          const created: FreezerItem[] = createdIds.map((id) => ({
            id,
            product_id: product?.id ?? null,
            product_name: result.product_name,
            category_id: category?.id ?? null,
            category_name: category?.name ?? null,
            month: result.month,
            year: result.year,
            weight: result.weight,
            original_weight: result.weight,
            pieces: result.pieces,
            original_pieces: result.pieces,
            unit: "g",
            note: result.note,
            created_at: "",
            updated_at: "",
          }));
          await this._print(created);
        }
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

  private async _onMoveTo(freezer: FreezerInfo) {
    const item = this._selectedItem;
    if (!item) return;
    const l = this._localize;
    const ok = await this._mutate(
      () => ws.moveItem(this.hass!, item.id, this._freezerId, freezer.id),
      l("err_generic")
    );
    if (ok) {
      this._backToList();
      this._showToast(l("item_moved", { name: freezer.name }));
    }
  }

  private async _print(items: FreezerItem[]) {
    const l = this._localize;
    const format = parseLabelFormat(this._config.label_format);
    if (this._config.label_action === "niimbot") {
      // Direct print through the hass-niimbot integration
      if (!this.hass) return;
      this._busy = true;
      try {
        for (const item of items) {
          const data = niimbotPrintData(
            item,
            l,
            format,
            this._config.label_font,
            this._qrData
          );
          await this.hass.callService(
            "niimbot",
            "print",
            data as unknown as Record<string, unknown>,
            this._config.label_printer
              ? { device_id: this._config.label_printer }
              : undefined
          );
        }
        this._showToast(
          items.length > 1
            ? l("labels_sent", { count: items.length })
            : l("label_sent")
        );
      } catch (err) {
        this._showToast(ws.errorMessage(err, l("err_generic")));
      } finally {
        this._busy = false;
      }
      return;
    }
    if (this._config.label_action === "image") {
      // PNG for label-printer apps (Niimbot & co.) via share sheet/download
      try {
        const delivery = await shareLabelImages(items, l, format, this._qrData);
        if (delivery === "downloaded") {
          this._showToast(l("label_downloaded"));
        }
      } catch {
        this._showToast(l("err_generic"));
      }
      return;
    }
    if (printUnsupported()) {
      this._showToast(l("print_unsupported_app"));
      return;
    }
    printLabels(items, l, format, this._qrData);
  }

  private _onScanFound(e: CustomEvent<{ itemId: string }>) {
    const item = this._items.find((i) => i.id === e.detail.itemId);
    if (item) {
      this._selectedItem = item;
      this._view = "remove";
      this._errorText = "";
    } else {
      this._backToList();
      this._showToast(this._localize("scan_not_found"));
    }
  }

  // ------------------------------------------------------------------
  // Rendering

  render() {
    if (this._connectionError && !this._loaded) {
      return html`<ha-card>
        <div class="error-banner card-error">${this._connectionError}</div>
      </ha-card>`;
    }

    if (this._config.display_mode === "stats") {
      return html`${this._renderStats()} ${this._renderToast()}`;
    }
    const isList = this._config.display_mode === "list";
    return html`
      ${isList ? this._renderInlineList() : this._renderTile()}
      ${this._renderDialog()} ${this._renderToast()}
    `;
  }

  private _renderStats() {
    const l = this._localize;
    const name = this._config.name || this._friendlyName();
    return html`
      <ha-card>
        <div class="inline-header">
          <span class="avatar tile-avatar">
            ${iconTemplate(this._config.icon, "mdi:chart-box-outline")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${name}</span>
            <span class="tile-count">${l("stats_monthly")}</span>
          </span>
        </div>
        <div class="inline-body">
          <fi-stats-view
            ?touch=${this._touchMode}
            .stats=${this._stats}
            .categories=${this._categories}
            .localize=${l}
            .language=${this._config.language || this._integration?.language || "en"}
          ></fi-stats-view>
        </div>
      </ha-card>
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
        @fi-scan=${() => this._openDialog("scan")}
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
            .canMove=${this._freezers.length > 1}
            .qrData=${this._qrData(this._selectedItem)}
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
            @fi-move-item=${() => {
              this._view = "move";
              this._errorText = "";
            }}
            @fi-print-label=${() =>
              this._selectedItem && this._print([this._selectedItem])}
            @fi-remove-cancel=${() =>
              this._view === "amount"
                ? ((this._view = "remove"), (this._errorText = ""))
                : this._backToList()}
          ></fi-remove-dialog>
        `;
      case "move":
        if (!this._selectedItem) return this._renderListView();
        return html`
          <h2 class="view-title">${l("move_where")}</h2>
          ${this._errorText
            ? html`<div class="error-banner">${this._errorText}</div>`
            : nothing}
          <div class="row-of-buttons">
            ${this._freezers
              .filter((freezer) => freezer.id !== this._freezerId)
              .map(
                (freezer) => html`
                  <button
                    class="btn btn-outline"
                    ?disabled=${this._busy}
                    @click=${() => this._onMoveTo(freezer)}
                  >
                    ${freezer.name}
                  </button>
                `
              )}
            <button
              class="btn btn-quiet"
              @click=${() => {
                this._view = "remove";
                this._errorText = "";
              }}
            >
              ${l("cancel")}
            </button>
          </div>
        `;
      case "scan":
        return html`
          <fi-scan-view
            ?touch=${this._touchMode}
            .localize=${l}
            @fi-scan-found=${this._onScanFound}
            @fi-scan-cancel=${() => this._backToList()}
          ></fi-scan-view>
        `;
      case "manage":
        return html`
          <fi-manage-view
            ?touch=${this._touchMode}
            .hass=${this.hass}
            .localize=${l}
            .categories=${this._categories}
            .products=${this._products}
            @fi-print-all=${() => this._print(this._items)}
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
