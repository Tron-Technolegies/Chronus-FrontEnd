import React from "react";

import { useTranslation } from "react-i18next";

const COLLECTIONS = [
  { key: "all", labelKey: "all" },
  { key: "best-seller", labelKey: "best_sellers" },
  { key: "new", labelKey: "new_arrivals" },
  { key: "featured", labelKey: "featured" },
];

const FiltersSection = ({ collection, setCollection, resetFilters }) => {
  const { t } = useTranslation();
  return (
    <div className="p-6 space-y-8 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-md tracking-widest text-black">{t("shop.filters_section.title")}</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-gray-400 hover:text-black transition"
        >
          {t("shop.filters_section.reset")}
        </button>
      </div>

      <div>
        <h4 className="text-sm font-semibold tracking-widest text-black mb-4">{t("shop.filters_section.collections")}</h4>
        <div className="flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCollection(c.key)}
              className={`px-3 py-1 border rounded text-xs cursor-pointer transition
                ${
                  collection === c.key
                    ? "bg-[#3D1613] text-off-white border-[#3D1613]"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
            >
              {t(`shop.filters_section.${c.labelKey}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;

