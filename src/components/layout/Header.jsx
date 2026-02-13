import React, { useState } from "react";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${isHome ? "bg-transparent" : "bg-black"}
        backdrop-blur-md text-white`}
      style={{ height: "64px" }}
    >
      {/* DESKTOP */}
      <div className="hidden md:flex w-full px-10 h-full items-center justify-between">
        <nav className="flex items-center gap-10 text-sm font-medium">
          <a className="text-red-500 hover:text-red-400" href="#">Collections</a>
          <a className="hover:text-gray-300" href="#">Timepieces</a>
          <a className="hover:text-gray-300" href="#">Accessories</a>
          <a className="hover:text-gray-300" href="#">Fine Art</a>
        </nav>

        <img src="/chronus-logo.png" alt="Chronos" className="h-4" />

        <div className="flex items-center gap-6 relative">
          <div
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <HiOutlineGlobeAlt />
            English
          </div>

          {langOpen && (
            <div className="absolute right-20 top-10 bg-white text-black rounded-md w-32">
              {["English", "Arabic", "French", "German"].map((lang) => (
                <button
                  key={lang}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {lang}
                </button>
              ))}
            </div>
          )}

          <FiSearch />
          <FiShoppingBag />
          <FiUser />
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center justify-between px-5 h-full">
        <button onClick={() => setMenuOpen(true)}>
          <FiMenu size={22} />
        </button>

        <img src="/chronus-logo.png" alt="Chronos" className="h-3" />
        <FiShoppingBag size={20} />
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-50">
          <div className="bg-black text-white w-4/5 h-full p-6">
            <div className="flex justify-between mb-8">
              <img src="/chronus-logo.png" alt="Chronos" className="h-3" />
              <FiX size={22} onClick={() => setMenuOpen(false)} />
            </div>

            <nav className="flex flex-col gap-6 text-lg">
              {["Collections", "Timepieces", "Accessories", "Fine Art"].map(
                (item) => (
                  <a key={item} href="#" className="border-b border-white/20 pb-2">
                    {item}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
