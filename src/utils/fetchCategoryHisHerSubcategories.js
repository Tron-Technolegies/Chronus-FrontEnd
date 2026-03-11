import { getProductsByCategory } from "../api/product";
import { extractHisHerSubcategories } from "./shopSubcategories";

const getProductsList = (payload) => {
  const raw = payload?.products ?? payload?.results ?? [];
  return Array.isArray(raw) ? raw : [];
};

export async function fetchCategoryHisHerSubcategories(
  categoryId,
  { pageSize = 12, maxPages = 50 } = {},
) {
  if (!categoryId) return [];

  const map = new Map();
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= maxPages && map.size < 2) {
    const res = await getProductsByCategory(categoryId, { page, limit: pageSize });
    const payload = res?.data ?? {};
    const subcategories = extractHisHerSubcategories(getProductsList(payload));

    subcategories.forEach((subcategory) => {
      if (!map.has(subcategory.slug)) {
        map.set(subcategory.slug, subcategory);
      }
    });

    totalPages = Number(payload?.total_pages ?? payload?.num_pages ?? 1) || 1;
    page += 1;
  }

  return [...map.values()];
}
