<div align="center">

<img src="assets/icon.svg" alt="Freezer Inventory" width="140"/>

# Freezer Inventory (Mrazák)

**Evidence každého balíčku v mrazáku, ovládaná z tabletu na lednici.**

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/nikopol666/homeassistant-freezer-inventory?style=for-the-badge)](https://github.com/nikopol666/homeassistant-freezer-inventory/releases)
[![Licence](https://img.shields.io/github/license/nikopol666/homeassistant-freezer-inventory?style=for-the-badge)](LICENSE)

[![Otevřít Home Assistant a zobrazit repozitář v HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=nikopol666&repository=homeassistant-freezer-inventory&category=integration)
[![Otevřít Home Assistant a přidat integraci](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=freezer_inventory)

🇬🇧 **[English documentation](README.md)**

</div>

---

Vlastní integrace a Lovelace karta pro Home Assistant určená k evidenci jednotlivých balíčků potravin v mrazáku. Navržená primárně pro dotykové ovládání na tabletu na lednici (funguje skvěle ve Fully Kiosk Browseru).

## Funkce

- 📦 **Každý balíček je samostatná položka** — druh, měsíc/rok zamrazení, volitelná hmotnost **a/nebo počet kusů**, poznámka
- 👆 **Dotykové rozhraní** — velké dlaždice, řádky 56–72 px, tabletový režim, vestavěné popupy (žádný Browser Mod / Bubble Card)
- ➕ **Rychlé přidávání** — dlaždice produktů podle kategorií s emoji ikonami, rychlé volby hmotnosti, více balíčků najednou
- ➖ **Chytré vyjímání** — celé / polovina / konkrétní hmotnost nebo počet kusů, s potvrzením a možností **VRÁTIT ZPĚT**
- 🗂️ **Správa předvoleb v UI** — kategorie (barvy, ikony, doby skladování) i produkty (výchozí a rychlé hmotnosti, pořadí, skrývání)
- ⏰ **Zvýraznění starých položek** — podle doporučené doby skladování kategorie, s globálním prahem jako zálohou
- 🚪 **Automatické zavření** — popup se volitelně zavře po nastavené době nečinnosti (ideální pro kiosek)
- 💾 **Perzistentní úložiště** — data v `.storage/`, přežijí restart a jsou součástí záloh HA
- 🌍 **Čeština a angličtina** — jazyk se volí v integraci, nezávisle na jazyku Home Assistantu
- 🏪 **Instalace přes HACS z jednoho repozitáře** — karta se do Lovelace registruje automaticky

## Instalace

### HACS (doporučeno)

1. Klikněte na **HACS badge výše**, nebo: HACS → ⋮ → *Custom repositories* → přidejte
   `https://github.com/nikopol666/homeassistant-freezer-inventory` (typ **Integration**)
2. Nainstalujte **Freezer Inventory** a restartujte Home Assistant
3. Klikněte na **badge Přidat integraci výše**, nebo: *Nastavení → Zařízení a služby → Přidat integraci → Freezer Inventory*

### Ručně

Zkopírujte `custom_components/freezer_inventory` do `config/custom_components/` a restartujte HA.

## První spuštění

| Volba | Výchozí |
|---|---|
| Jazyk rozhraní | čeština |
| Název mrazáku | Mrazák |
| Vytvořit výchozí produkty | ano |
| Výchozí jednotka | g |

Integrace vytvoří senzor `sensor.mrazak` (stav = počet balíčků, souhrnné atributy) a nabídku ~30 předvolených produktů v 6 kategoriích ve zvoleném jazyce.

## Karta

Přidejte přes vizuální editor (*Freezer Inventory Card*) nebo YAML:

```yaml
type: custom:freezer-inventory-card
freezer_id: main_freezer
display_mode: popup
touch_mode: true
```

Všechny volby:

```yaml
type: custom:freezer-inventory-card
freezer_id: main_freezer
name: Mrazák           # přepíše název
icon: mdi:snowflake    # nebo emoji, např. 🧊
display_mode: popup    # popup = dlaždice s popupem, list = přímý seznam
touch_mode: true       # větší dotykové prvky
show_count: true
show_weight: true
show_note: true
sort: oldest_first     # oldest_first | newest_first
old_months: 6          # přepíše globální práh zvýraznění
language: cs           # cs | en (výchozí dle integrace)
auto_close: 60         # zavřít popup po N sekundách nečinnosti
```

## Hmotnost a kusy

Každá položka může evidovat **hmotnost**, **počet kusů**, obojí, nebo nic:

- *Vyjmout polovinu* půlí vše, co je evidováno (matematické zaokrouhlení, původní hodnoty zůstávají)
- *Zadat množství* umožní vyjmout gramy a/nebo kusy; vyjmutí všeho položku odstraní
- Formulář přidání má navíc pole *počet balíčků*, které vytvoří N samostatných položek najednou

## Služby

`freezer_inventory.add_item` (vrací `item_ids`, podporuje `quantity` i `pieces`), `remove_item`, `remove_half`, `remove_amount` (`amount` v gramech a/nebo `pieces`), `update_item`, `move_item`, `add_product`. Události: `freezer_inventory_item_added` / `_removed` / `_updated`.

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
  note: Na řízky
```

### Příklad automatizace — upozornění na staré maso

```yaml
automation:
  - alias: "Mrazák: staré položky"
    triggers:
      - trigger: time
        at: "09:00:00"
    conditions:
      - condition: template
        value_template: >
          {% set oldest = state_attr('sensor.mrazak', 'oldest_item') %}
          {{ oldest is not none and
             (now().year - oldest.year) * 12 + now().month - oldest.month >= 6 }}
    actions:
      - action: notify.mobile_app_phone
        data:
          title: "🧊 Mrazák"
          message: >
            {% set oldest = state_attr('sensor.mrazak', 'oldest_item') %}
            Nejstarší položka: {{ oldest.name }}
            ({{ '%02d' % oldest.month }}/{{ oldest.year }})
```

## Vývoj

```bash
# testy backendu
pip install -r requirements_test.txt
pytest tests/ -v

# build karty (výstup: custom_components/freezer_inventory/frontend/)
npm install
npm run build
```

## Přispívání

Tohle je komunitní projekt — hlášení chyb, nápady, překlady i pull requesty jsou vítané! Viz [CONTRIBUTING.md](CONTRIBUTING.md) a [Code of Conduct](CODE_OF_CONDUCT.md). Pro dotazy a nápady slouží [GitHub Discussions](https://github.com/nikopol666/homeassistant-freezer-inventory/discussions).

## Licence

[MIT](LICENSE)
