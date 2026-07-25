"""Constants for the Freezer Inventory integration."""

from __future__ import annotations

DOMAIN = "freezer_inventory"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1
STORAGE_MINOR_VERSION = 1

CARD_FILENAME = "freezer-inventory-card.js"
CARD_URL = f"/{DOMAIN}/{CARD_FILENAME}"

SIGNAL_UPDATED = f"{DOMAIN}_updated"

DATA_FRONTEND_REGISTERED = f"{DOMAIN}_frontend_registered"
DATA_SERVICES_REGISTERED = f"{DOMAIN}_services_registered"

# Config / options keys
CONF_LANGUAGE = "language"
CONF_FREEZER_NAME = "freezer_name"
CONF_CREATE_DEFAULTS = "create_defaults"
CONF_DEFAULT_UNIT = "default_unit"
CONF_OLD_MONTHS = "old_months"

DEFAULT_LANGUAGE = "cs"
DEFAULT_UNIT = "g"
DEFAULT_OLD_MONTHS = 6
DEFAULT_FREEZER_ID = "main_freezer"

LANGUAGES = ["cs", "en"]
UNITS = ["g", "kg"]

DEFAULT_FREEZER_NAMES = {"cs": "Mrazák", "en": "Freezer"}

# Events
EVENT_ITEM_ADDED = f"{DOMAIN}_item_added"
EVENT_ITEM_REMOVED = f"{DOMAIN}_item_removed"
EVENT_ITEM_UPDATED = f"{DOMAIN}_item_updated"

# Services
SERVICE_ADD_ITEM = "add_item"
SERVICE_REMOVE_ITEM = "remove_item"
SERVICE_REMOVE_HALF = "remove_half"
SERVICE_REMOVE_AMOUNT = "remove_amount"
SERVICE_UPDATE_ITEM = "update_item"
SERVICE_MOVE_ITEM = "move_item"
SERVICE_ADD_PRODUCT = "add_product"

# Validation limits
MIN_MONTH = 1
MAX_MONTH = 12
YEAR_PAST_RANGE = 20
YEAR_FUTURE_RANGE = 5
MAX_QUANTITY = 50

# Machine-readable error codes (shared by services and websocket)
ERR_FREEZER_NOT_FOUND = "freezer_not_found"
ERR_ITEM_NOT_FOUND = "item_not_found"
ERR_ITEM_EXISTS = "item_exists"
ERR_NO_WEIGHT = "no_weight"
ERR_NOT_ENOUGH_WEIGHT = "not_enough_weight"
ERR_NO_PIECES = "no_pieces"
ERR_NOT_ENOUGH_PIECES = "not_enough_pieces"
ERR_INVALID_PIECES = "invalid_pieces"
ERR_INVALID_MONTH = "invalid_month"
ERR_INVALID_YEAR = "invalid_year"
ERR_INVALID_WEIGHT = "invalid_weight"
ERR_INVALID_AMOUNT = "invalid_amount"
ERR_INVALID_NAME = "invalid_name"
ERR_INVALID_QUANTITY = "invalid_quantity"
ERR_PRODUCT_NOT_FOUND = "product_not_found"
ERR_CATEGORY_NOT_FOUND = "category_not_found"
ERR_DUPLICATE_ID = "duplicate_id"
ERR_MISSING_PRODUCT = "missing_product"
ERR_FREEZER_NOT_EMPTY = "freezer_not_empty"
ERR_LAST_FREEZER = "last_freezer"
ERR_INVALID_IMPORT = "invalid_import"

# Consumption history retention (months)
HISTORY_MONTHS = 24
