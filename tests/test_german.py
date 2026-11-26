"""Tests for the German (de) and Austrian German (de_at) language support."""

import json
from pathlib import Path

import pytest

from custom_components.freezer_inventory import default_catalog
from custom_components.freezer_inventory.const import DEFAULT_FREEZER_NAMES, LANGUAGES

COMPONENT = Path(__file__).parent.parent / "custom_components" / "freezer_inventory"


def _keys(data: dict, prefix: str = "") -> set[str]:
    keys: set[str] = set()
    for key, value in data.items():
        keys.add(prefix + key)
        if isinstance(value, dict):
            keys |= _keys(value, f"{prefix}{key}.")
    return keys


def test_german_is_available() -> None:
    assert "de" in LANGUAGES
    assert "de_at" in LANGUAGES
    assert DEFAULT_FREEZER_NAMES["de"] == "Gefrierschrank"
    assert DEFAULT_FREEZER_NAMES["de_at"] == "Tiefkühler"


@pytest.mark.parametrize(
    ("language", "breast", "chicken"),
    [("de", "Hähnchenbrust", "Hähnchen"), ("de_at", "Hendlbrust", "Hendl")],
)
def test_german_catalog_is_complete(language: str, breast: str, chicken: str) -> None:
    en_products = {p["id"] for p in default_catalog.default_products("en")}
    products = {
        p["id"]: p["name"] for p in default_catalog.default_products(language)
    }
    assert set(products) == en_products
    assert products["chicken_breast"] == breast
    categories = {
        c["id"]: c["name"] for c in default_catalog.default_categories(language)
    }
    assert categories["chicken"] == chicken


def test_german_translation_matches_english_keys() -> None:
    en = json.loads((COMPONENT / "translations" / "en.json").read_text("utf-8"))
    de = json.loads((COMPONENT / "translations" / "de.json").read_text("utf-8"))
    assert _keys(de) == _keys(en)


def test_language_selector_lists_all_languages() -> None:
    for name in ("strings.json", "translations/en.json", "translations/de.json"):
        data = json.loads((COMPONENT / name).read_text("utf-8"))
        assert set(data["selector"]["language"]["options"]) == set(LANGUAGES)
