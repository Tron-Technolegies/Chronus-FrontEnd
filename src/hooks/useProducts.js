import { useEffect, useState, useCallback } from "react";
import { fetchProductsAPI } from "../api/product";

const normalise = (p) => ({
  id: p.id,
  name: p.name,

  price: `$${Number(p.price).toLocaleString()}`,
  _rawPrice: Number(p.price),

  image: p.image ?? null,
  images: [p.image, ...(p.gallery ?? [])].filter(Boolean),

  categoryId: p.category?.id ?? null,
  categoryName: p.category?.name ?? "Other",

  subcategoryId: p.subcategory?.id ?? null,
  subcategoryName: p.subcategory?.name ?? null,

  brand: p.brand?.name ?? "",
  brandId: p.brand?.id ?? null,

  specification: p.specification && typeof p.specification === "object" ? p.specification : {},

  stock: p.stock ?? 0,
  is_featured: p.is_featured ?? false,
  is_best_seller: p.is_best_seller ?? false,

  created_at: p.created_at ?? null,
});

export function useProducts({
  category = null,
  subcategory = null,
  search = null,
  minPrice = null,
  maxPrice = null,
  page = 1,
  pageSize = 12,
  enabled = true,
} = {}) {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit: pageSize,
      };

      if (category !== null && category !== undefined && category !== "") params.category = category;
      if (subcategory !== null && subcategory !== undefined && subcategory !== "") {
        params.subcategory = subcategory;
      }
      if (search) params.search = search;
      if (minPrice !== null && minPrice !== undefined && minPrice !== "") params.min_price = minPrice;
      if (maxPrice !== null && maxPrice !== undefined && maxPrice !== "") params.max_price = maxPrice;

      const res = await fetchProductsAPI(params);
      const payload = res.data;

      const normalized = payload.products.map(normalise);

      setProducts(normalized);

      setPagination({
        currentPage: payload.page,
        totalPages: payload.total_pages,
        totalProducts: payload.total_products,
      });

      const subs = [];
      normalized.forEach((p) => {
        if (p.subcategoryId && !subs.find((s) => s.id === p.subcategoryId)) {
          subs.push({
            id: p.subcategoryId,
            name: p.subcategoryName,
          });
        }
      });

      setSubcategories(subs);
    } catch (err) {
      setError(err?.message ?? "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [category, subcategory, search, minPrice, maxPrice, page, pageSize, enabled]);

  useEffect(() => {
    if (!enabled) {
      setProducts([]);
      setSubcategories([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
      });
      setLoading(true);
      setError(null);
      return;
    }

    load();
  }, [enabled, load]);

  return {
    products,
    loading,
    error,
    pagination,
    totalCount: pagination.totalProducts,
    subcategories,
    refetch: load,
  };
}
