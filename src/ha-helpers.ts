/** Small helpers for interacting with the Home Assistant frontend. */

import { html, type TemplateResult } from "lit";

/** Render an icon value: emoji directly, "mdi:*" via ha-icon. */
export function iconTemplate(
  icon: string | null | undefined,
  fallback = "mdi:food"
): TemplateResult {
  const value = icon || fallback;
  return value.startsWith("mdi:")
    ? html`<ha-icon icon=${value}></ha-icon>`
    : html`<span class="emoji-icon" aria-hidden="true">${value}</span>`;
}

/** Inline style that tints an avatar with a category color. */
export function avatarStyle(color: string | null | undefined): string {
  return color ? `--fi-avatar-color:${color}` : "";
}

export function fireEvent(
  node: HTMLElement,
  type: string,
  detail?: unknown
): void {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
}

let componentsLoaded = false;

/**
 * ha-dialog / ha-form / ha-icon are lazily registered by the HA frontend.
 * Loading the config element of a built-in card pulls those bundles in
 * (the trick used by Mushroom and other card collections).
 */
export async function loadHaComponents(): Promise<void> {
  if (componentsLoaded) return;
  componentsLoaded = true;
  if (
    customElements.get("ha-dialog") &&
    customElements.get("ha-form") &&
    customElements.get("ha-icon")
  ) {
    return;
  }
  const helpers = (
    window as unknown as {
      loadCardHelpers?: () => Promise<{
        createCardElement: (config: unknown) => unknown;
      }>;
    }
  ).loadCardHelpers;
  try {
    if (helpers) {
      await helpers();
    }
    const buttonCard = customElements.get("hui-button-card") as
      | { getConfigElement?: () => unknown }
      | undefined;
    buttonCard?.getConfigElement?.();
    const entitiesCard = customElements.get("hui-entities-card") as
      | { getConfigElement?: () => unknown }
      | undefined;
    entitiesCard?.getConfigElement?.();
    await Promise.race([
      customElements.whenDefined("ha-dialog"),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
  } catch {
    // The card falls back to its own overlay dialog.
  }
}

export function haDialogAvailable(): boolean {
  return customElements.get("ha-dialog") !== undefined;
}
