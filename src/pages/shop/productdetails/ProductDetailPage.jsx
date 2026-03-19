import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductGallery from "../../../components/shop/productdetails/ProductGallery";
import ProductInfo from "../../../components/shop/productdetails/ProductInfo";
import ProductTabs from "../../../components/shop/productdetails/ProductTabs";
import YouMayAlsoLike from "../../../components/shop/YouMayAlsoLike";
import { useProductDetails } from "../../../hooks/useProductDetails";
import { useProductSizePricing } from "../../../hooks/useProductSizePricing";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { product, loading, error, loadProduct } = useProductDetails(id);
  const productSelection = useProductSizePricing(product);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5">
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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-10">
      <nav className="text-xs sm:text-sm text-gray-500 mt-16 sm:mt-18 mb-8 sm:mb-10">
        <Link to="/">Home</Link> &gt; <Link to="/shop">Collections</Link> &gt;{" "}
        <span className="text-[#CBA61F]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <ProductGallery
          images={product.images}
          colorImage={productSelection.activeColorOption?.image ?? null}
        />
        <ProductInfo product={product} productSelection={productSelection} />
      </div>

      <div className="mt-12 sm:mt-20">
        <ProductTabs product={product} onReviewAdded={() => loadProduct(false)} />
      </div>
      <YouMayAlsoLike currentProduct={product} />
    </div>
  );
};

export default ProductDetailPage;
