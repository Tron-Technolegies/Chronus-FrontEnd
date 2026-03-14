export default function CategoryTabs({ categories = [], activeCategory, setActiveCategory }) {
  const allTab = { id: null, name: "All Collections", slug: "all" };
  const tabs = [allTab, ...categories];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id ?? tab.slug}
          onClick={() => setActiveCategory(tab.id)}
          className={`px-4 py-2 text-sm border transition whitespace-nowrap shrink-0
            ${
              activeCategory === tab.id
                ? "bg-yellow-400 text-black border-yellow-400"
                : "border-gray-200 text-gray-500 hover:text-black"
            }
          `}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
