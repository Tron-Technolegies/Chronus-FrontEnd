import { IoLogoWhatsapp } from "react-icons/io";
import { useState, useEffect } from "react";

export default function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const WA_NUMBER = "971569778080";
  const WA_MESSAGE = encodeURIComponent(
    "Hello,\n\nI would like to know more about Chronos Gallery products and services.\n\nThank you.",
  );
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
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        position: "fixed",
        bottom: "28px",
        right: isMobile ? "8px" : "24px",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "50px",

        padding: isMobile ? "12px" : hovered ? "12px 20px 12px 16px" : "14px",

        boxShadow: "0 6px 24px rgba(37,211,102,0.45)",
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        overflow: "hidden",
        whiteSpace: "nowrap",

        maxWidth: isMobile ? "48px" : hovered ? "220px" : "52px",
      }}
    >
      <IoLogoWhatsapp size={24} style={{ flexShrink: 0 }} />

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
          Chat with us
        </span>
      )}

      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70%  { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
      `}</style>
    </a>
  );
}
