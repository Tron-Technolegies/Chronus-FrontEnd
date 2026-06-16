import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoChevronDown } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLang = i18n.language?.startsWith("ar") ? "العربية" : "English";

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:border-gray-400 hover:text-gray-300 transition-all"
      >
        <MdLanguage size={18} />
        <span>{currentLang}</span>
        <IoChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-40 rounded-md border border-gray-500 bg-white  shadow-lg">
          <button
            onClick={() => changeLanguage("en")}
            className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
              !i18n.language.startsWith("ar")
                ? "bg-gray-50 rounded-md font-semibold text-black"
                : "text-gray-700 rounded-md"
            }`}
          >
            🇺🇸 English
          </button>

          <button
            onClick={() => changeLanguage("ar")}
            className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
              i18n.language.startsWith("ar")
                ? "bg-gray-50 rounded-md font-semibold text-black"
                : "text-gray-700 rounded-md"
            }`}
          >
            🇸🇦 العربية
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
