import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import "../../components/shop/ProductCard.css";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />

        <button
          className="wishlist-btn"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <FiHeart
            size={24}
            fill={isWishlisted ? "#ff4d4f" : "none"}
            color={isWishlisted ? "#ff4d4f" : "#fff"}
          />
        </button>

        <div className="buy-overlay">
          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>

      <div className="product-info">
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
