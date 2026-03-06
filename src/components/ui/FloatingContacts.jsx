import { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function FloatingContacts() {
  const [open, setOpen] = useState(false); // desktop visible by default
  const [isMobile, setIsMobile] = useState(false);
  const WA_NUMBER = "971569778080";
  const WA_MESSAGE = encodeURIComponent(
    "Hello,\n\nI would like to know more about Chronos Gallery products and services.\n\nThank you.",
  );
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      setOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    position: "fixed",
    bottom: isMobile ? "20px" : "60px",
    right: "0",
    zIndex: 999,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const buttonGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "all 0.3s ease",
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    transform: open ? "translateX(0)" : "translateX(-120%)",
    marginRight: isMobile && open ? "12px" : "0",
  };

  const iconBaseStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  };

  const toggleButtonStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#89170f",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  };

  return (
    <div style={containerStyle}>
      {/* Contact Icons */}
      <div style={buttonGroupStyle}>
        <a
          href="https://instagram.com/chronos_ae"
          target="_blank"
          rel="noreferrer"
          style={{
            ...iconBaseStyle,
            background: "linear-gradient(135deg,#405DE6,#833AB4,#E1306C,#FCAF45)",
          }}
        >
          <FaInstagram size={24} />
        </a>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
          target="_blank"
          rel="noreferrer"
          style={{ ...iconBaseStyle, background: "#25D366" }}
        >
          <IoLogoWhatsapp size={26} />
        </a>
      </div>

      {/* Toggle Button - only on mobile */}
      {isMobile && (
        <button onClick={() => setOpen(!open)} style={toggleButtonStyle}>
          {open ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      )}
    </div>
  );
}
