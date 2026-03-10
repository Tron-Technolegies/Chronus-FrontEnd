import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBox = ({ search, setSearch, onSearch, sort, setSort }) => {
  const handleSearch = () => {
    onSearch?.();
  };

  return (
    <div className="w-full max-w-[620px] bg-white rounded-md px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 min-w-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="px-4 py-2 text-xs tracking-wider bg-[#FFCA0A] text-black rounded-md shrink-0"
        >
          Search
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black shrink-0"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
          <option value="name-asc">Name A-Z</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBox;
