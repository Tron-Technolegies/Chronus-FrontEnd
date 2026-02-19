import React, { useState } from 'react';
import "../../shop/productdetails/productTabs.css"

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="product-tabs">
      <div className="tabs-header">
        <button
          className={activeTab === 'description' ? 'active' : ''}
          onClick={() => setActiveTab('description')}
        >
          DESCRIPTION
        </button>
        <button
          className={activeTab === 'specifications' ? 'active' : ''}
          onClick={() => setActiveTab('specifications')}
        >
          SPECIFICATIONS
        </button>
        <button
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          REVIEWS
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <div>
            <p>{product.description || "Detailed description coming soon..."}</p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <ul>
              <li>Case: 42mm 18K rose gold</li>
              <li>Movement: Swiss automatic chronograph</li>
              <li>Water resistance: 100m</li>
              <li>Strap: Crocodile leather</li>
              <li>Crystal: Sapphire</li>
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <p>4.9 / 5 • {product.reviewsCount} reviews</p>
            <p>"Amazing craftsmanship!" – John D.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;