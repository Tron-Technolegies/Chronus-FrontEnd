import React from "react";

const ShopPageHeader = ({ categoryName, typeLabel }) => {
  return (
    <section className="w-full mt-4">
      <div className="max-w-6xl mx-auto px-4 py-14 text-center">
        {categoryName ? (
          <>
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-3">Category</p>
            <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">{categoryName}</h1>
            {typeLabel && (
              <div className="inline-flex items-center gap-3 mt-1">
                {/* Thin gold rule */}
                <span
                  className="block h-[1px] w-8"
                  style={{ background: "linear-gradient(to right, #b8964c, #e0c78a)" }}
                />
                <span
                  className="text-xs tracking-[0.25em] uppercase font-semibold"
                  style={{ color: "#b8964c", fontFamily: "inter, sans-serif" }}
                >
                  {typeLabel}
                </span>
                <span
                  className="block h-[1px] w-8"
                  style={{ background: "linear-gradient(to left, #b8964c, #e0c78a)" }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-3">Discover</p>
            <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">Our Collection</h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Exquisite pieces curated for the discerning collector
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default ShopPageHeader;
