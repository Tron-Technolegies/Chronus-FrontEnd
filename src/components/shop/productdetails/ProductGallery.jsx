import React, { useState } from 'react';
import "../../../components/shop/productdetails/ProductGallery.css"

const ProductGallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0] || '');

  return (
    <div className="gallery-section">
      {/* Main large image */}
      <div className="main-image-wrapper">
        <img src={mainImage} alt="Product" className="main-image" />
        <button className="wishlist-btn">
          {/* <FiHeart size={28} /> */}
        </button>
      </div>

      {/* Vertical thumbnails on left */}
      <div className="thumbnails">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;