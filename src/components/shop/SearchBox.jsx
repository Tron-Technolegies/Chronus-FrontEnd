import React from "react";
import { FiSearch, FiSliders } from "react-icons/fi";

const SearchBox = () => {
  return (
    <div className="w-[400px] bg-white rounded-md px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search here"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option>Sort by</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>

        {/* Filter Icon */}
        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
          <FiSliders className="text-gray-600" />
        </button>

      </div>
    </div>
  );
};

export default SearchBox;
