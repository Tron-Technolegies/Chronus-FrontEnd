import { useEffect, useState, useCallback } from "react";
import { fetchProductsAPI, getProductsByCategory } from "../api/product";

/**
 * Normalises the backend product shape → the shape the UI expects.
 *
 * Backend returns:
 * { id, name, category:{id,name}, subcategory:{id,name}|null, brand:{id,name},
 *   price, description, stock, image, gallery:[url],
 *   is_featured, is_best_seller, created_at }
 *
 * UI expects:
 * { id, name, price, images:[url], category(string slug),
 *   categoryName, categoryId, subcategory(string|null),
 *   subcategoryName(string|null), subcategoryId(int|null),
 *   brand(string), shortDesc, description,
 *   stock, is_featured, is_best_seller, created_at,
 *   rating, reviewsCount }
 */
const normalise = (p) => ({
  id: p.id,
  name: p.name,
  price: `$${Number(p.price).toLocaleString()}`,
  _rawPrice: Number(p.price),          // numeric, used for price filter / sort
  originalPrice: null,
  images: [p.image, ...(p.gallery ?? [])].filter(Boolean),
  category: p.category?.name?.toLowerCase().replace(/\s+/g, "-") ?? "other",
  categoryName: p.category?.name ?? "Other",
  categoryId: p.category?.id ?? null,
  subcategory: p.subcategory?.name?.toLowerCase().replace(/\s+/g, "-") ?? null,
  subcategoryName: p.subcategory?.name ?? null,
  subcategoryId: p.subcategory?.id ?? null,
  brand: p.brand?.name ?? "",
  brandId: p.brand?.id ?? null,
  shortDesc: p.description?.slice(0, 80) ?? "",
  description: p.description ?? "",
  stock: p.stock ?? 0,
  is_featured: p.is_featured ?? false,
  is_best_seller: p.is_best_seller ?? false,
  created_at: p.created_at ?? null,
  // Placeholder ratings until a reviews endpoint is available
  rating: 4.8,
  reviewsCount: 0,
  reviews: [],
});

/**
 * Fetches products from the API (optionally filtered by categoryId),
 * normalises them, and provides derived helpers for filter UIs.
 *
 * @param {object} [options]
 * @param {number|string|null} [options.categoryId] - When set, fetches only that category's products
 *
 * Returns:
 *   products      – normalised list
 *   loading
 *   error
 *   refetch       – call to re-fetch
 *   categories    – unique { id, name, slug } list derived from products
 *   brands        – unique { id, name } list derived from products
 *   subcategories – unique non-null { id, name, slug } from products (for category pages)
 */
export function useProducts({ categoryId = null } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = categoryId
        ? await getProductsByCategory(categoryId)
        : await fetchProductsAPI();
      const raw = res.data?.products ?? res.data ?? [];
      setProducts(Array.isArray(raw) ? raw.map(normalise) : []);
    } catch (err) {
      setError(
        err?.response?.data?.detail ?? err?.message ?? "Failed to load products.",
      );
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    load();
  }, [load]);

  // Derive unique categories and brands for filter UIs
  const categories = products.reduce((acc, p) => {
    if (!acc.find((c) => c.id === p.categoryId)) {
      acc.push({ id: p.categoryId, name: p.categoryName, slug: p.category });
    }
    return acc;
  }, []);

  const brands = products.reduce((acc, p) => {
    if (p.brand && !acc.find((b) => b.name === p.brand)) {
      acc.push({ id: p.brandId, name: p.brand });
    }
    return acc;
  }, []);

  // Unique non-null subcategories — only meaningful in category mode
  const subcategories = products.reduce((acc, p) => {
    if (p.subcategoryId && !acc.find((s) => s.id === p.subcategoryId)) {
      acc.push({ id: p.subcategoryId, name: p.subcategoryName, slug: p.subcategory });
    }
    return acc;
  }, []);

  return { products, loading, error, refetch: load, categories, brands, subcategories };
}
