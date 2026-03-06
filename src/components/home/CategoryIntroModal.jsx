import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryIntroModal = ({ category, onClose, onExplore }) => {
  const navigate = useNavigate();

  if (!category) return null;

  const handleExplore = () => {
    if (onExplore) {
      onExplore(category);
      return;
    }
    onClose();
    navigate(`/shop?category=${category.id ?? category.slug}`);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(0,0,0,0.4)",
      }}
      onClick={handleBackdrop}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-3xl flex overflow-hidden"
        style={{
          borderRadius: "4px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.2)",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition text-sm bg-white/80 rounded-full"
          aria-label="Close"
        >
          ✕
        </button>

        {/* LEFT — decorative panel */}
        <div className="w-[42%] shrink-0 hidden sm:flex">
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{
              background:
                "linear-gradient(160deg, #0d1021 0%, #111528 40%, #3d0a14 75%, #6b0f1a 100%)",
              minHeight: "360px",
            }}
          >
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "48px" }}>✦</span>
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    padding: "0 24px",
                    fontFamily: "inter, sans-serif",
                  }}
                >
                  {category.name}
                </p>
              </>
            )}
          </div>
        </div>

        {/* RIGHT — text panel */}
        <div
          className="flex-1 flex flex-col justify-center overflow-y-auto"
          style={{ background: "#ffffff", padding: "44px 40px" }}
        >
          {/* Title */}
          <h2
            style={{
              fontSize: "30px",
              letterSpacing: "0.04em",
              color: "#1a0a0a",
              marginBottom: "14px",
              fontFamily: "cormorant-garamond, serif",
              fontWeight: 400,
            }}
          >
            {category.name}
          </h2>

          {/* Gold rule */}
          <div
            style={{
              width: "44px",
              height: "1px",
              background: "linear-gradient(to right, #b8964c, #e0c78a)",
              marginBottom: "22px",
            }}
          />

          {/* Description */}
          <p
            style={{
              color: "#555",
              fontSize: "13px",
              lineHeight: "1.9",
              letterSpacing: "0.06em",
              marginBottom: "36px",
              fontFamily: "inter, sans-serif",
            }}
          >
            {category.description?.trim()
              ? category.description
              : `Discover the finest ${category.name} collection, meticulously curated for the discerning collector. Each piece reflects timeless craftsmanship and refined elegance.`}
          </p>

          <button
            onClick={handleExplore}
            style={{
              alignSelf: "flex-start",
              background: "#F5C518",
              padding: "12px 32px",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontFamily: "inter, sans-serif",
            }}
          >
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryIntroModal;
