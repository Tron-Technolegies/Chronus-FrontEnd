import React from "react";

const FilterOptions = () => {
  return (
    <section className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-14 grid grid-cols-3 items-center">
        
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <span className="text-xs tracking-widest uppercase text-black">
            Filters
          </span>
          <button className="text-xs text-gray-400 hover:text-black">
            Reset
          </button>
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center gap-2">
          <button className="px-4 h-7 text-xs bg-yellow-400 text-black">
            All Collections
          </button>
          <button className="px-4 h-7 text-xs border border-gray-200 text-gray-500 hover:text-black">
            Timepieces
          </button>
          <button className="px-4 h-7 text-xs border border-gray-200 text-gray-500 hover:text-black">
            Accessories
          </button>
          <button className="px-4 h-7 text-xs border border-gray-200 text-gray-500 hover:text-black">
            Fine Art
          </button>
        </div>

        {/* RIGHT (INTENTIONALLY EMPTY for balance) */}
        <div />
      </div>
    </section>
  );
};

export default FilterOptions;
