import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryIntroModal = ({ category, onClose }) => {
  const navigate = useNavigate();

  if (!category) return null;

  const handleExplore = () => {
    onClose();
    navigate(`/shop?category=${category.id}`);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    /* Full-screen backdrop with backdrop-blur — no dark overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", background: "rgba(255,255,255,0.15)" }}
      onClick={handleBackdrop}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-3xl flex overflow-hidden"
        style={{
          borderRadius: "4px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
          maxHeight: "90vh",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition text-sm bg-white/80 rounded-full"
          aria-label="Close"
        >
          ✕
        </button>

        {/* LEFT — image (40% width) */}
        <div className="w-[42%] shrink-0 relative bg-gray-100 overflow-hidden">
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(160deg, #0d1021 0%, #111528 40%, #3d0a14 75%, #6b0f1a 100%)",
                minHeight: "340px",
              }}
            >
              <span className="text-white/30 text-5xl">✦</span>
            </div>
          )}
        </div>

        {/* RIGHT — text panel */}
        <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10 sm:px-10 sm:py-12">
          {/* Description in all-caps tracking style */}
          <p
            className="text-gray-800 text-xs sm:text-sm leading-7 tracking-[0.12em] uppercase font-medium mb-8"
            style={{ fontFamily: "inter, sans-serif" }}
          >
            {category.description?.trim()
              ? category.description
              : `Discover the finest ${category.name} collection, meticulously curated for the discerning collector. Each piece reflects timeless craftsmanship and refined elegance.`}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <button
              onClick={handleExplore}
              className="bg-[#F5C518] hover:brightness-95 transition px-7 py-3 text-xs tracking-[0.2em] uppercase font-semibold"
            >
              Explore Products
            </button>
            <button
              onClick={onClose}
              className="text-xs tracking-widest text-gray-400 hover:text-black transition uppercase underline underline-offset-4"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryIntroModal;
