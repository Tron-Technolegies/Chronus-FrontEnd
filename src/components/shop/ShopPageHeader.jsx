import React from "react";

const ShopPageHeader = ({ categoryName, typeLabel }) => {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        {categoryName ? (
          <>
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">Category</p>

            <h1 className="text-2xl md:text-3xl font-serif text-black">{categoryName}</h1>

            {typeLabel && (
              <div className="inline-flex items-center gap-3 mt-3">
                <span
                  className="block h-[1px] w-6"
                  style={{ background: "linear-gradient(to right, #b8964c, #e0c78a)" }}
                />
                <span
                  className="text-[11px] tracking-[0.25em] uppercase font-semibold"
                  style={{ color: "#b8964c", fontFamily: "inter, sans-serif" }}
                >
                  {typeLabel}
                </span>

                <span
                  className="block h-[1px] w-6"
                  style={{ background: "linear-gradient(to left, #b8964c, #e0c78a)" }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">Discover</p>

            <h1 className="text-2xl md:text-3xl font-serif text-black">Our Collection</h1>

            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">
              Exquisite pieces curated for the discerning collector
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default ShopPageHeader;
