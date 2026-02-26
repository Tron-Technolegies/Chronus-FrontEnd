import React from "react";

const COLLECTIONS = [
  { key: "all", label: "All" },
  { key: "best-seller", label: "Best Sellers" },
  { key: "new", label: "New Arrivals" },
  { key: "featured", label: "Featured" },
];

const FiltersSection = ({ collection, setCollection, resetFilters }) => {
  return (
    <div className="p-6 space-y-8 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-md tracking-widest text-black">FILTERS</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-gray-400 hover:text-black transition"
        >
          Reset
        </button>
      </div>

      <div>
        <h4 className="text-sm font-semibold tracking-widest text-black mb-4">COLLECTIONS</h4>
        <div className="flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCollection(c.key)}
              className={`px-3 py-1 border rounded text-xs cursor-pointer transition
                ${
                  collection === c.key
                    ? "bg-[#3D1613] text-white border-[#3D1613]"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
