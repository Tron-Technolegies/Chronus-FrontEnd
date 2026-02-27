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
          <span className="block text-[11px] tracking-[1.5px] text-[#181817] mb-3 uppercase">
            OUR COLLECTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-normal text-black font-[Bastoni]">
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {Array.isArray(categories) &&
            categories.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedCategory(item)}
                className="relative rounded-[28px] overflow-hidden cursor-pointer group"
                style={{
                  height: "280px",
                  background:
                    "linear-gradient(160deg, #0d1021 0%, #111528 40%, #3d0a14 75%, #6b0f1a 100%)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.025)";
                  e.currentTarget.style.boxShadow =
                    "0 28px 70px rgba(0,0,0,0.45), 0 6px 20px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)";
                }}
              >
                {/* Bottom radial glow */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: "60%",
                    background:
                      "radial-gradient(ellipse at 40% 130%, rgba(180,20,40,0.6) 0%, transparent 70%)",
                  }}
                />

                {/* Top fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%)",
                  }}
                />

                {/* ✦ Badge — top left */}
                <div
                  className="absolute z-10 flex items-center justify-center"
                  style={{
                    top: "22px",
                    left: "22px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "15px" }}>✦</span>
                </div>

                {/* Product image — floats to the right */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute pointer-events-none object-contain"
                    style={{
                      width: "55%",
                      height: "85%",
                      right: "-4%",
                      top: "-5%",
                      filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.5))",
                      transform: "rotate(-2deg)",
                      transition: "transform 0.4s ease",
                      zIndex: 2,
                    }}
                  />
                )}

                {/* Text — bottom left */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 p-6"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                  }}
                >
                  <h3
                    className="text-white font-semibold mb-1"
                    style={{ fontSize: "24px", lineHeight: 1.25, letterSpacing: "-0.3px" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-sm leading-snug line-clamp-1 mb-4"
                    style={{ color: "rgba(255,255,255,0.55)", maxWidth: "60%" }}
                  >
                    {item.description ||
                      "Discover our exclusive collection of premium products."}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-semibold tracking-wide"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {item.product_count != null ? `${item.product_count} items` : "Explore"}
                    </span>
                    <span
                      className="text-xl transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: "rgba(255,255,255,0.65)" }}
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
