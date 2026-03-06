import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubcategorySelectModal = ({ categorySlug, categoryName, subcategories, onClose }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (type) => {
    onClose();
    navigate(`/shop?category=${categorySlug}&type=${type}`);
  };

  const handleViewAll = () => {
    onClose();
    navigate(`/shop?category=${categorySlug}`);
  };

  const hisEntry = subcategories.find(
    (s) => s.slug?.toLowerCase().includes("his") || s.name?.toLowerCase().includes("his"),
  );

  const herEntry = subcategories.find(
    (s) => s.slug?.toLowerCase().includes("her") || s.name?.toLowerCase().includes("her"),
  );

  const showHis = hisEntry || subcategories.length > 0;
  const showHer = herEntry || subcategories.length > 0;
  const cardWrapperClass =
    "cursor-pointer group transition-all duration-300 hover:-translate-y-1 w-full";
  const cardBorderClass =
    "p-[2.5px] rounded-sm bg-gradient-to-r from-[#b8964c] via-[#e0c78a] to-[#b8964c] hover:bg-gradient-to-r hover:from-[#ffd058] hover:via-[#ffca56] hover:to-[#ffe2a4]";
  const cardBodyClass =
    "bg-[#3d1613] group-hover:bg-[#32110f] transition-all duration-300 rounded-sm w-full min-h-[130px] sm:min-h-[150px] flex flex-col justify-center items-center shadow-md shadow-[#4c302f8a] text-center px-3 sm:px-6 group-hover:shadow-lg font-[cormorant-garamond]";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(14px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          color: "rgba(255,255,255,0.7)",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        X
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "640px",
          textAlign: "center",
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Heading */}
        <p
          style={{
            color: "#C6A75D",
            fontSize: "10px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontFamily: "inter",
          }}
        >
          {categoryName}
        </p>

        <h2
          style={{
            color: "#F5F1E8",
            fontSize: "36px",
            letterSpacing: "0.04em",
            fontFamily: "cormorant-garamond",
            fontWeight: 400,
            marginBottom: "12px",
          }}
        >
          Shop by Collection
        </h2>

        {/* Divider */}
        <div
          style={{
            width: "56px",
            height: "1px",
            background: "linear-gradient(to right, transparent, #C6A75D, transparent)",
            margin: "0 auto 36px",
          }}
        />

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-[500px] mx-auto px-1">
          {showHis && (
            <div
              onClick={() => handleSelect("his")}
              className={cardWrapperClass}
            >
              <div className={cardBorderClass}>
                <div className={cardBodyClass}>
                  <h3 className="text-[#F5F1E8] text-xl sm:text-2xl md:text-3xl tracking-wide mb-2 sm:mb-3">
                    His Collection
                  </h3>

                  <div className="w-10 sm:w-16 h-[1px] bg-[#C6A75D] mb-2 sm:mb-3"></div>

                  <p className="text-[#e8ddd0] text-xs sm:text-sm tracking-wide">Explore</p>
                </div>
              </div>
            </div>
          )}

          {showHer && (
            <div
              onClick={() => handleSelect("her")}
              className={cardWrapperClass}
            >
              <div className={cardBorderClass}>
                <div className={cardBodyClass}>
                  <h3 className="text-[#F5F1E8] text-xl sm:text-2xl md:text-3xl tracking-wide mb-2 sm:mb-3">
                    Her Collection
                  </h3>

                  <div className="w-10 sm:w-16 h-[1px] bg-[#C6A75D] mb-2 sm:mb-3"></div>

                  <p className="text-[#e8ddd0] text-xs sm:text-sm tracking-wide">Explore</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Skip */}
        <button
          onClick={handleViewAll}
          style={{
            marginTop: "28px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            cursor: "pointer",
            fontFamily: "inter",
          }}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default SubcategorySelectModal;
