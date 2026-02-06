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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          isHome
            ? "bg-transparent"
            : "bg-[var(--primary-color)]"
        } text-white`}
    >
      {/* DESKTOP */}
      <div className="hidden md:flex w-full px-10 h-16 items-center justify-between">
        <nav className="flex items-center gap-10 text-sm inter font-medium">
          <a className="text-red-500 hover:text-red-400" href="#">
            Collections
          </a>
          <a className="hover:text-gray-300" href="#">Timepieces</a>
          <a className="hover:text-gray-300" href="#">Accessories</a>
          <a className="hover:text-gray-300" href="#">Fine Art</a>
        </nav>

        <img
          src="/chronus-logo.png"
          alt="Chronos"
          className="h-4 object-contain"
        />

        <div className="flex items-center gap-6 relative">
          <div
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 text-sm cursor-pointer"
          >
            <HiOutlineGlobeAlt />
            English
          </div>

          {langOpen && (
            <div className="absolute right-20 top-10 bg-white text-black rounded-md shadow-lg w-32 text-sm">
              {["English", "Arabic", "French", "German"].map((lang) => (
                <button
                  key={lang}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {lang}
                </button>
              ))}
            </div>
          )}

          <FiSearch className="cursor-pointer" />
          <FiShoppingBag className="cursor-pointer" />
          <FiUser className="cursor-pointer" />
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center justify-between px-5 h-14">
        <button onClick={() => setMenuOpen(true)}>
          <FiMenu size={22} />
        </button>

        <img src="/chronus-logo.png" alt="Chronos" className="h-3" />

        <FiShoppingBag size={20} />
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-50">
          <div className="bg-[var(--primary-color)] text-white w-4/5 max-w-sm h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <img src="/chronus-logo.png" alt="Chronos" className="h-3" />
              <FiX size={22} onClick={() => setMenuOpen(false)} />
            </div>

            <nav className="flex flex-col gap-6 text-lg">
              {["Collections", "Timepieces", "Accessories", "Fine Art"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="border-b border-white/20 pb-2"
                  >
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
