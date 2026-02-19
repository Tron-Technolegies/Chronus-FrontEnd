import React from 'react';
import ShopPageHeader from "../../components/shop/ShopPageHeader";
import FiltersSection from "../../components/shop/FiltersSection";
import ProductPriceFilter from "../../components/shop/ProductPriceFilter";
import ShippingDetails from "../../components/shop/ShippingDetails";
import ProductsGrid from "../../components/shop/ProductsGrid";
import SearchBox from "../../components/shop/SearchBox";


import { allProducts } from "../../utils/products";

import "../../pages/shop/ShopPage.css";

const ShopPage = () => {
  return (
    <div className="shop-page">
      <ShopPageHeader />

      <div className="shop-layout">
        <aside className="sidebar">
          <FiltersSection />

          <div className="price-wrapper">
            <ProductPriceFilter />
          </div>

          <div className="shipping-wrapper">
            <ShippingDetails />
          </div>
        </aside>

        <main className="main-content">
          <div className="products-topbar">
            <SearchBox />
          </div>

          <div className="products-container">
            {/* Pass the products array here */}
            <ProductsGrid products={allProducts} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;