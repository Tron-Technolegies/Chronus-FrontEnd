import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/product";
import CategoryIntroModal from "./CategoryIntroModal";

const ExploreCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <section className="bg-white py-16 md:py-24 px-4 sm:px-6 md:px-[6%] font-sans">
        <div className="text-center mb-10 md:mb-14">
          <span className="block text-[11px] tracking-[1.5px] text-[#181817] mb-3 uppercase inter">
            OUR COLLECTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-black font-[Bastoni]">
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {Array.isArray(categories) &&
            categories.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedCategory(item)}
                className="relative rounded-[28px] overflow-hidden cursor-pointer w-full
                           transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  height: "240px",
                  background:
                    "linear-gradient(160deg, #0d1021 0%, #111528 40%, #3d0a14 75%, #6b0f1a 100%)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)",
                  padding: "24px",
                }}
              >
                {/* Bottom glow */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: "55%",
                    background:
                      "radial-gradient(ellipse at 50% 120%, rgba(180,20,40,0.55) 0%, transparent 70%)",
                  }}
                />

                {/* Top vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%)",
                  }}
                />

                {/* Badge */}
                <div
                  className="absolute flex items-center justify-center z-10"
                  style={{
                    top: "20px",
                    left: "20px",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <span style={{ color: "white", fontSize: "16px", lineHeight: 1 }}>✦</span>
                </div>

                {/* Image — fixed to right side */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute object-contain pointer-events-none z-[5]
                               transition-transform duration-500 group-hover:scale-105"
                    style={{
                      width: "52%",
                      height: "100%",
                      top: "-5%",
                      right: "-10%",
                      filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.55))",
                    }}
                  />
                )}

                {/* Text content */}
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="mb-auto pt-14">
                    <h3
                      className="text-white font-semibold mb-2"
                      style={{ fontSize: "26px", lineHeight: 1.2, letterSpacing: "-0.3px" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.6)", maxWidth: "55%" }}
                    >
                      {item.description ||
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <span
                      className="text-sm font-semibold tracking-wide"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {item.product_count != null ? `${item.product_count} items` : "Explore"}
                    </span>
                    <span
                      className="text-xl leading-none"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      →
                    </span>
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
};

export default ExploreCategories;
