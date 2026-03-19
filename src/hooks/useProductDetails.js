import { useCallback, useEffect, useState } from "react";
import { fetchProductByIdAPI } from "../api/product";

const formatMoney = (value) => `$${Number(value ?? 0).toLocaleString()}`;

const formatProductDetails = (rawProduct) => {
  if (!rawProduct) return null;

  const sizes = Array.isArray(rawProduct.sizes)
    ? rawProduct.sizes
        .map((item) => {
          const rawPrice = Number(item?.price ?? 0);
          const label = String(item?.size ?? "").trim();
          if (!label) return null;
          return {
            id: item?.id ?? label,
            size: label,
            price: formatMoney(rawPrice),
            _rawPrice: rawPrice,
          };
        })
        .filter(Boolean)
    : [];

  const colors = Array.isArray(rawProduct.colors)
    ? rawProduct.colors
        .map((item) => {
          const id = item?.id;
          const name = String(item?.color_name ?? "").trim();
          if (!id || !name) return null;

          return {
            id,
            name,
            image: item?.image ?? null,
          };
        })
        .filter(Boolean)
    : [];

  const frames = Array.isArray(rawProduct.frames)
    ? rawProduct.frames
        .map((item) => {
          const id = item?.id;
          const name = String(item?.name ?? "").trim();
          if (!id || !name) return null;

          const rawExtraPrice = Number(item?.extra_price ?? 0);

          return {
            id,
            name,
            image: item?.image ?? null,
            extraPrice: formatMoney(rawExtraPrice),
            _rawExtraPrice: rawExtraPrice,
          };
        })
        .filter(Boolean)
    : [];

  const materials = Array.isArray(rawProduct.materials)
    ? rawProduct.materials
        .map((item) => {
          const id = item?.id;
          const name = String(item?.name ?? "").trim();
          if (!id || !name) return null;

          const rawExtraPrice = Number(item?.extra_price ?? 0);

          return {
            id,
            name,
            description: item?.description ?? "",
            extraPrice: formatMoney(rawExtraPrice),
            _rawExtraPrice: rawExtraPrice,
          };
        })
        .filter(Boolean)
    : [];

  const baseRawPrice = Number(rawProduct.price ?? 0);

  return {
    id: rawProduct.id,
    name: rawProduct.name ?? "",
    price: formatMoney(baseRawPrice),
    _rawPrice: baseRawPrice,
    originalPrice: null,
    image: rawProduct.image ?? null,
    images: [rawProduct.image, ...(rawProduct.gallery ?? [])].filter(Boolean),
    category: rawProduct.category?.name?.toLowerCase().replace(/\s+/g, "-") ?? "other",
    categoryName: rawProduct.category?.name ?? "Other",
    categoryId: rawProduct.category?.id ?? null,
    subcategory: rawProduct.subcategory?.name?.toLowerCase().replace(/\s+/g, "-") ?? null,
    subcategoryName: rawProduct.subcategory?.name ?? null,
    subcategoryId: rawProduct.subcategory?.id ?? null,
    brand: rawProduct.brand?.name ?? "",
    brandId: rawProduct.brand?.id ?? null,
    shortDesc: rawProduct.description?.slice(0, 140) ?? "",
    description: rawProduct.description ?? "",
    specification:
      rawProduct.specification && typeof rawProduct.specification === "object"
        ? rawProduct.specification
        : {},
    stock: rawProduct.stock ?? 0,
    sizes,
    colors,
    frames,
    materials,
    is_featured: rawProduct.is_featured ?? false,
    is_best_seller: rawProduct.is_best_seller ?? false,
    created_at: rawProduct.created_at ?? null,
    rating: Number(rawProduct.average_rating ?? 0),
    reviewsCount: Number(rawProduct.review_count ?? 0),
    reviews: (rawProduct.reviews ?? []).map((review) => ({
      id: review.id,
      name: review.name ?? "Guest",
      rating: Number(review.rating ?? 0),
      comment: review.comment ?? "",
      date: review.created_at
        ? new Date(review.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "",
    })),
  };
};

export function useProductDetails(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProduct = useCallback(
    async (showLoader = true) => {
      if (!productId) return;

      if (showLoader) setLoading(true);
      setError(null);

      try {
        const response = await fetchProductByIdAPI(productId);
        const rawProduct = response.data;
        setProduct(formatProductDetails(rawProduct));
      } catch (err) {
        setError(err?.response?.status === 404 ? "Product not found." : "Failed to load product.");
      } finally {
        if (showLoader) setLoading(false);
      }
    },
    [productId],
  );

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    product,
    loading,
    error,
    loadProduct,
  };
}
