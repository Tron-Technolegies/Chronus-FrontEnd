import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/product";

const toCategoryOption = (category) => ({
  id: category.id,
  name: category.name,

  slug: category.name?.toLowerCase().replace(/\s+/g, "-") ?? String(category.id),

  priority: Number.isFinite(Number(category.priority))
    ? Number(category.priority)
    : Number.MAX_SAFE_INTEGER,

  image: category.image ?? category.image_url ?? category.thumbnail ?? category.banner ?? null,

  description: category.description ?? category.subdescription ?? "",
  subdescription: category.subdescription ?? category.description ?? "",
  subcategories: Array.isArray(category.subcategories)
    ? category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        name: subcategory.name,
        slug: subcategory.slug ?? subcategory.name?.toLowerCase().replace(/\s+/g, "-") ?? "",
      }))
    : [],
});

export function useCategories() {
  const { data: categories = [], isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories();
      const raw = response?.data?.categories ?? response?.data ?? [];
      const normalized = Array.isArray(raw) ? raw.map(toCategoryOption) : [];
      
      normalized.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.name.localeCompare(b.name);
      });
      
      return normalized;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000,    // 60 minutes
  });

  return {
    categories,
    loading: isLoading,
    error: error?.response?.data?.detail ?? error?.message ?? null,
    refetch,
  };
}
