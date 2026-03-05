import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const SubcategorySelectModal = ({
  categorySlug,
  categoryName,
  subcategories,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  // Smooth fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (type) => {
    onClose();
    navigate(`/shop?category=${categorySlug}&type=${type}`);
  };

  // Detect His / Her from subcategory slug/name
  const hisEntry = subcategories.find(
    (s) => s.slug?.toLowerCase().includes("his") || s.name?.toLowerCase().includes("his")
  );
  const herEntry = subcategories.find(
    (s) => s.slug?.toLowerCase().includes("her") || s.name?.toLowerCase().includes("her")
  );

  // Determine which types to show. Fall back to generic "his"/"her" if not in subcategories
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Close (skip) button */}
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
        aria-label="Skip — view all"
      >
        ✕
      </button>

      {/* Content wrapper — stop backdrop click propagating */}
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
            fontFamily: "inter, sans-serif",
          }}
        >
          {categoryName}
        </p>

        <h2
          style={{
            color: "#F5F1E8",
            fontSize: "36px",
            letterSpacing: "0.04em",
            fontFamily: "cormorant-garamond, serif",
            fontWeight: 400,
            marginBottom: "12px",
          }}
        >
          Shop by Collection
        </h2>

        {/* Gold divider */}
        <div
          style={{
            width: "56px",
            height: "1px",
            background: "linear-gradient(to right, transparent, #C6A75D, transparent)",
            margin: "0 auto 36px",
          }}
        />

        {/* His + Her cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* HIS */}
          {showHis && (
            <div
              onClick={() => handleSelect("his")}
              className="group"
              style={{
                flex: "1",
                minWidth: "200px",
                maxWidth: "260px",
                cursor: "pointer",
                transition: "transform 0.28s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {/* Gold border */}
              <div
                style={{
                  padding: "2.5px",
                  borderRadius: "3px",
                  background: "linear-gradient(135deg, #b8964c 0%, #e0c78a 50%, #b8964c 100%)",
                  transition: "filter 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
              >
                {/* Burgundy card */}
                <div
                  style={{
                    background: "linear-gradient(160deg, #1a0608 0%, #2d0d10 40%, #3d1613 100%)",
                    borderRadius: "2px",
                    minHeight: "180px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px 24px",
                    gap: "10px",
                  }}
                >
                  <h3
                    style={{
                      color: "#F5F1E8",
                      fontSize: "24px",
                      letterSpacing: "0.06em",
                      fontFamily: "cormorant-garamond, serif",
                      fontWeight: 400,
                    }}
                  >
                    His Collection
                  </h3>
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      background: "#C6A75D",
                    }}
                  />
                  <span
                    style={{
                      color: "#d2b88c",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "inter, sans-serif",
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
              style={{
                flex: "1",
                minWidth: "200px",
                maxWidth: "260px",
                cursor: "pointer",
                transition: "transform 0.28s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {/* Gold border */}
              <div
                style={{
                  padding: "2.5px",
                  borderRadius: "3px",
                  background: "linear-gradient(135deg, #b8964c 0%, #e0c78a 50%, #b8964c 100%)",
                  transition: "filter 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
              >
                {/* Burgundy card */}
                <div
                  style={{
                    background: "linear-gradient(160deg, #1a0608 0%, #2d0d10 40%, #3d1613 100%)",
                    borderRadius: "2px",
                    minHeight: "180px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px 24px",
                    gap: "10px",
                  }}
                >
                  <h3
                    style={{
                      color: "#F5F1E8",
                      fontSize: "24px",
                      letterSpacing: "0.06em",
                      fontFamily: "cormorant-garamond, serif",
                      fontWeight: 400,
                    }}
                  >
                    Her Collection
                  </h3>
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      background: "#C6A75D",
                    }}
                  />
                  <span
                    style={{
                      color: "#d2b88c",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "inter, sans-serif",
                    }}
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Skip link */}
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
            fontFamily: "inter, sans-serif",
          }}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default SubcategorySelectModal;
