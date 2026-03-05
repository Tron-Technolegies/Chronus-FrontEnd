import React, { useState } from "react";
import CategoryIntroModal from "./CategoryIntroModal";

const categories = [
  {
    id: 1,
    name: "Watches",
    slug: "watches",
    desc: "Luxury timepieces",
    total_products: 24,
    hasSubcategories: true,
    description:
      "Discover the finest watch collection, meticulously curated for the discerning collector. Each timepiece reflects Swiss precision and refined elegance.",
  },
  {
    id: 2,
    name: "Fine Jewelry",
    slug: "bijouterie",
    desc: "Premium precious jewelry",
    total_products: 18,
    hasSubcategories: true,
    description:
      "From diamond necklaces to signet rings — our jewelry collection is crafted from the world's finest gemstones and precious metals.",
  },
  {
    id: 3,
    name: "Handbags",
    slug: "accessories",
    desc: "Premium leather bags",
    total_products: 12,
    hasSubcategories: true,
    description:
      "From velvet evening clutches to executive briefcases — our bag collection merges functionality with luxury craftsmanship.",
  },
  {
    id: 4,
    name: "Fine Art",
    slug: "fine-art",
    desc: "Exclusive art collection",
    total_products: 9,
    hasSubcategories: false,
    description:
      "A curated selection of original works and limited-edition prints from celebrated contemporary artists.",
  },
  {
    id: 5,
    name: "Winter Collection",
    slug: "winter-collection",
    desc: "Seasonal luxury items",
    total_products: 14,
    hasSubcategories: true,
    description:
      "Wrap yourself in warmth and luxury. Our winter collection is crafted from the finest cashmere, wool, and exotic furs.",
  },
  {
    id: 6,
    name: "Burgundy Room",
    slug: "burgundy-room",
    desc: "Curated premium pieces",
    total_products: 7,
    hasSubcategories: false,
    description:
      "An intimate selection of our most exceptional pieces — each one a statement of absolute luxury.",
  },
];

export default function ExploreCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <section className="py-20 px-6 md:px-[6%]">
        <div className="text-center mb-14">
          <h2 className="text-4xl tracking-wide font-[Bastoni]">Explore Categories</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer group transition-all duration-300 hover:-translate-y-1 w-full max-w-[380px]"
            >
              {/* Thin Gold Border */}
              <div className="p-[2.5px] rounded-sm bg-gradient-to-r from-[#b8964c] via-[#e0c78a] to-[#b8964c] hover:bg-gradient-to-r hover:from-[#ffd058] hover:via-[#ffca56] hover:to-[#ffe2a4]">
                {/* Card */}
                <div className="bg-[#3d1613] group-hover:bg-[#32110f] transition-all duration-300 rounded-sm w-full min-h-[180px] md:min-h-[200px] flex flex-col justify-center items-center shadow-md shadow-[#4c302f8a] text-center px-6 group-hover:shadow-lg font-[cormorant-garamond]">
                  <h3 className="text-[#F5F1E8] text-2xl md:text-3xl tracking-wide mb-3">
                    {category.name}
                  </h3>

                  <div className="w-16 h-[1px] bg-[#C6A75D] mb-3"></div>

                  <p className="text-[#e8ddd0] text-sm tracking-wide">{category.desc}</p>

                  <span className="text-[#d2b88c] text-xs mt-2">{category.total_products} items</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedCategory && (
        <CategoryIntroModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
}
