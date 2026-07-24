# Contributing

Thanks for your interest in improving Freezer Inventory! Contributions are welcome — bug reports, feature ideas, translations and pull requests.

## Development setup

```bash
git clone https://github.com/nikopol666/homeassistant-freezer-inventory
cd homeassistant-freezer-inventory

# Backend (Python 3.13)
python -m venv .venv && source .venv/bin/activate
pip install -r requirements_test.txt
pytest tests/ -v

# Frontend card (Node 22)
npm install
npm run build   # output goes to custom_components/freezer_inventory/frontend/
```

## Pull requests

- Keep the built `custom_components/freezer_inventory/frontend/freezer-inventory-card.js` in sync with `src/` (`npm run build` and commit the result) — CI verifies this.
- Backend changes need passing tests (`pytest tests/`); please add tests for new behavior.
- User-facing texts must be added to **both** languages: `src/translations/{cs,en}.ts` for the card, `custom_components/freezer_inventory/translations/{cs,en}.json` + `strings.json` for the integration.
- The card must keep working without Browser Mod, Bubble Card or any other custom dependency, in light & dark themes, and with touch-first sizing.

## Reporting bugs

Please include your Home Assistant version, the integration version, browser/device (especially if it is a kiosk tablet) and steps to reproduce. Screenshots help a lot.
