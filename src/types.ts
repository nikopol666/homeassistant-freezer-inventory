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
    data?: Record<string, unknown>
  ): Promise<unknown>;
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
  display_mode?: "popup" | "list";
  touch_mode?: boolean;
  show_count?: boolean;
  show_weight?: boolean;
  show_note?: boolean;
  sort?: "oldest_first" | "newest_first";
  old_months?: number;
  language?: "cs" | "en";
  /** Close the popup after this many seconds of inactivity (0/unset = off). */
  auto_close?: number;
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
  | "manage";

export interface UndoState {
  kind: "remove" | "weight";
  item: FreezerItem;
  previousWeight?: number;
  previousPieces?: number;
  label: string;
}
