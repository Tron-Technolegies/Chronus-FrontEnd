import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductGallery from "../../../components/shop/productdetails/ProductGallery";
import ProductInfo from "../../../components/shop/productdetails/ProductInfo";
import ProductTabs from "../../../components/shop/productdetails/ProductTabs";
import YouMayAlsoLike from "../../../components/shop/YouMayAlsoLike";
import { fetchProductByIdAPI } from "../../../api/product";

const formatProductDetails = (rawProduct) => {
  if (!rawProduct) return null;

  return {
    id: rawProduct.id,
    name: rawProduct.name ?? "",
    price: `$${Number(rawProduct.price ?? 0).toLocaleString()}`,
    _rawPrice: Number(rawProduct.price ?? 0),
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

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadProduct = async (showLoader = true) => {
    if (!id) return;

    if (showLoader) setLoading(true);
    setError(null);

    try {
      const response = await fetchProductByIdAPI(id);
      const payload = response.data;
      const rawProduct = Array.isArray(payload?.products)
        ? payload.products.find((item) => String(item.id) === String(id))
        : payload?.product ?? payload;
      setProduct(formatProductDetails(rawProduct));
    } catch (err) {
      setError(err?.response?.status === 404 ? "Product not found." : "Failed to load product.");
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
          <div className="bg-gray-100 rounded-lg h-[480px]" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-5 bg-gray-100 rounded w-1/3" />
            <div className="h-24 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center text-gray-500 mt-16">
        <p>{error ?? "Product not found."}</p>
        <Link to="/shop" className="mt-4 inline-block text-sm underline text-[#CBA61F]">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mt-16 sm:mt-18 mb-8 sm:mb-10">
        <Link to="/">Home</Link> &gt; <Link to="/shop">Collections</Link> &gt;{" "}
        <span className="text-[#CBA61F]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-12 sm:mt-20">
        <ProductTabs product={product} onReviewAdded={() => loadProduct(false)} />
      </div>
      <YouMayAlsoLike currentProduct={product} />
    </div>
  );
};

export default ProductDetailPage;
