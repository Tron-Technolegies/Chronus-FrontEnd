import React from "react";

const SubcategoryFilter = ({ subcategories = [], activeSubcategory, setActiveSubcategory }) => {
  if (!subcategories.length) return null;

  const all = { id: "all", name: "All" };
  const tabs = [all, ...subcategories];

  return (
    <div className="border-b border-t border-gray-200 px-4 sm:px-6 py-4 overflow-hidden">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map((tab) => {
          const isAllTab = tab.id === "all";
          const isActive = isAllTab ? activeSubcategory === null : activeSubcategory === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubcategory(isAllTab ? null : tab.id)}
              className={`px-4 py-2 text-sm border transition whitespace-nowrap shrink-0
                ${
                  isActive
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "border-gray-200 text-gray-500 hover:text-black"
                }
              `}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubcategoryFilter;
