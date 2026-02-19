import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from "../../../utils/products";

import ProductGallery from "../../../components/shop/productdetails/ProductGallery"
import ProductInfo from '../../../components/shop/productdetails/ProductInfo';
import "../../../pages/shop/productdetails/ProductDetailPage.css"

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link to="/">Home</Link> &gt;{' '}
        <Link to="/shop">Collections</Link> &gt;{' '}
        <Link to={`/shop?category=watches`}>watches</Link> &gt;{' '}
        <span>{product.name}</span>
      </nav>

      <div className="product-main">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      {/* You can add tabs, reviews, related products later */}
    </div>
  );
};

export default ProductDetailPage;