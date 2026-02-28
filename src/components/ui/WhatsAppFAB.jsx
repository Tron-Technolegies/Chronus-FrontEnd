import React, { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";

const WA_NUMBER = "971569778080"; // no + sign for wa.me
const WA_MESSAGE = encodeURIComponent(
  "Hello,\n\nI would like to know more about Chronos Gallery products and services.\n\nThank you."
);

export default function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "24px",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "50px",
        padding: hovered ? "12px 20px 12px 16px" : "14px",
        boxShadow: "0 6px 24px rgba(37,211,102,0.45)",
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        overflow: "hidden",
        maxWidth: hovered ? "220px" : "52px",
        whiteSpace: "nowrap",
      }}
    >
      <IoLogoWhatsapp size={24} style={{ flexShrink: 0 }} />
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

      {/* Pulse ring */}
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
