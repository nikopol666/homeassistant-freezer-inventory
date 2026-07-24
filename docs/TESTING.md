# Manuální testovací checklist frontend karty

Dle specifikace §28. Projít na reálné instanci Home Assistantu (ideálně tablet + mobil + desktop).

## Základní flow

- [ ] Dlaždice karty zobrazuje název, ikonu a počet položek
- [ ] Kliknutí na dlaždici otevře popup se seznamem
- [ ] Položky se načtou (řazené od nejstarší: rok, měsíc, název)
- [ ] Prázdný mrazák: text „Mrazák je prázdný." + tlačítko „+ PŘIDAT PRVNÍ POLOŽKU" (žádná prázdná tabulka)
- [ ] Popup lze zavřít křížkem i klávesou Escape

## Přidání

- [ ] „+ PŘIDAT" otevře výběr produktu seskupený podle kategorií
- [ ] Dlaždice „Jiné…" umožní zadat vlastní název
- [ ] Formulář: měsíc a rok předvolené na aktuální
- [ ] Rychlé volby hmotnosti fungují (chip vyplní pole)
- [ ] Přidání s hmotností → položka v seznamu s „MM/RRRR · X g"
- [ ] Přidání bez hmotnosti → „hmotnost neuvedena"
- [ ] Počet balíčků > 1 → vytvoří se N samostatných položek
- [ ] Po přidání toast „Přidáno do mrazáku: …" a návrat na seznam
- [ ] Validace: prázdný název, záporná hmotnost → chyba, formulář zůstane otevřený

## Vyjmutí

- [ ] Klik na položku → dialog se všemi údaji („Vyjmout Kuřecí prsa · 06/2026 · 500 g?")
- [ ] Poznámka se zobrazí v potvrzení, pokud existuje
- [ ] VYJMOUT CELÉ → položka zmizí, toast s „VRÁTIT ZPĚT"
- [ ] VRÁTIT ZPĚT obnoví položku (stejné ID i datum vytvoření)
- [ ] VYJMOUT POLOVINU – 250 g → hmotnost 500 → 250, původní hmotnost beze změny
- [ ] ZADAT MNOŽSTVÍ → živý náhled „Po vyjmutí zůstane: X g"
- [ ] Množství = celá hmotnost → položka se odstraní
- [ ] Množství > hmotnost → chyba, formulář zůstane otevřený
- [ ] Položka bez hmotnosti: jen VYJMOUT CELÉ / UPRAVIT / ZRUŠIT

## Kusy

- [ ] Přidání s kusy (bez hmotnosti) → v seznamu „MM/RRRR · N ks"
- [ ] Přidání s hmotností i kusy → „MM/RRRR · X g · N ks"
- [ ] Vyjmout polovinu půlí hmotnost i kusy
- [ ] Zadat množství: pole pro gramy i kusy (jen evidované), živý náhled zbytku
- [ ] Vyjmutí všech kusů (nebo celé hmotnosti) položku odstraní
- [ ] Undo vrátí hmotnost i kusy

## Auto-close

- [ ] `auto_close: 15` → popup se po 15 s bez dotyku sám zavře
- [ ] Dotyk/psaní ve formuláři odpočet restartuje
- [ ] Bez `auto_close` se popup sám nezavírá

## Úprava

- [ ] UPRAVIT otevře formulář s předvyplněnými hodnotami
- [ ] Lze změnit název, měsíc, rok, hmotnost, původní hmotnost, poznámku
- [ ] Hmotnost 0 → dotaz na odstranění položky

## Filtr a zvýraznění

- [ ] Chipy kategorií filtrují seznam; „Vše" ho vrátí
- [ ] Staré položky mají barevný proužek + badge stáří (oranžová/červená)
- [ ] Zvýraznění respektuje doporučenou dobu kategorie (ryby dříve než hovězí)

## Správa produktů (jen admin)

- [ ] Ozubené kolečko otevře správu; ne-admin ho nevidí
- [ ] Přidání/úprava/skrytí/smazání kategorie i produktu
- [ ] Změna pořadí šipkami se projeví ve výběru produktu
- [ ] „Obnovit výchozí produkty" obnoví katalog, položky v mrazáku zůstanou

## Aktualizace a prostředí

- [ ] Změna z druhého zařízení (nebo Vývojářské nástroje → služba) se projeví bez reloadu stránky
- [ ] Dark mode: všechny texty čitelné, žádné natvrdo světlé barvy
- [ ] Light mode totéž
- [ ] Tablet na šířku (1024×768 / Fully Kiosk): řádky ≥ 64 px, pohodlné ovládání prstem
- [ ] Mobil: popup přes celou šířku, nic nepřetéká
- [ ] Desktop: ovládání klávesnicí (Tab, Enter, Escape)
- [ ] Jazyk en v konfiguraci karty → anglické texty
- [ ] Druhá karta v režimu `display_mode: list` zobrazuje seznam přímo

## Akceptační scénář (specifikace §35)

- [ ] Kompletní průchod: instalace → integrace → karta → přidání Kuřecí prsa 500 g → vyjmutí poloviny → vyjmutí celé → restart HA → data zachována
