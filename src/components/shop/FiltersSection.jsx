import React, { useState } from "react";
import "./FiltersSection.css";

const FiltersSection = () => {
  const [activeTab, setActiveTab] = useState("All Collections");

  const tabs = ["All Collections", "Timepieces", "Accessories", "Fine Art"];

  return (
    <div className="filters-section-container">
      <div className="top-section-filter">
        <div className="reset-filter">
          <h3>FILTERS</h3>
          <button>Reset</button>
        </div>

        <div className="filter-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active-tab" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="collection-filters">
        <h3>COLLECTIONS</h3>

        <div className="collection-filter-btns">
          <button>Best Sellers</button>
          <button>New Arrivals</button>
          <button>Featured</button>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
