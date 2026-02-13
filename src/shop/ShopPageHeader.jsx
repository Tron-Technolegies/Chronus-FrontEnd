import React from "react";

const ShopPageHeader = () => {
  return (
    <section className="w-full mt-12">
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-xs tracking-widest text-gray-500 uppercase mb-3">
          Discover
        </p>

        <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">
          Our Collection
        </h1>

        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          12 exquisite pieces curated for the discerning collector
        </p>
      </div>
    </section>
  );
};

export default ShopPageHeader;
