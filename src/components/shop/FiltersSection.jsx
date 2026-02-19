import React, { useState } from "react";
import "../../components/shop/FiltersSection.css"

const FiltersSection = () => {
  const [activeTab, setActiveTab] = useState("All Collections");

  const tabs = ["All Collections", "Timepieces", "Accessories", "Fine Art"];

  return (
    <div className="filters-section">

 
      <div className="filters-top-row">

       
        <div className="filters-left">
          <span className="filters-title">FILTERS</span>
          <button className="reset-btn">Reset</button>
        </div>

      
        <div className="category-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

     
      <div className="collections-section">
        <h3>COLLECTIONS</h3>
        <div className="collection-list">
          <button className="collection-item">Best Sellers</button>
          <button className="collection-item">New Arrivals</button>
          <button className="collection-item">Featured</button>
        </div>
      </div>

      
      {/* <div className="price-section">
        <h3>Price Range</h3>
      
        <div className="price-range-placeholder">$0 — $35,000</div>
      </div> */}

      {/* Shipping & Delivery */}
      <div className="shipping-section">
        <h3>SHIPPING & DELIVERY</h3>
        {/* <ShippingDetails /> */}
      </div>

    </div>
  );
};

export default FiltersSection;