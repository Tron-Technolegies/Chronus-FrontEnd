import { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function FloatingContacts() {
  const [isMobile, setIsMobile] = useState(false);
  const WA_NUMBER = "971569778080";
  const WA_MESSAGE = encodeURIComponent(
    "Hello,\n\nI would like to know more about Chronos Gallery products and services.\n\nThank you.",
  );
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    position: "fixed",
    bottom: isMobile ? "20px" : "60px",
    right: isMobile ? "10px" : "0",
    zIndex: 999,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const buttonGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "12px" : "12px",
    transition: "all 0.3s ease",
    marginRight: "0",
  };

  const iconBaseStyle = {
    width: isMobile ? "40px" : "48px",
    height: isMobile ? "40px" : "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
          <FaInstagram size={isMobile ? 20 : 24} />
        </a>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
          target="_blank"
          rel="noreferrer"
          style={{ ...iconBaseStyle, background: "#25D366" }}
        >
          <IoLogoWhatsapp size={isMobile ? 22 : 26} />
        </a>
      </div>
    </div>
  );
}
