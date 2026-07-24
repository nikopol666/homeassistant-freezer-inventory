import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { Category, Product } from "../types";
import type { LocalizeFunc } from "../localize";
import { avatarStyle, fireEvent, iconTemplate } from "../ha-helpers";
import { sharedStyles } from "../styles";

export class FiProductPicker extends LitElement {
  @property({ attribute: false }) products: Product[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) localize!: LocalizeFunc;

  private get _groups(): { category: Category | null; products: Product[] }[] {
    const enabledProducts = this.products.filter((p) => p.enabled);
    const groups: { category: Category | null; products: Product[] }[] = [];
    for (const category of this.categories.filter((c) => c.enabled)) {
      const inCategory = enabledProducts.filter(
        (p) => p.category_id === category.id
      );
      if (inCategory.length) groups.push({ category, products: inCategory });
    }
    const knownCategories = new Set(this.categories.map((c) => c.id));
    const uncategorized = enabledProducts.filter(
      (p) => !p.category_id || !knownCategories.has(p.category_id)
    );
    if (uncategorized.length) groups.push({ category: null, products: uncategorized });
    return groups;
  }

  render() {
    return html`
      <h2 class="view-title">${this.localize("what_to_add")}</h2>
      ${this._groups.map(
        (group) => html`
          <div class="group">
            ${group.category
              ? html`<h3 class="group-title">${group.category.name}</h3>`
              : html`<h3 class="group-title">${this.localize("uncategorized")}</h3>`}
            <div class="tiles">
              ${group.products.map(
                (product) => html`
                  <button
                    class="tile"
                    @click=${() => fireEvent(this, "fi-pick-product", { product })}
                  >
                    <span class="avatar" style=${avatarStyle(group.category?.color)}>
                      ${iconTemplate(
                        product.icon || group.category?.icon,
                        "mdi:food"
                      )}
                    </span>
                    <span class="tile-name">${product.name}</span>
                  </button>
                `
              )}
            </div>
          </div>
        `
      )}
      <div class="group">
        <div class="tiles">
          <button
            class="tile other"
            @click=${() => fireEvent(this, "fi-pick-other")}
          >
            <span class="avatar"><ha-icon icon="mdi:pencil-plus"></ha-icon></span>
            <span class="tile-name">${this.localize("other_product")}</span>
          </button>
        </div>
      </div>
      ${nothing}
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .group {
        margin-bottom: 18px;
      }

      .group-title {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--fi-secondary);
        margin: 0 0 10px;
      }

      .tiles {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 64px;
        padding: 10px 14px;
        border: 1px solid var(--fi-divider);
        border-radius: var(--fi-radius);
        text-align: left;
        transition: background 0.15s ease;
      }

      .tile:hover {
        background: color-mix(in srgb, var(--fi-accent) 7%, transparent);
        border-color: color-mix(in srgb, var(--fi-accent) 40%, transparent);
      }

      .tile-name {
        font-size: 15px;
        font-weight: 600;
        line-height: 1.25;
      }

      :host([touch]) .tile {
        min-height: 72px;
      }

      :host([touch]) .tile-name {
        font-size: 17px;
      }

      .tile.other {
        border-style: dashed;
      }

      @media (max-width: 420px) {
        .tiles {
          grid-template-columns: 1fr;
        }
      }

      @media (min-width: 700px) {
        :host([touch]) .tiles {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `,
  ];
}

customElements.define("fi-product-picker", FiProductPicker);
