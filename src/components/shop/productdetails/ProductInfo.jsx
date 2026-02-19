import React from "react";
import { FiHeart, FiShoppingCart, FiShare2, FiTruck, FiRefreshCw } from "react-icons/fi";

import { HiShieldCheck } from "react-icons/hi";

import "../../../components/shop/productdetails/ProductInfo.css";

const ProductInfo = ({ product }) => {
  return (
    <div className="info-section">
      <span className="sale-badge">SALE</span>

      <h1 className="product-title">{product.name}</h1>

      <div className="rating">
        ★★★★☆{" "}
        <span className="reviews">
          {product.rating} ({product.reviewsCount} reviews)
        </span>
      </div>

      <div className="price">
        <span className="current-price">{product.price}</span>
        {product.originalPrice && <span className="original-price">{product.originalPrice}</span>}
      </div>

      <p className="short-desc">{product.shortDesc || product.description}</p>

      <div className="quantity-buy">
        <div className="quantity-selector">
          <button className="quantity-btn">-</button>
          <span>1</span>
          <button className="quantity-btn">+</button>
        </div>
        <button className="buy-now-btn">BUY NOW</button>
        <button className="cart-btn">
          <FiShoppingCart size={24} />
        </button>
      </div>

      <div className="trust-badges">
        <div className="badge">
          <HiShieldCheck size={20} /> Authenticity Guaranteed
        </div>
        <div className="badge">
          <FiTruck size={20} /> Free Shipping
        </div>
        <div className="badge">
          <FiRefreshCw size={20} /> 30-Day Returns
        </div>
      </div>

      <div className="actions">
        <button className="action-btn">
          <FiHeart size={20} /> Add to Wishlist
        </button>
        <button className="action-btn">
          <FiShoppingCart size={20} /> Add to Cart
        </button>
        <button className="action-btn">
          <FiShare2 size={20} /> Share
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
