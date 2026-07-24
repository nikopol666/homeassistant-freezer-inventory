"""Default category and product catalogs (Czech and English).

Product and category ids are language-neutral slugs shared by both catalogs,
so switching the integration language later keeps existing items consistent.
"""

from __future__ import annotations

from typing import Any

# Icons are emoji (rendered directly by the card); "mdi:" icons also work.
# Every product inherits its category icon so a category looks uniform.
# (id, icon, color, max_months)
_CATEGORIES: list[tuple[str, str, str, int | None]] = [
    ("chicken", "🐔", "#f59e0b", 10),
    ("pork", "🐷", "#f06292", 6),
    ("beef", "🐮", "#c62828", 10),
    ("turkey", "🦃", "#8e24aa", 10),
    ("fish", "🐟", "#0288d1", 3),
    ("other", "🍱", "#607d8b", 6),
]

_CATEGORY_ICONS = {cat_id: icon for cat_id, icon, _color, _months in _CATEGORIES}

_CATEGORY_NAMES = {
    "cs": {
        "chicken": "Kuřecí",
        "pork": "Vepřové",
        "beef": "Hovězí",
        "turkey": "Krůtí",
        "fish": "Ryby",
        "other": "Ostatní",
    },
    "en": {
        "chicken": "Chicken",
        "pork": "Pork",
        "beef": "Beef",
        "turkey": "Turkey",
        "fish": "Fish",
        "other": "Other",
    },
}

_STANDARD_QUICK = [250, 500, 750, 1000]

_STANDARD_PIECES = [1, 2, 3, 4, 6]

# (id, category_id, default_weight, quick_weights, quick_pieces)
# The icon always comes from the category (uniform look per category).
_PRODUCTS: list[tuple[str, str, int | None, list[int], list[int]]] = [
    ("chicken_breast", "chicken", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("chicken_thighs", "chicken", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("chicken_wings", "chicken", 500, _STANDARD_QUICK, [4, 6, 8, 10]),
    ("chicken_quarters", "chicken", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("chicken_liver", "chicken", 500, [250, 500], []),
    ("whole_chicken", "chicken", 1500, [1000, 1500, 2000], [1, 2]),
    ("pork_leg", "pork", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("pork_neck", "pork", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("pork_tenderloin", "pork", 500, [250, 500, 750], [1, 2]),
    ("pork_shoulder", "pork", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("pork_chop", "pork", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("pork_belly", "pork", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("pork_ground", "pork", 500, _STANDARD_QUICK, []),
    ("beef_ground", "beef", 500, _STANDARD_QUICK, []),
    ("beef_goulash", "beef", 500, _STANDARD_QUICK, []),
    ("beef_steak", "beef", 300, [200, 300, 400, 500], _STANDARD_PIECES),
    ("beef_sirloin", "beef", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("beef_shank", "beef", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("turkey_breast", "turkey", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("turkey_thighs", "turkey", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("turkey_ground", "turkey", 500, _STANDARD_QUICK, []),
    ("salmon", "fish", 250, [125, 250, 500], _STANDARD_PIECES),
    ("cod", "fish", 250, [125, 250, 500], _STANDARD_PIECES),
    ("tuna", "fish", 250, [125, 250, 500], _STANDARD_PIECES),
    ("fish_fillet", "fish", 250, [125, 250, 500], _STANDARD_PIECES),
    ("duck", "other", 2000, [1500, 2000, 2500], [1, 2]),
    ("rabbit", "other", 1200, [1000, 1500], [1, 2]),
    ("game", "other", 500, _STANDARD_QUICK, _STANDARD_PIECES),
    ("sausage", "other", 300, [200, 300, 500], [2, 4, 6, 8]),
    ("bacon", "other", 200, [100, 200, 300], []),
    ("ready_meal", "other", None, [], [1, 2, 3, 4]),
]

_PRODUCT_NAMES = {
    "cs": {
        "chicken_breast": "Kuřecí prsa",
        "chicken_thighs": "Kuřecí stehna",
        "chicken_wings": "Kuřecí křídla",
        "chicken_quarters": "Kuřecí čtvrtky",
        "chicken_liver": "Kuřecí játra",
        "whole_chicken": "Celé kuře",
        "pork_leg": "Vepřová kýta",
        "pork_neck": "Krkovice",
        "pork_tenderloin": "Panenka",
        "pork_shoulder": "Plec",
        "pork_chop": "Kotleta",
        "pork_belly": "Bůček",
        "pork_ground": "Vepřové mleté",
        "beef_ground": "Hovězí mleté",
        "beef_goulash": "Hovězí na guláš",
        "beef_steak": "Hovězí steak",
        "beef_sirloin": "Hovězí roštěná",
        "beef_shank": "Hovězí kližka",
        "turkey_breast": "Krůtí prsa",
        "turkey_thighs": "Krůtí stehna",
        "turkey_ground": "Krůtí mleté",
        "salmon": "Losos",
        "cod": "Treska",
        "tuna": "Tuňák",
        "fish_fillet": "Rybí filé",
        "duck": "Kachna",
        "rabbit": "Králík",
        "game": "Zvěřina",
        "sausage": "Klobása",
        "bacon": "Slanina",
        "ready_meal": "Hotové jídlo",
    },
    "en": {
        "chicken_breast": "Chicken breast",
        "chicken_thighs": "Chicken thighs",
        "chicken_wings": "Chicken wings",
        "chicken_quarters": "Chicken quarters",
        "chicken_liver": "Chicken liver",
        "whole_chicken": "Whole chicken",
        "pork_leg": "Pork leg",
        "pork_neck": "Pork neck",
        "pork_tenderloin": "Pork tenderloin",
        "pork_shoulder": "Pork shoulder",
        "pork_chop": "Pork chop",
        "pork_belly": "Pork belly",
        "pork_ground": "Ground pork",
        "beef_ground": "Ground beef",
        "beef_goulash": "Beef for goulash",
        "beef_steak": "Beef steak",
        "beef_sirloin": "Beef sirloin",
        "beef_shank": "Beef shank",
        "turkey_breast": "Turkey breast",
        "turkey_thighs": "Turkey thighs",
        "turkey_ground": "Ground turkey",
        "salmon": "Salmon",
        "cod": "Cod",
        "tuna": "Tuna",
        "fish_fillet": "Fish fillet",
        "duck": "Duck",
        "rabbit": "Rabbit",
        "game": "Game meat",
        "sausage": "Sausage",
        "bacon": "Bacon",
        "ready_meal": "Ready meal",
    },
}


def default_categories(language: str) -> list[dict[str, Any]]:
    """Return the default categories for a language as plain dicts."""
    names = _CATEGORY_NAMES.get(language, _CATEGORY_NAMES["en"])
    return [
        {
            "id": cat_id,
            "name": names[cat_id],
            "icon": icon,
            "color": color,
            "order": order,
            "enabled": True,
            "max_months": max_months,
        }
        for order, (cat_id, icon, color, max_months) in enumerate(
            _CATEGORIES, start=1
        )
    ]


def default_products(language: str) -> list[dict[str, Any]]:
    """Return the default products for a language as plain dicts."""
    names = _PRODUCT_NAMES.get(language, _PRODUCT_NAMES["en"])
    return [
        {
            "id": product_id,
            "name": names[product_id],
            "category_id": category_id,
            "icon": _CATEGORY_ICONS[category_id],
            "default_weight": default_weight,
            "quick_weights": list(quick_weights),
            "quick_pieces": list(quick_pieces),
            "ask_for_weight": True,
            "enabled": True,
            "order": order,
        }
        for order, (
            product_id,
            category_id,
            default_weight,
            quick_weights,
            quick_pieces,
        ) in enumerate(_PRODUCTS, start=1)
    ]
