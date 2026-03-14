import { useCallback, useEffect, useState } from "react";
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getCategories();

      const raw = response?.data?.categories ?? response?.data ?? [];

      const normalized = Array.isArray(raw) ? raw.map(toCategoryOption) : [];

      normalized.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.name.localeCompare(b.name);
      });

      setCategories(normalized);
    } catch (err) {
      setError(err?.response?.data?.detail ?? err?.message ?? "Failed to load categories.");

      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    refetch: loadCategories,
  };
}
