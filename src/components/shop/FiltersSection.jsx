import React from "react";

const FiltersSection = () => {
  return (
    <div className="p-6 space-y-8 border-b border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mx-8">
        <h3 className="text-md tracking-widest text-black">FILTERS</h3>
        <button className="text-sm  text-gray-400 hover:text-black transition">Reset</button>
      </div>

      {/* Collections */}
      <div className="mx-8">
        <h4 className="text-sm font-semibold tracking-widest text-black mb-4">COLLECTIONS</h4>

        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded cursor-pointer text-xs hover:bg-gray-300 transition">
            Best Sellers
          </button>

          <button className="px-3 py-1 border border-gray-200 rounded text-xs cursor-pointer hover:bg-gray-300 transition">
            New Arrivals
          </button>

          <button className="px-3 py-1 border border-gray-200 rounded text-xs hover:bg-gray-300 cursor-pointer transition">
            Featured
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
