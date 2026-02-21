import React, { useEffect, useState } from "react";
import ShopPageHeader from "../../components/shop/ShopPageHeader";
import FiltersSection from "../../components/shop/FiltersSection";
import ProductPriceFilter from "../../components/shop/ProductPriceFilter";
import ShippingDetails from "../../components/shop/ShippingDetails";
import ProductsGrid from "../../components/shop/ProductsGrid";
import SearchBox from "../../components/shop/SearchBox";
import { allProducts } from "../../utils/products";
import CategoryTabs from "../../components/shop/CategoryTabs";
import { useLocation } from "react-router-dom";
import { FiSliders, FiX } from "react-icons/fi";

const ShopPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const location = useLocation();
  const categoryData = location.state?.category;

  const [showIntro, setShowIntro] = useState(!!categoryData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(6);

  return (
    <div className="max-w-[1700px] mx-auto bg-white pb-14">
      {showIntro && categoryData && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6 font-[Bayon]">
          <div className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden relative">
            {/* Close */}
            <button onClick={() => setShowIntro(false)} className="absolute top-4 right-4 text-xl z-10">
              ✕
            </button>

            {/* Image */}
            <div className="bg-gray-100 flex items-center justify-center p-6 sm:p-10">
              <img src={categoryData.img} className="h-[140px] sm:h-[180px] md:h-[220px] object-contain" />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 text-center space-y-4">
              <h2 className="text-xl sm:text-2xl tracking-widest font-[Bayon]">{categoryData.title}</h2>

              <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">{categoryData.desc}</p>

              <button
                onClick={() => setShowIntro(false)}
                className="bg-[#F5C518] px-6 sm:px-8 py-3 text-sm"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      )}
      <ShopPageHeader />

      {/* Mobile: Filter toggle button */}
      <div className="lg:hidden flex justify-end px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded"
        >
          <FiSliders size={14} />
          Filters
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          {/* Sidebar panel */}
          <div className="relative bg-white w-[300px] max-w-[85vw] h-full overflow-y-auto z-10">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold tracking-widest text-sm">FILTERS</h3>
              <button onClick={() => setSidebarOpen(false)}>
                <FiX size={20} />
              </button>
            </div>
            <FiltersSection />
            <ProductPriceFilter />
            <ShippingDetails />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-full lg:w-[360px] border-r border-t border-gray-200 lg:sticky lg:top-0 h-fit">
          <FiltersSection />
          <ProductPriceFilter />
          <ShippingDetails />
        </aside>

        <main className="flex-1 min-w-0">
          <div className="border-b border-t border-gray-200 px-4 sm:px-6 py-5 overflow-hidden">
            <CategoryTabs />
          </div>

          <div className="flex justify-end px-4 sm:px-6 py-5">
            <SearchBox />
          </div>

          <div className="py-1">
            <ProductsGrid products={allProducts.slice(0, visible)} />
          </div>
          <div className="flex justify-center py-10">
            {visible < allProducts.length && (
              <button
                onClick={() => setVisible((v) => v + 6)}
                className="bg-[#FFCA0A] font-[inter] text-black px-6 py-3 cursor-pointer"
              >
                Load More
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
