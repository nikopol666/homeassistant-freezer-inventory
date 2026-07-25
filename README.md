<div align="center">

<img src="assets/icon.svg" alt="Freezer Inventory" width="140"/>

# Freezer Inventory

**Track every package in your freezer from a fridge-mounted tablet.**

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/nikopol666/homeassistant-freezer-inventory?style=for-the-badge)](https://github.com/nikopol666/homeassistant-freezer-inventory/releases)
[![License](https://img.shields.io/github/license/nikopol666/homeassistant-freezer-inventory?style=for-the-badge)](LICENSE)

[![Open your Home Assistant instance and open this repository inside HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=nikopol666&repository=homeassistant-freezer-inventory&category=integration)
[![Open your Home Assistant instance and start setting up the integration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=freezer_inventory)

🇨🇿 **[Česká dokumentace / Czech documentation](README.cs.md)**

</div>

---

A custom Home Assistant integration + Lovelace card for tracking individual packages of frozen food. Designed for touch control on a fridge-mounted tablet (works great in Fully Kiosk Browser).

## Features

- 📦 **Every package is a separate item** — product, freeze month/year, optional weight **and/or piece count**, note
- 👆 **Touch-first UI** — large tiles, 56–72 px rows, tablet mode, built-in popups (no Browser Mod / Bubble Card)
- ➕ **Fast adding** — category-grouped product tiles with emoji icons, weight quick-picks, multiple packages at once
- ➖ **Smart removal** — remove all / half / a specific weight or number of pieces, with confirmation and **undo**
- 🗂️ **Preset management in the UI** — categories (colors, icons, storage times) and products (default & quick weights, ordering, hiding)
- ⏰ **Old-item highlighting** — per-category recommended storage times with a global fallback
- 🚪 **Auto-close** — optionally close the popup after a period of inactivity (ideal for kiosk tablets)
- 🧊 **Multiple freezers** — managed in the integration options, items can be moved between freezers
- 📊 **Statistics** — `display_mode: stats` card: current composition by category and monthly added/removed chart, plus a total-weight sensor for HA long-term graphs
- 🏷️ **QR labels** — print labels (single or all at once) with a QR code, scan them with the camera to open the item instantly
- 💾 **Export / import** — full data export and merge/replace import in the integration options
- 💾 **Persistent storage** — data lives in `.storage/`, survives restarts, included in HA backups
- 🌍 **Czech & English** — language selected in the integration, independent of the HA language
- 🏪 **One-repo HACS install** — the card resource registers automatically

## Screenshots

**Dashboard tile** — click opens the popup:

<img src="docs/images/tile.png" alt="Dashboard tile" width="400"/>

**Freezer list** with category filters and old-item highlighting (dark mode):

![Freezer list with category filters and old-item highlighting](docs/images/list-dark.png)

**Add form** — two-column tablet mode with weight and piece quick-picks:

![Two-column add form with weight and piece quick-picks](docs/images/form-tablet-dark.png)

**Product picker** grouped by category (light mode):

![Category-grouped product picker](docs/images/picker-light.png)

**Remove dialog** on a phone — whole / half / custom amount:

<img src="docs/images/remove-mobile-dark.png" alt="Remove confirmation with half/amount options" width="400"/>

**Preset management** — categories and products:

![Category and product management](docs/images/manage-light.png)

**Statistics mode** (`display_mode: stats`) — composition by category and monthly consumption:

<img src="docs/images/stats-light.png" alt="Statistics card" width="460"/>

## Requirements

- **Home Assistant 2025.8.0 or newer** (enforced by HACS via `hacs.json`)
- Integration brand icons in the HA UI show up on HA **2026.3+** (older versions simply show no icon)
- QR **scanning** works in any browser (a QR decoder is bundled), but the camera itself requires **HTTPS** access to Home Assistant (e.g. Nabu Casa) and camera permission — in Fully Kiosk enable *Camera Access*, in the companion app grant the camera permission to the app

## Installation

### HACS (recommended)

1. Click the **HACS badge above**, or: HACS → ⋮ → *Custom repositories* → add
   `https://github.com/nikopol666/homeassistant-freezer-inventory` (type **Integration**)
2. Install **Freezer Inventory** and restart Home Assistant
3. Click the **Add Integration badge above**, or: *Settings → Devices & services → Add integration → Freezer Inventory*

### Manual

Copy `custom_components/freezer_inventory` into `config/custom_components/` and restart HA.

## First setup

| Option | Default |
|---|---|
| Interface language | Czech |
| Freezer name | Mrazák / Freezer |
| Create default products | yes |
| Default unit | g |

The integration creates a `sensor.<freezer>` (state = package count, summary attributes) and seeds ~30 preset products in 6 categories in the chosen language.

## Card

Add via the visual editor (*Freezer Inventory Card*) or YAML:

```yaml
type: custom:freezer-inventory-card
freezer_id: main_freezer
display_mode: popup
touch_mode: true
```

All options:

```yaml
type: custom:freezer-inventory-card
freezer_id: main_freezer
name: Freezer          # overrides the title
icon: mdi:snowflake    # or an emoji, e.g. 🧊
display_mode: popup    # popup | list | stats
touch_mode: true       # larger touch targets
show_count: true
show_weight: true
show_note: true
sort: oldest_first     # oldest_first | newest_first
old_months: 6          # highlight threshold override
language: en           # cs | en (defaults to the integration language)
auto_close: 60         # close the popup after N seconds of inactivity
label_format: a4       # a4 | 50x30 | 40x30 | 40x12 | 30x15 | any "WxH" in mm
label_action: print    # print (system dialog) | image (PNG for label-printer apps)
```

### Label printers (Niimbot & co.)

- `label_format: 50x30` (or any `WxH` in mm) prints **one label per page** in exactly that size — for label printers with a print driver (Brother, Dymo…).
- QR **scanning** uses the native BarcodeDetector where available and a bundled decoder everywhere else — it works in Chrome, Firefox, Safari and the companion app alike (HTTPS required for the camera)
- `label_action: image` renders the label as a **PNG image** and opens the share sheet (or downloads the file) — share it straight into the **Niimbot app** (or any label-printer app) and print from there. This mode also works inside the Home Assistant companion app.
- The regular print dialog does not work in the companion app (its WebView has no print support) — the card tells you so instead of failing silently; use a browser or the image mode.

## Weight and pieces

Each item can track a **weight**, a **piece count**, both, or neither:

- *Remove half* halves whatever is tracked (mathematical rounding, original values preserved)
- *Enter amount* lets you remove grams and/or pieces; removing everything deletes the item
- The add form also has a *number of packages* field that creates N separate items at once

## Services

`freezer_inventory.add_item` (returns `item_ids`, supports `quantity` & `pieces`), `remove_item`, `remove_half`, `remove_amount` (`amount` g and/or `pieces`), `update_item`, `move_item`, `add_product`. Events: `freezer_inventory_item_added` / `_removed` / `_updated`.

```yaml
action: freezer_inventory.add_item
data:
  freezer_id: main_freezer
  product_id: chicken_breast
  month: 7
  year: 2026
  weight: 1200
  pieces: 6
  quantity: 2
```

### Automation example — old items notification

```yaml
automation:
  - alias: "Freezer: old items"
    triggers:
      - trigger: time
        at: "09:00:00"
    conditions:
      - condition: template
        value_template: >
          {% set oldest = state_attr('sensor.freezer', 'oldest_item') %}
          {{ oldest is not none and
             (now().year - oldest.year) * 12 + now().month - oldest.month >= 6 }}
    actions:
      - action: notify.mobile_app_phone
        data:
          title: "🧊 Freezer"
          message: >
            {% set oldest = state_attr('sensor.freezer', 'oldest_item') %}
            Oldest item: {{ oldest.name }}
            ({{ '%02d' % oldest.month }}/{{ oldest.year }})
```

## Development

```bash
# backend tests
pip install -r requirements_test.txt
pytest tests/ -v

# card build (output: custom_components/freezer_inventory/frontend/)
npm install
npm run build
```

## Contributing

This is a community project — bug reports, feature ideas, translations and pull requests are all welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md). For questions and ideas, use [GitHub Discussions](https://github.com/nikopol666/homeassistant-freezer-inventory/discussions).

## License

[MIT](LICENSE)
