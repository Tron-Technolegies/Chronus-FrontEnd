import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBox = ({ search, setSearch, onSearch, sort, setSort }) => {
  const handleSearch = () => {
    onSearch?.();
  };

  return (
    <div className="w-full bg-white rounded-md p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-xs tracking-wider bg-[#FFCA0A] text-black rounded-md"
          >
            Search
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md"
          >
            <option value="default">Sort</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
