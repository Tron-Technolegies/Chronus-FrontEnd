import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../api/product";

const toCategoryOption = (category) => ({
  id: category.id,
  name: category.name,
  slug: category.name?.toLowerCase().replace(/\s+/g, "-") ?? String(category.id),
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
      const raw = response.data?.categories ?? [];
      setCategories(Array.isArray(raw) ? raw.map(toCategoryOption) : []);
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

  return { categories, loading, error, refetch: loadCategories };
}
