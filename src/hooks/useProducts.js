import { useEffect, useState, useCallback } from "react";
import { fetchProductsAPI } from "../api/product";

const normalise = (p) => ({
  id: p.id,
  name: p.name,
  price: `$${Number(p.price).toLocaleString()}`,
  _rawPrice: Number(p.price),
  originalPrice: null,
  image: p.image ?? null,
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
  specification: p.specification && typeof p.specification === "object" ? p.specification : {},
  stock: p.stock ?? 0,
  is_featured: p.is_featured ?? false,
  is_best_seller: p.is_best_seller ?? false,
  created_at: p.created_at ?? null,
  rating: 4.8,
  reviewsCount: 0,
  reviews: [],
});

const SORT_PARAM_MAP = {
  "price-asc": "price",
  "price-desc": "-price",
  newest: "-created_at",
  "name-asc": "name",
};

const addParam = (params, key, value) => {
  if (value === null || value === undefined || value === "") return;
  params[key] = value;
};

const toPagination = (payload, itemCount) => {
  const count = Number(payload?.count ?? payload?.total ?? itemCount) || itemCount;
  const currentPage = Number(payload?.page ?? payload?.current_page ?? 1) || 1;
  const pageSize = Number(payload?.page_size ?? payload?.limit ?? itemCount) || itemCount;
  const totalPages =
    Number(payload?.total_pages ?? payload?.num_pages) ||
    (pageSize > 0 ? Math.ceil(count / pageSize) : 1);

  const hasMoreFromPage = currentPage < totalPages;
  const hasMore = typeof payload?.next === "boolean" ? payload.next : Boolean(payload?.next) || hasMoreFromPage;

  return {
    count,
    currentPage,
    pageSize,
    totalPages,
    hasMore,
  };
};

export function useProducts({
  category = null,
  type = null,
  search = null,
  sort = null,
  minPrice = null,
  maxPrice = null,
  subcategory = null,
  page = 1,
  pageSize = 12,
  append = false,
} = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    currentPage: 1,
    pageSize,
    totalPages: 1,
    hasMore: false,
  });

  const effectiveSubcategory = subcategory ?? type ?? null;

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      addParam(params, "category", category);
      addParam(params, "search", search?.trim());
      addParam(params, "min_price", minPrice);
      addParam(params, "max_price", maxPrice);
      addParam(params, "subcategory", effectiveSubcategory);
      addParam(params, "page", page);
      addParam(params, "page_size", pageSize);

      const ordering = SORT_PARAM_MAP[sort] ?? null;
      addParam(params, "ordering", ordering);
      addParam(params, "sort", sort);

      const res = await fetchProductsAPI(params);
      const payload = res.data;
      const raw = payload?.products ?? payload?.results ?? (Array.isArray(payload) ? payload : []);
      const normalized = Array.isArray(raw) ? raw.map(normalise) : [];

      setProducts((prev) => {
        if (!append || page <= 1) return normalized;

        const seen = new Set(prev.map((item) => item.id));
        const next = [...prev];

        normalized.forEach((item) => {
          if (seen.has(item.id)) return;
          seen.add(item.id);
          next.push(item);
        });

        return next;
      });

      setPagination(toPagination(payload, normalized.length));
    } catch (err) {
      setError(err?.response?.data?.detail ?? err?.message ?? "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [category, search, minPrice, maxPrice, effectiveSubcategory, page, pageSize, sort, append]);

  useEffect(() => {
    load();
  }, [load]);

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

  const subcategories = products.reduce((acc, p) => {
    if (p.subcategoryId && !acc.find((s) => s.id === p.subcategoryId)) {
      acc.push({ id: p.subcategoryId, name: p.subcategoryName, slug: p.subcategory });
    }
    return acc;
  }, []);

  return {
    products,
    loading,
    error,
    refetch: load,
    categories,
    brands,
    subcategories,
    pagination,
    hasMore: pagination.hasMore,
    totalCount: pagination.count,
  };
}
