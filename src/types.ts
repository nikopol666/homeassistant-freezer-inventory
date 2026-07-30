export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface HassConnection {
  subscribeMessage<T>(
    callback: (msg: T) => void,
    message: Record<string, unknown>
  ): Promise<() => Promise<void>>;
  sendMessagePromise<T>(message: Record<string, unknown>): Promise<T>;
}

export interface HomeAssistant {
  connection: HassConnection;
  states: Record<string, HassEntity>;
  language: string;
  locale?: { language: string };
  user?: { is_admin: boolean };
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
    notifyOnError?: boolean,
    returnResponse?: boolean
  ): Promise<{ response?: unknown } | unknown>;
  callWS<T>(message: Record<string, unknown>): Promise<T>;
}

export interface FreezerItem {
  id: string;
  product_id: string | null;
  product_name: string;
  category_id: string | null;
  category_name: string | null;
  month: number;
  year: number;
  weight: number | null;
  original_weight: number | null;
  pieces: number | null;
  original_pieces: number | null;
  unit: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string | null;
  order: number;
  enabled: boolean;
  max_months: number | null;
}

export interface Product {
  id: string;
  name: string;
  category_id: string | null;
  icon: string;
  default_weight: number | null;
  quick_weights: number[];
  quick_pieces: number[];
  ask_for_weight: boolean;
  enabled: boolean;
  order: number;
}

export interface FreezerInfo {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  item_count: number;
}

export interface IntegrationConfig {
  language: string;
  default_unit: string;
  old_months: number;
}

export interface CardConfig {
  type: string;
  freezer_id?: string;
  name?: string;
  icon?: string;
  display_mode?: "popup" | "list" | "stats";
  touch_mode?: boolean;
  show_count?: boolean;
  show_weight?: boolean;
  show_note?: boolean;
  sort?: "oldest_first" | "newest_first";
  /** Default list view: individual packages or a per-product summary. */
  group_by?: "items" | "products";
  old_months?: number;
  language?: "cs" | "en";
  /** Close the popup after this many seconds of inactivity (0/unset = off). */
  auto_close?: number;
  /** Label size: "a4" sheet (default) or "<W>x<H>" in mm, e.g. "50x30". */
  label_format?: string;
  /**
   * "print" (default) — system print dialog; "image" — PNG for label-printer
   * apps; "niimbot" — direct print via the hass-niimbot integration service.
   */
  label_action?: "print" | "image" | "niimbot";
  /** Optional TTF font name passed to niimbot text elements (www/fonts). */
  label_font?: string;
  /** Optional niimbot printer device_id (only needed with multiple printers). */
  label_printer?: string;
  /**
   * QR content: "id" (compact, default), "link" (dashboard URL for any
   * browser) or "app" (homeassistant:// deep link that opens the companion
   * app — no public address needed).
   */
  qr_content?: "id" | "link" | "app";
  /**
   * link: public dashboard URL; app: dashboard path (e.g. /lovelace/mrazak).
   * Default: the current page.
   */
  qr_link_base?: string;
}

export type UpdatePayload =
  | { type: "items"; freezer_id: string; items: FreezerItem[] }
  | { type: "catalog" }
  | { type: "freezers" };

export type ViewName =
  | "list"
  | "picker"
  | "form"
  | "edit"
  | "remove"
  | "amount"
  | "manage"
  | "move"
  | "scan";

export interface StatsCategory {
  category_id: string | null;
  category_name: string | null;
  count: number;
  weight: number;
  pieces: number;
}

export interface StatsMonth {
  month: string; // YYYY-MM
  added_count: number;
  added_weight: number;
  added_pieces: number;
  removed_count: number;
  removed_weight: number;
  removed_pieces: number;
  removed_by_category: Record<string, number>;
}

export interface Stats {
  current: {
    item_count: number;
    total_weight: number;
    total_pieces: number;
    items_without_weight: number;
    avg_age_months: number | null;
    oldest_item: {
      name: string;
      month: number;
      year: number;
      weight: number | null;
    } | null;
    categories: StatsCategory[];
  };
  monthly: StatsMonth[];
}

export interface UndoState {
  kind: "remove" | "weight";
  item: FreezerItem;
  previousWeight?: number;
  previousPieces?: number;
  label: string;
}
