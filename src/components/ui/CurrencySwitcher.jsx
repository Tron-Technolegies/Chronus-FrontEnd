import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const CURRENCIES = ["USD", "AED", "EUR", "GBP", "INR", "CAD", "AUD", "JPY", "CHF"];

const CurrencySwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currency = localStorage.getItem("currency") || "USD";

  const handleChange = (cur) => {
    localStorage.setItem("currency", cur);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:border-gray-400 hover:text-gray-300 transition-all"
      >
        <span>{currency}</span>
        <IoChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-24 max-h-60 overflow-y-auto rounded-md border border-gray-500 bg-white shadow-lg scrollbar-hide">
          {CURRENCIES.map((cur) => (
            <button
              key={cur}
              onClick={() => handleChange(cur)}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
                currency === cur ? "bg-gray-50 font-semibold text-black" : "text-gray-700"
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySwitcher;
