import React, { useState, useEffect } from "react";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const HEADER_COLOR = "#3D1613";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setOpen } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 h-16 transition-colors duration-300 text-white"
      style={{
        backgroundColor: isHome && !scrolled ? "transparent" : HEADER_COLOR,
      }}
    >
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex relative h-full px-10 items-center">
        {/* Left */}
        <nav className="flex gap-10 text-sm font-medium tracking-wide">
          <button onClick={() => navigate("/shop")} className="hover:text-gray-300">
            Collections
          </button>
          <button onClick={() => navigate("/shop")} className="hover:text-gray-300">
            Timepieces
          </button>
          <button onClick={() => navigate("/shop")} className="hover:text-gray-300">
            Accessories
          </button>
          <button onClick={() => navigate("/shop")} className="hover:text-gray-300">
            Fine Art
          </button>
        </nav>

        {/* CENTER LOGO */}
        <img
          src="/chronus-logo.png"
          alt="Chronos"
          className="h-4 object-contain cursor-pointer absolute left-1/2 -translate-x-1/2"
          onClick={() => navigate("/")}
        />

        {/* Right */}
        <div className="ml-auto flex items-center gap-6">
          {/* <FiShoppingBag
            size={18}
            className="cursor-pointer hover:text-gray-300"
            onClick={() => navigate("/shop")}
          /> */}
          <button onClick={() => setOpen(true)}>
            <FiShoppingBag size={18} className="cursor-pointer hover:text-gray-300" />
          </button>
          <FiUser
            size={18}
            className="cursor-pointer hover:text-gray-300"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden relative flex h-full items-center px-4">
        {/* Left */}
        <button onClick={() => setMenuOpen(true)}>
          <FiMenu size={24} />
        </button>

        {/* CENTER LOGO */}
        <img
          src="/chronus-logo.png"
          alt="Chronos"
          className="h-4 object-contain cursor-pointer absolute left-1/2 -translate-x-1/2"
          onClick={() => handleNavigate("/")}
        />

        {/* Right */}
        <div className="ml-auto">
          <FiShoppingBag
            size={18}
            className="cursor-pointer"
            onClick={() => handleNavigate("/shop")}
          />
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 text-white" style={{ backgroundColor: HEADER_COLOR }}>
          <div className="flex items-center justify-end px-6 h-16 border-b border-white/10">
            <button onClick={() => setMenuOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          <nav className="px-6 pt-8 flex flex-col gap-8 text-xl font-medium">
            <button
              onClick={() => handleNavigate("/shop")}
              className="text-left border-b border-white/15 pb-4"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavigate("/shop")}
              className="text-left border-b border-white/15 pb-4"
            >
              Timepieces
            </button>
            <button
              onClick={() => handleNavigate("/shop")}
              className="text-left border-b border-white/15 pb-4"
            >
              Accessories
            </button>
            <button
              onClick={() => handleNavigate("/shop")}
              className="text-left border-b border-white/15 pb-4"
            >
              Fine Art
            </button>
          </nav>

          <div className="absolute bottom-8 left-6 right-6 flex justify-between opacity-80">
            <FiSearch size={20} />
            <FiUser size={18} className="cursor-pointer" onClick={() => handleNavigate("/login")} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
