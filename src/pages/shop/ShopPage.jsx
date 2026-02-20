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

const ShopPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const location = useLocation();
  const categoryData = location.state?.category;

  const [showIntro, setShowIntro] = useState(!!categoryData);

  const [visible, setVisible] = useState(6);

  return (
    <div className="max-w-[1700px] mx-auto bg-white pb-14">
      {showIntro && categoryData && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden relative">
            {/* Close */}
            <button onClick={() => setShowIntro(false)} className="absolute top-4 right-4 text-xl">
              ✕
            </button>

            {/* Image */}
            <div className="bg-gray-100 flex items-center justify-center p-10">
              <img src={categoryData.img} className="h-[220px] object-contain" />
            </div>

            {/* Content */}
            <div className="p-8 text-center space-y-4">
              <h2 className="text-2xl tracking-widest font-[Bayon]">{categoryData.title}</h2>

              <p className="text-gray-500 max-w-md mx-auto">{categoryData.desc}</p>

              <button
                onClick={() => setShowIntro(false)}
                className="bg-[#F5C518] px-8 py-3 text-sm"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      )}
      <ShopPageHeader />

      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-[360px] border-r border-t border-gray-200 lg:sticky lg:top-0 h-fit">
          <FiltersSection />
          <ProductPriceFilter />
          <ShippingDetails />
        </aside>

        <main className="flex-1">
          <div className="border-b border-t border-gray-200 px-6 py-5">
            <CategoryTabs />
          </div>

          <div className="flex justify-end px-6 py-5">
            <SearchBox />
          </div>

          <div className="px-6 py-1">
            <ProductsGrid products={allProducts.slice(0, visible)} />{" "}
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
