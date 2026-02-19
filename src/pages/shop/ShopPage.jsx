import React from "react";
import ShopPageHeader from "../../components/shop/ShopPageHeader";
import FiltersSection from "../../components/shop/FiltersSection";
import ProductPriceFilter from "../../components/shop/ProductPriceFilter";
import ShippingDetails from "../../components/shop/ShippingDetails";
import ProductsGrid from "../../components/shop/ProductsGrid";
import SearchBox from "../../components/shop/SearchBox";

import { allProducts } from "../../utils/products";

import "../../pages/shop/ShopPage.css";
import CategoryTabs from "../../components/shop/CategoryTabs";

const ShopPage = () => {
  return (
    <div className="max-w-[1700px] mx-auto bg-white">
      <ShopPageHeader />

      {/* Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-[360px] border-r border-gray-200 lg:sticky lg:top-0 h-fit">
          <FiltersSection />
          <ProductPriceFilter />
          <ShippingDetails />
        </aside>

        {/* Right Content */}
        <main className="flex-1">
          {/* Tabs row */}
          <div className="border-b border-gray-200 px-6 py-5">
            <CategoryTabs />
          </div>

          {/* Search + Sort */}
          <div className="flex justify-end px-6 py-5">
            <SearchBox />
          </div>

          {/* Products */}
          <div className="px-6 py-8">
            <ProductsGrid products={allProducts} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
