import { useMemo } from "react";
import { allProducts } from "../utils/products";

/**
 * Normalises local products.js shape → same shape the UI expects
 * (mirrors the API normaliser in useProducts.js so ShopPage works the same way)
 */
const normalizeLocal = (p) => ({
  id: p.id,
  name: p.name,
  // Keep the "$12,500" display price as-is; parse a numeric version for filtering/sorting
  price: p.price,
  _rawPrice: parseFloat(String(p.price).replace(/[^0-9.]/g, "")) || 0,
  originalPrice: p.originalPrice ?? null,
  images: Array.isArray(p.images) ? p.images : [p.images].filter(Boolean),
  category: p.category ?? "other",
  categoryName: p.categoryName ?? "Other",
  categoryId: p.category ?? null,            // slug doubles as id for local data
  subcategory: p.subCategory?.toLowerCase() ?? null,
  subcategoryName: p.subCategory ?? null,
  subcategoryId: p.subCategory?.toLowerCase() ?? null,
  brand: p.brand ?? "",
  brandId: null,
  shortDesc: p.shortDesc ?? p.description?.slice(0, 80) ?? "",
  description: p.description ?? "",
  stock: p.stock ?? 0,
  is_featured: false,
  is_best_seller: false,
  created_at: null,
  rating: p.rating ?? 4.8,
  reviewsCount: p.reviewsCount ?? 0,
  reviews: p.reviews ?? [],
});

/**
 * Local drop-in replacement for useProducts.
 * Uses allProducts from utils/products.js — no API calls.
 * Swap back to useProducts when the backend is ready.
 *
 * @param {object} [options]
 * @param {string|null} [options.categoryId] — category slug to filter by (e.g. "watches")
 */
export function useLocalProducts({ categoryId = null } = {}) {
  const products = useMemo(() => {
    const normalized = allProducts.map(normalizeLocal);
    if (!categoryId) return normalized;
    return normalized.filter((p) => p.category === categoryId);
  }, [categoryId]);

  // Unique categories derived from local data
  const categories = useMemo(
    () =>
      products.reduce((acc, p) => {
        if (!acc.find((c) => c.id === p.categoryId)) {
          acc.push({ id: p.categoryId, name: p.categoryName, slug: p.category });
        }
        return acc;
      }, []),
    [products]
  );

  // Unique non-null subcategories (his / her) — only meaningful in category mode
  const subcategories = useMemo(
    () =>
      products.reduce((acc, p) => {
        if (p.subcategory && !acc.find((s) => s.id === p.subcategoryId)) {
          acc.push({
            id: p.subcategory,
            name: p.subcategoryName ?? p.subcategory,
            slug: p.subcategory,
          });
        }
        return acc;
      }, []),
    [products]
  );

  return {
    products,
    loading: false,
    error: null,
    refetch: () => {},
    categories,
    subcategories,
  };
}
