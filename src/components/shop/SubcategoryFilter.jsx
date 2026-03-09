import React from "react";

const SubcategoryFilter = ({ subcategories = [], activeSubcategory, setActiveSubcategory }) => {
  if (!subcategories.length) return null;

  const all = { id: "all", name: "All", slug: "all" };
  const tabs = [all, ...subcategories];

  return (
    <div className="border-b border-t border-gray-200 px-4 sm:px-6 py-4 overflow-hidden">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => setActiveSubcategory(tab.slug)}
            className={`px-4 py-2 text-sm border transition whitespace-nowrap shrink-0
              ${
                activeSubcategory === tab.slug
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "border-gray-200 text-gray-500 hover:text-black"
              }
            `}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryFilter;
