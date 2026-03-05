import { FaInstagram } from "react-icons/fa";
import { useState } from "react";

export default function InstagramFloat() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <a
        href="https://instagram.com/chronos_ae"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit our Instagram"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          bottom: "100px",
          right: "24px",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background:
            "linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #FCAF45)",
          color: "#fff",
          borderRadius: "50px",
          padding: hovered ? "12px 20px 12px 16px" : "14px",
          textDecoration: "none",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: hovered ? "220px" : "52px",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: hovered
            ? "0 8px 30px rgba(225,48,108,0.6)"
            : "0 6px 20px rgba(131,58,180,0.45)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <FaInstagram size={24} style={{ flexShrink: 0 }} />

        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
            letterSpacing: "0.02em",
          }}
        >
          Checkout our Updates
        </span>
      </a>

      <style>{`
        @keyframes ig-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(225,48,108,0.5); }
          70%  { box-shadow: 0 0 0 16px rgba(225,48,108,0); }
          100% { box-shadow: 0 0 0 0 rgba(225,48,108,0); }
        }
      `}</style>
    </>
  );
}
