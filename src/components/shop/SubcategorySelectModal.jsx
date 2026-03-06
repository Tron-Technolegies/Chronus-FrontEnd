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

  const hisEntry = subcategories.find(
    (s) => s.slug?.toLowerCase().includes("his") || s.name?.toLowerCase().includes("his"),
  );

  const herEntry = subcategories.find(
    (s) => s.slug?.toLowerCase().includes("her") || s.name?.toLowerCase().includes("her"),
  );

  const showHis = hisEntry || subcategories.length > 0;
  const showHer = herEntry || subcategories.length > 0;

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
        ✕
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
        <div className="flex gap-6 justify-center flex-wrap">
          {/* HIS */}
          {showHis && (
            <div
              onClick={() => handleSelect("his")}
              className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="p-[2.5px] rounded-sm bg-gradient-to-r from-[#b8964c] via-[#e0c78a] to-[#b8964c] group-hover:from-[#ffd058] group-hover:via-[#ffca56] group-hover:to-[#ffe2a4] transition-all duration-300">
                <div className="bg-[#3d1613] group-hover:bg-[#32110f] rounded-sm min-h-[180px] flex flex-col items-center justify-center px-6 py-8 gap-3 transition-colors duration-300">
                  <h3
                    style={{
                      color: "#F5F1E8",
                      fontSize: "24px",
                      letterSpacing: "0.06em",
                      fontFamily: "cormorant-garamond",
                      fontWeight: 400,
                    }}
                  >
                    His Collection
                  </h3>

                  <div className="w-10 h-[1px] bg-[#C6A75D]" />

                  <span
                    style={{
                      color: "#d2b88c",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "inter",
                    }}
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* HER */}
          {showHer && (
            <div
              onClick={() => handleSelect("her")}
              className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="p-[2.5px] rounded-sm bg-gradient-to-r from-[#b8964c] via-[#e0c78a] to-[#b8964c] group-hover:from-[#ffd058] group-hover:via-[#ffca56] group-hover:to-[#ffe2a4] transition-all duration-300">
                <div className="bg-[#3d1613] group-hover:bg-[#32110f] rounded-sm min-h-[180px] flex flex-col items-center justify-center px-6 py-8 gap-3 transition-colors duration-300">
                  <h3
                    style={{
                      color: "#F5F1E8",
                      fontSize: "24px",
                      letterSpacing: "0.06em",
                      fontFamily: "cormorant-garamond",
                      fontWeight: 400,
                    }}
                  >
                    Her Collection
                  </h3>

                  <div className="w-10 h-[1px] bg-[#C6A75D]" />

                  <span
                    style={{
                      color: "#d2b88c",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "inter",
                    }}
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Skip */}
        <button
          onClick={onClose}
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
