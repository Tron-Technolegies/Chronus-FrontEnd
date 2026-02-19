import React from "react";

const FiltersSection = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm tracking-widest text-gray-500">FILTERS</h3>
        <button className="text-xs text-gray-400 hover:text-black transition">Reset</button>
      </div>

      {/* Collections */}
      <div>
        <h4 className="text-xs tracking-widest text-gray-400 mb-4">COLLECTIONS</h4>

        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded text-xs hover:border-black transition">
            Best Sellers
          </button>

          <button className="px-3 py-1 border border-gray-200 rounded text-xs hover:border-black transition">
            New Arrivals
          </button>

          <button className="px-3 py-1 border border-gray-200 rounded text-xs hover:border-black transition">
            Featured
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
