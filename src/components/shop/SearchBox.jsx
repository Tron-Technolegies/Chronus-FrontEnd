import React from "react";
import { FiSearch, FiSliders } from "react-icons/fi";

const SearchBox = () => {
  return (
    <div className="w-full max-w-[400px] bg-white rounded-md px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search here"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          className="px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black shrink-0"
        >
          <option>Sort by</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>

        {/* Filter Icon */}
        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 shrink-0">
          <FiSliders className="text-gray-600" />
        </button>

      </div>
    </div>
  );
};

export default SearchBox;
