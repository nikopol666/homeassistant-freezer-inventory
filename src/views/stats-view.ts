import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { Category, Stats } from "../types";
import type { LocalizeFunc } from "../localize";
import { avatarStyle, iconTemplate } from "../ha-helpers";
import { sharedStyles } from "../styles";

function formatWeight(grams: number, language: string): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    const text = (Math.round(kg * 10) / 10).toLocaleString(
      language === "cs" ? "cs-CZ" : "en-US"
    );
    return `${text} kg`;
  }
  return `${grams} g`;
}

/** Current composition + monthly consumption. */
export class FiStatsView extends LitElement {
  @property({ attribute: false }) stats: Stats | null = null;
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) localize!: LocalizeFunc;
  @property({ attribute: false }) language = "en";
  @property({ attribute: false }) monthsShown = 6;

  private _category(id: string | null): Category | undefined {
    return id ? this.categories.find((c) => c.id === id) : undefined;
  }

  render() {
    const l = this.localize;
    if (!this.stats) return nothing;
    const { current, monthly } = this.stats;

    const maxCategoryWeight = Math.max(
      1,
      ...current.categories.map((c) => c.weight)
    );
    const months = monthly.slice(-this.monthsShown);
    const maxMonthly = Math.max(
      1,
      ...months.flatMap((m) => [m.added_weight, m.removed_weight])
    );

    return html`
      <div class="tiles-row">
        <div class="stat-tile">
          <span class="stat-value">${current.item_count}</span>
          <span class="stat-label">${l("stats_items")}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value"
            >${formatWeight(current.total_weight, this.language)}</span
          >
          <span class="stat-label">${l("stats_weight")}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value">
            ${current.avg_age_months != null
              ? l("months_old", { months: current.avg_age_months })
              : "–"}
          </span>
          <span class="stat-label">${l("stats_avg_age")}</span>
        </div>
      </div>

      ${current.oldest_item
        ? html`
            <p class="oldest">
              ${l("stats_oldest")}:
              <strong>
                ${current.oldest_item.name} ·
                ${String(current.oldest_item.month).padStart(2, "0")}/${current
                  .oldest_item.year}
              </strong>
            </p>
          `
        : nothing}

      ${current.categories.length
        ? html`
            <h3 class="section-title">${l("stats_by_category")}</h3>
            <div class="category-bars">
              ${current.categories.map((entry) => {
                const category = this._category(entry.category_id);
                const color = category?.color ?? "var(--fi-accent)";
                const percent = Math.max(
                  4,
                  Math.round((entry.weight / maxCategoryWeight) * 100)
                );
                return html`
                  <div class="category-row">
                    <span class="avatar small" style=${avatarStyle(category?.color)}>
                      ${iconTemplate(category?.icon, "mdi:snowflake")}
                    </span>
                    <div class="category-main">
                      <div class="category-head">
                        <span class="category-name"
                          >${category?.name ??
                          entry.category_name ??
                          l("uncategorized")}</span
                        >
                        <span class="category-value">
                          ${entry.weight
                            ? formatWeight(entry.weight, this.language)
                            : ""}
                          · ${entry.count}
                        </span>
                      </div>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          style="width:${percent}%;background:${color}"
                        ></div>
                      </div>
                    </div>
                  </div>
                `;
              })}
            </div>
          `
        : nothing}

      ${months.length
        ? html`
            <h3 class="section-title">${l("stats_monthly")}</h3>
            <div class="chart" role="img" aria-label=${l("stats_monthly")}>
              ${months.map(
                (month) => html`
                  <div class="month">
                    <div class="bars">
                      <div
                        class="bar added"
                        title="${l("stats_added")}: ${formatWeight(
                          month.added_weight,
                          this.language
                        )}"
                        style="height:${Math.round(
                          (month.added_weight / maxMonthly) * 100
                        )}%"
                      ></div>
                      <div
                        class="bar removed"
                        title="${l("stats_removed")}: ${formatWeight(
                          month.removed_weight,
                          this.language
                        )}"
                        style="height:${Math.round(
                          (month.removed_weight / maxMonthly) * 100
                        )}%"
                      ></div>
                    </div>
                    <span class="month-label"
                      >${month.month.slice(5)}/${month.month.slice(2, 4)}</span
                    >
                  </div>
                `
              )}
            </div>
            <div class="legend">
              <span><i class="dot added"></i>${l("stats_added")}</span>
              <span><i class="dot removed"></i>${l("stats_removed")}</span>
            </div>
          `
        : nothing}
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .tiles-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 14px;
      }

      .stat-tile {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
        border: 1px solid var(--fi-divider);
        border-radius: var(--fi-radius);
        padding: 12px 8px;
        text-align: center;
      }

      .stat-value {
        font-size: 20px;
        font-weight: 700;
      }

      .stat-label {
        font-size: 12px;
        color: var(--fi-secondary);
      }

      .oldest {
        font-size: 14px;
        color: var(--fi-secondary);
        margin: 0 0 14px;
      }

      .oldest strong {
        color: var(--fi-text);
      }

      .section-title {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--fi-secondary);
        margin: 16px 0 10px;
      }

      .category-row {
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 52px;
      }

      .avatar.small {
        width: 38px;
        height: 38px;
      }

      .avatar.small ha-icon {
        --mdc-icon-size: 22px;
      }

      .avatar.small .emoji-icon {
        font-size: 20px;
      }

      .category-main {
        flex: 1;
        min-width: 0;
      }

      .category-head {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 14px;
        margin-bottom: 4px;
      }

      .category-name {
        font-weight: 600;
      }

      .category-value {
        color: var(--fi-secondary);
        white-space: nowrap;
      }

      .bar-track {
        height: 8px;
        border-radius: 4px;
        background: var(--fi-chip-bg);
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        border-radius: 4px;
      }

      .chart {
        display: flex;
        align-items: stretch;
        gap: 8px;
        height: 120px;
      }

      .month {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .bars {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 4px;
      }

      .bar {
        width: 14px;
        min-height: 2px;
        border-radius: 4px 4px 0 0;
      }

      .bar.added {
        background: var(--fi-success);
      }

      .bar.removed {
        background: var(--fi-warn);
      }

      .month-label {
        text-align: center;
        font-size: 11px;
        color: var(--fi-secondary);
        margin-top: 6px;
      }

      .legend {
        display: flex;
        gap: 18px;
        justify-content: center;
        margin-top: 10px;
        font-size: 12px;
        color: var(--fi-secondary);
      }

      .legend span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
      }

      .dot.added {
        background: var(--fi-success);
      }

      .dot.removed {
        background: var(--fi-warn);
      }
    `,
  ];
}

customElements.define("fi-stats-view", FiStatsView);
