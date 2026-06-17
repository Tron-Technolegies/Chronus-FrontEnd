import { useQuery } from "@tanstack/react-query";
import { fetchProductsAPI } from "../api/product";
import { formatMoney } from "../utils/currency";

const normalise = (p) => ({
  id: p.id,
  name: p.name,

  name: p.name,

  price: formatMoney(p.price, p.currency),
  _rawPrice: Number(p.price),
  currency: p.currency || null,

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
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", { category, subcategory, search, minPrice, maxPrice, page, pageSize }],
    queryFn: async () => {
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

      const subs = [];
      normalized.forEach((p) => {
        if (p.subcategoryId && !subs.find((s) => s.id === p.subcategoryId)) {
          subs.push({
            id: p.subcategoryId,
            name: p.subcategoryName,
          });
        }
      });

      return {
        products: normalized,
        subcategories: subs,
        pagination: {
          currentPage: payload.page,
          totalPages: payload.total_pages,
          totalProducts: payload.total_products,
        },
      };
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });

  const emptyPagination = {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  };

  return {
    products: data?.products ?? [],
    subcategories: data?.subcategories ?? [],
    pagination: data?.pagination ?? emptyPagination,
    totalCount: data?.pagination?.totalProducts ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}
