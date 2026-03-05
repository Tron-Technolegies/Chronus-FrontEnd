import React, { useEffect, useState } from "react";


const CollectionIntroModal = ({ typeLabel, onClose }) => {
  const [visible, setVisible] = useState(false);

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  // Auto-dismiss after 3 s
  useEffect(() => {
    const t = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isHis = typeLabel?.toLowerCase().includes("his");

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
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
        }}
      >
        {/* Gold border wrapper */}
        <div
          style={{
            padding: "2.5px",
            background: "linear-gradient(135deg, #b8964c 0%, #e0c78a 50%, #b8964c 100%)",
          }}
        >
          {/* Burgundy body */}
          <div
            style={{
              background: "linear-gradient(160deg, #1a0608 0%, #2d0d10 40%, #3d1613 100%)",
              padding: "48px 40px 40px",
              textAlign: "center",
            }}
          >
            {/* Decorative symbol */}
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  fontSize: "36px",
                  color: "#C6A75D",
                  display: "block",
                  lineHeight: 1,
                }}
              >
              </span>
            </div>

            {/* Label */}
            <p
              style={{
                color: "#C6A75D",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "12px",
                fontFamily: "inter, sans-serif",
              }}
            >
              Welcome to
            </p>

            <h2
              style={{
                color: "#F5F1E8",
                fontSize: "34px",
                letterSpacing: "0.05em",
                marginBottom: "16px",
                fontFamily: "cormorant-garamond, serif",
                fontWeight: 400,
              }}
            >
              {typeLabel}
            </h2>

            {/* Gold divider */}
            <div
              style={{
                width: "60px",
                height: "1px",
                background: "linear-gradient(to right, transparent, #C6A75D, transparent)",
                margin: "0 auto 20px",
              }}
            />

            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "12px",
                letterSpacing: "0.12em",
                lineHeight: 1.8,
                fontFamily: "inter, sans-serif",
                marginBottom: "32px",
              }}
            >
              {isHis
                ? "Refined pieces crafted for the modern gentleman."
                : "Elegantly curated selections for the discerning woman."}
            </p>

            {/* CTA button */}
            <button
              onClick={onClose}
              style={{
                display: "inline-block",
                padding: "10px 30px",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#1a0a0a",
                background: "linear-gradient(135deg, #d4a84b 0%, #f0d080 50%, #d4a84b 100%)",
                border: "none",
                cursor: "pointer",
                fontFamily: "inter, sans-serif",
              }}
            >
              Explore Collection
            </button>

            {/* Auto-dismiss hint */}
            <p
              style={{
                marginTop: "16px",
                color: "rgba(255,255,255,0.3)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                fontFamily: "inter, sans-serif",
              }}
            >
              Closes automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionIntroModal;
