import React, { useState, useEffect } from "react";
import { FiUser, FiShoppingBag, FiMenu, FiX, FiHeart } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const HEADER_COLOR = "#3D1613";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setOpen } = useCart();
  const { wishlist } = useWishlist();

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

  const navLinks = [
    { label: "Collections", path: "/shop" },
    { label: "Timepieces", path: "/shop" },
    { label: "Accessories", path: "/shop" },
    { label: "Fine Art", path: "/shop" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 h-16 transition-all duration-300 text-white"
      style={{
        backgroundColor: isHome && !scrolled ? "transparent" : HEADER_COLOR,
      }}
    >
      <div className="hidden md:flex relative h-full px-6 lg:px-10 items-center">
        {/* Left nav */}
        <nav className="flex gap-5 lg:gap-10 text-xs lg:text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="hover:text-gray-300 transition-colors whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Center logo */}
        <img
          src="/chronus-logo.png"
          alt="Chronos"
          className="h-4 object-contain cursor-pointer absolute left-1/2 -translate-x-1/2"
          onClick={() => navigate("/")}
        />

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-5 lg:gap-6">
          {/* Wishlist */}
          <button onClick={() => navigate("/wishlist")} className="relative">
            <FiHeart size={18} className="hover:text-gray-300 transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#FFCA0A] text-black text-[8px] font-bold flex items-center justify-center">
                {wishlist.length > 9 ? "9+" : wishlist.length}
              </span>
            )}
          </button>
          {/* Cart */}
          <button onClick={() => setOpen(true)}>
            <FiShoppingBag size={18} className="hover:text-gray-300 transition-colors" />
          </button>
          {/* User */}
          <FiUser
            size={18}
            className="hover:text-gray-300 transition-colors"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden relative flex h-full items-center px-4">
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(true)} className="p-1">
          <FiMenu size={22} />
        </button>

        {/* Center logo */}
        <img
          src="/chronus-logo.png"
          alt="Chronos"
          className="h-4 object-contain cursor-pointer absolute left-1/2 -translate-x-1/2"
          onClick={() => handleNavigate("/")}
        />

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-3">
          {/* Wishlist */}
          <button onClick={() => handleNavigate("/wishlist")} className="relative p-1">
            <FiHeart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#FFCA0A] text-black text-[7px] font-bold flex items-center justify-center">
                {wishlist.length > 9 ? "9+" : wishlist.length}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(true)} className="p-1">
            <FiShoppingBag size={18} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col text-white"
          style={{ backgroundColor: HEADER_COLOR }}
        >
          {/* Menu top bar */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
            <img src="/chronus-logo.png" alt="Chronos" className="h-4 object-contain" />
            <button onClick={() => setMenuOpen(false)} className="p-1">
              <FiX size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-6 pt-8 flex flex-col gap-0 text-lg font-medium overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavigate(link.path)}
                className="text-left py-5 border-b border-white/10 hover:text-yellow-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
            {/* Wishlist link in menu */}
            <button
              onClick={() => handleNavigate("/wishlist")}
              className="text-left py-5 border-b border-white/10 flex items-center gap-3 hover:text-yellow-400 transition-colors"
            >
              <FiHeart size={18} />
              Wishlist
              {wishlist.length > 0 && (
                <span className="ml-1 text-xs bg-[#FFCA0A] text-black rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>
          </nav>

          {/* Bottom icons row */}
          <div className="px-6 py-6 flex items-center justify-between border-t border-white/10 shrink-0">
            <button
              onClick={() => handleNavigate("/login")}
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
            >
              <FiUser size={18} />
              <span>Account</span>
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                setOpen(true);
              }}
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
            >
              <FiShoppingBag size={18} />
              <span>Cart</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
