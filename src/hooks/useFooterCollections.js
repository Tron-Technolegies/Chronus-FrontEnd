import { useMemo } from "react";
import { useCategories } from "./useCategories";

const FALLBACK_COLLECTIONS = [{ label: "All Collections", to: "/shop" }];

export function useFooterCollections() {
  const { categories, loading, error } = useCategories();

  const collections = useMemo(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return FALLBACK_COLLECTIONS;
    }

    return categories.map((category) => ({
      label: category.name,
      to: `/shop?category=${encodeURIComponent(category.id)}`,
    }));
  }, [categories]);

  return {
    collections,
    loading,
    error,
  };
}
