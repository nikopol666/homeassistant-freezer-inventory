import { cs } from "./translations/cs";
import { en } from "./translations/en";
import type { FreezerItem } from "./types";

const DICTS: Record<string, Record<string, string>> = { cs, en };

export type LocalizeFunc = (
  key: string,
  vars?: Record<string, string | number>
) => string;

export function createLocalize(language: string): LocalizeFunc {
  const dict = DICTS[language] ?? en;
  return (key, vars) => {
    let text = dict[key] ?? en[key] ?? key;
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        text = text.replaceAll(`{${name}}`, String(value));
      }
    }
    return text;
  };
}

/** Czech-style plural selection; English collapses few/many to the same text. */
export function itemCountText(localize: LocalizeFunc, count: number): string {
  let key = "items_many";
  if (count === 1) key = "items_one";
  else if (count >= 2 && count <= 4) key = "items_few";
  return localize(key, { count });
}

export function formatDate(item: Pick<FreezerItem, "month" | "year">): string {
  return `${String(item.month).padStart(2, "0")}/${item.year}`;
}

/** Full label used in confirmations: "Kuřecí prsa · 06/2026 · 500 g · 6 ks". */
export function itemLabel(item: FreezerItem, localize?: LocalizeFunc): string {
  const parts = [item.product_name, formatDate(item)];
  if (item.weight != null) {
    parts.push(`${item.weight} ${item.unit || "g"}`);
  }
  if (item.pieces != null) {
    parts.push(`${item.pieces} ${localize ? localize("pieces_short") : "ks"}`);
  }
  return parts.join(" · ");
}

/** Whole months elapsed since the freeze month. */
export function ageInMonths(
  item: Pick<FreezerItem, "month" | "year">,
  now: Date = new Date()
): number {
  return (
    (now.getFullYear() - item.year) * 12 + (now.getMonth() + 1 - item.month)
  );
}
