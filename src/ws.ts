import type {
  Category,
  FreezerInfo,
  FreezerItem,
  HomeAssistant,
  IntegrationConfig,
  Product,
  Stats,
  UpdatePayload,
} from "./types";

const DOMAIN = "freezer_inventory";

export async function fetchConfig(
  hass: HomeAssistant
): Promise<IntegrationConfig> {
  return hass.callWS<IntegrationConfig>({ type: `${DOMAIN}/get_config` });
}

export async function fetchItems(
  hass: HomeAssistant,
  freezerId: string
): Promise<FreezerItem[]> {
  const result = await hass.callWS<{ items: FreezerItem[] }>({
    type: `${DOMAIN}/get_items`,
    freezer_id: freezerId,
  });
  return result.items;
}

export async function fetchProducts(hass: HomeAssistant): Promise<Product[]> {
  const result = await hass.callWS<{ products: Product[] }>({
    type: `${DOMAIN}/get_products`,
  });
  return result.products;
}

export async function fetchCategories(
  hass: HomeAssistant
): Promise<Category[]> {
  const result = await hass.callWS<{ categories: Category[] }>({
    type: `${DOMAIN}/get_categories`,
  });
  return result.categories;
}

export async function fetchFreezers(
  hass: HomeAssistant
): Promise<FreezerInfo[]> {
  const result = await hass.callWS<{ freezers: FreezerInfo[] }>({
    type: `${DOMAIN}/get_freezers`,
  });
  return result.freezers;
}

export async function fetchStats(
  hass: HomeAssistant,
  freezerId?: string
): Promise<Stats> {
  return hass.callWS<Stats>({
    type: `${DOMAIN}/get_stats`,
    ...(freezerId ? { freezer_id: freezerId } : {}),
  });
}

export async function moveItem(
  hass: HomeAssistant,
  itemId: string,
  sourceFreezerId: string,
  targetFreezerId: string
): Promise<void> {
  await hass.callService(DOMAIN, "move_item", {
    item_id: itemId,
    source_freezer_id: sourceFreezerId,
    target_freezer_id: targetFreezerId,
  });
}

export function subscribeUpdates(
  hass: HomeAssistant,
  callback: (payload: UpdatePayload) => void
): Promise<() => Promise<void>> {
  return hass.connection.subscribeMessage<UpdatePayload>(callback, {
    type: `${DOMAIN}/subscribe_updates`,
  });
}

// ---------------------------------------------------------------------
// Writes: item mutations go through HA services (spec preference),
// catalog management and undo go through websocket commands.

export async function addItem(
  hass: HomeAssistant,
  data: {
    freezer_id: string;
    product_id?: string;
    product_name?: string;
    month: number;
    year: number;
    weight?: number;
    pieces?: number;
    note?: string;
    quantity?: number;
  }
): Promise<void> {
  await hass.callService(DOMAIN, "add_item", data);
}

export async function removeItem(
  hass: HomeAssistant,
  freezerId: string,
  itemId: string
): Promise<void> {
  await hass.callService(DOMAIN, "remove_item", {
    freezer_id: freezerId,
    item_id: itemId,
  });
}

export async function removeHalf(
  hass: HomeAssistant,
  freezerId: string,
  itemId: string
): Promise<void> {
  await hass.callService(DOMAIN, "remove_half", {
    freezer_id: freezerId,
    item_id: itemId,
  });
}

export async function removeAmount(
  hass: HomeAssistant,
  freezerId: string,
  itemId: string,
  data: { amount?: number; pieces?: number }
): Promise<void> {
  await hass.callService(DOMAIN, "remove_amount", {
    freezer_id: freezerId,
    item_id: itemId,
    ...data,
  });
}

export async function updateItem(
  hass: HomeAssistant,
  freezerId: string,
  itemId: string,
  changes: Record<string, unknown>
): Promise<void> {
  await hass.callService(DOMAIN, "update_item", {
    freezer_id: freezerId,
    item_id: itemId,
    ...changes,
  });
}

export async function restoreItem(
  hass: HomeAssistant,
  freezerId: string,
  item: FreezerItem
): Promise<void> {
  await hass.callWS({
    type: `${DOMAIN}/restore_item`,
    freezer_id: freezerId,
    item,
  });
}

// ---------------------------------------------------------------------
// Catalog management

export async function createCategory(
  hass: HomeAssistant,
  data: { name: string; icon?: string; max_months?: number | null }
): Promise<Category> {
  const result = await hass.callWS<{ category: Category }>({
    type: `${DOMAIN}/category/create`,
    ...data,
  });
  return result.category;
}

export async function updateCategory(
  hass: HomeAssistant,
  categoryId: string,
  changes: Record<string, unknown>
): Promise<Category> {
  const result = await hass.callWS<{ category: Category }>({
    type: `${DOMAIN}/category/update`,
    category_id: categoryId,
    ...changes,
  });
  return result.category;
}

export async function deleteCategory(
  hass: HomeAssistant,
  categoryId: string
): Promise<void> {
  await hass.callWS({ type: `${DOMAIN}/category/delete`, category_id: categoryId });
}

export async function reorderCategories(
  hass: HomeAssistant,
  categoryIds: string[]
): Promise<void> {
  await hass.callWS({
    type: `${DOMAIN}/categories/reorder`,
    category_ids: categoryIds,
  });
}

export async function createProduct(
  hass: HomeAssistant,
  data: Record<string, unknown>
): Promise<Product> {
  const result = await hass.callWS<{ product: Product }>({
    type: `${DOMAIN}/product/create`,
    ...data,
  });
  return result.product;
}

export async function updateProduct(
  hass: HomeAssistant,
  productId: string,
  changes: Record<string, unknown>
): Promise<Product> {
  const result = await hass.callWS<{ product: Product }>({
    type: `${DOMAIN}/product/update`,
    product_id: productId,
    ...changes,
  });
  return result.product;
}

export async function deleteProduct(
  hass: HomeAssistant,
  productId: string
): Promise<void> {
  await hass.callWS({ type: `${DOMAIN}/product/delete`, product_id: productId });
}

export async function reorderProducts(
  hass: HomeAssistant,
  productIds: string[]
): Promise<void> {
  await hass.callWS({
    type: `${DOMAIN}/products/reorder`,
    product_ids: productIds,
  });
}

export async function restoreDefaults(hass: HomeAssistant): Promise<void> {
  await hass.callWS({ type: `${DOMAIN}/restore_defaults` });
}

export function errorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return fallback;
}
