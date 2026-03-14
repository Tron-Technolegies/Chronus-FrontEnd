import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubcategorySelectModal = ({ categorySlug, categoryName, subcategories = [], onClose }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(timer);
  }, []);

  const his = subcategories.find((s) => s.slug === "his");
  const her = subcategories.find((s) => s.slug === "her");

  if (!his && !her) return null;

  const handleSelect = (type) => {
    onClose();
    navigate(`/shop?category=${categorySlug}&type=${type}`);
  };

  const handleViewAll = () => {
    onClose();
    navigate(`/shop?category=${categorySlug}`);
  };

  const Card = ({ title, type }) => (
    <div
      onClick={() => handleSelect(type)}
      className="cursor-pointer group transition-all duration-300 hover:-translate-y-1 w-full"
    >
      <div className="p-[2.5px] rounded-sm bg-gradient-to-r from-[#b8964c] via-[#e0c78a] to-[#b8964c] hover:from-[#ffd058] hover:via-[#ffca56] hover:to-[#ffe2a4]">
        <div className="bg-[#3d1613] group-hover:bg-[#32110f] transition-all duration-300 rounded-sm w-full min-h-[140px] flex flex-col justify-center items-center shadow-md shadow-[#4c302f8a] text-center px-4 group-hover:shadow-lg font-[cormorant-garamond]">
          <h3 className="text-off-white text-xl sm:text-2xl tracking-wide mb-3">{title}</h3>

          <div className="w-12 h-[1px] bg-[#C6A75D] mb-3"></div>

          <p className="text-off-white text-xs sm:text-sm tracking-wide">Explore Collection</p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[60] flex items-center justify-center px-6
      bg-black/60 backdrop-blur-md transition-opacity duration-300
      ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/20
        bg-white/10 text-white/70 hover:text-white flex items-center justify-center"
      >
        ×
      </button>

      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[640px] text-center transform transition-all duration-500
        ${visible ? "translate-y-0" : "translate-y-6"}`}
      >
        {/* Category */}
        <p className="text-[10px] tracking-[0.32em] uppercase text-[#C6A75D] mb-3 font-inter">
          {categoryName}
        </p>

        {/* Title */}
        <h2 className="text-[36px] text-[#F5F1E8] font-[cormorant-garamond] mb-3">
          Shop by Collection
        </h2>

        {/* Divider */}
        <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#C6A75D] to-transparent mx-auto mb-10" />

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-[500px] mx-auto">
          {his && <Card title="His Collection" type="his" />}

          {her && <Card title="Her Collection" type="her" />}
        </div>

        {/* View All */}
        <button
          onClick={handleViewAll}
          className="mt-8 text-[11px] tracking-[0.18em] uppercase text-white/40
          underline underline-offset-4 hover:text-white transition"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default SubcategorySelectModal;
