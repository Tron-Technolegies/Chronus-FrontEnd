import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function InstagramFloat() {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <a
      href="https://instagram.com/chronos_ae"
      target="_blank"
      rel="noreferrer"
      aria-label="Visit our Instagram"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        position: "fixed",
        bottom: isMobile ? "80px" : "100px",
        right: isMobile ? "8px" : "24px",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "10px",

        background:
          "linear-gradient(135deg,#405DE6,#5851DB,#833AB4,#C13584,#E1306C,#FD1D1D,#F56040,#FCAF45)",

        color: "#fff",
        borderRadius: "50px",

        padding: isMobile ? "12px" : hovered ? "12px 20px 12px 16px" : "14px",

        textDecoration: "none",
        overflow: "hidden",
        whiteSpace: "nowrap",

        maxWidth: isMobile ? "48px" : hovered ? "220px" : "52px",

        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",

        boxShadow: hovered ? "0 8px 30px rgba(225,48,108,0.6)" : "0 6px 20px rgba(131,58,180,0.45)",

        transform: hovered && !isMobile ? "scale(1.05)" : "scale(1)",
      }}
    >
      <FaInstagram size={22} style={{ flexShrink: 0 }} />

      {!isMobile && (
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
      )}
    </a>
  );
}
