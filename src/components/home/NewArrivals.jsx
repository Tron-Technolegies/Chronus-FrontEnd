import React from "react";
import ProductsGrid from "../shop/ProductsGrid";
import { allProducts } from "../../utils/products";

const NewArrivals = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-[6%] font-sans">
      {/* Header Row */}
      <div className="flex items-end justify-between max-w-7xl mx-auto mb-12">
        {/* Left: Label + Title */}
        <div>
          <span className="block text-[11px] tracking-[1.5px] text-gray-400 mb-3 uppercase inter">
            JUST ARRIVED
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-black font-[Bastoni] leading-tight">
            Featured Pieces
          </h2>
          <p
            className="
    inter font-normal text-[#848484]
    text-[13px] sm:text-[14px]
    leading-relaxed
    mt-3
    max-w-full sm:max-w-md md:max-w-lg
  "
          >
            Handpicked by our curators for their exceptional craftsmanship,
            rarity, and investment potential.
          </p>{" "}
        </div>

        {/* Right: View All */}
        <a
          href="/shop"
          className="flex items-center gap-2 text-sm font-medium text-black border border-black/20 rounded-full px-5 py-2.5 hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap"
        >
          View All
          <span className="text-base leading-none">→</span>
        </a>
      </div>

      {/* Cards slot — drop your card components here */}
      <div className="max-w-7xl mx-auto">
        <ProductsGrid products={allProducts.slice(0, 2)} />
      </div>
    </section>
  );
};

export default NewArrivals;
