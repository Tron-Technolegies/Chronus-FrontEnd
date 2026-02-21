import { useState } from "react";

export default function CategoryTabs() {
  const [active, setActive] = useState("All Collections");

  const tabs = ["All Collections", "Timepieces", "Accessories", "Fine Art"];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 text-sm border transition whitespace-nowrap shrink-0
            ${
              active === tab
                ? "bg-yellow-400 text-black border-yellow-400"
                : "border-gray-200 text-gray-500 hover:text-black"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

