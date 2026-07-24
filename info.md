# Freezer Inventory 🧊

Track individual packages of frozen food in Home Assistant — built for a fridge-mounted touch tablet.

Evidence jednotlivých balíčků v mrazáku — navrženo pro dotykový tablet na lednici.

- Every package is a separate item (product · month/year · optional weight)
- Touch-friendly Lovelace card with built-in popups (no Browser Mod / Bubble Card)
- Remove all / half / custom amount, with undo
- Product & category presets managed in the UI
- Old-item highlighting, Czech + English, HACS install

After installing: **Settings → Devices & services → Add integration → Freezer Inventory**, then add the card:

```yaml
type: custom:freezer-inventory-card
freezer_id: main_freezer
display_mode: popup
touch_mode: true
```
