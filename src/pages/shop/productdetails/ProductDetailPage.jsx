import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { allProducts } from "../../../utils/products";

import ProductGallery from "../../../components/shop/productdetails/ProductGallery";
import ProductInfo from "../../../components/shop/productdetails/ProductInfo";
import ProductTabs from "../../../components/shop/productdetails/ProductTabs";
import YouMayAlsoLike from "../../../components/shop/YouMayAlsoLike";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) return <div className="p-10">Product not found</div>;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
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
        <ProductTabs product={product} />
      </div>
      <YouMayAlsoLike currentProduct={product} />
    </div>
  );
};

export default ProductDetailPage;
