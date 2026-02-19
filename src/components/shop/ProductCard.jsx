import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [wish, setWish] = useState(false);

  return (
    <div
      className="bg-white group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="border-gray-200 flex flex-col border p-5 relative pb-7 w-full overflow-hidden">
        <button className="cursor-pointer ms-auto" onClick={() => setWish(!wish)}>
          <FaHeart className={`transition ${wish ? "text-[#CBA61F]" : "text-gray-300"}`} />
        </button>

        <div className="h-80 w-full flex items-center justify-center">
          <img src={product.images} alt={product.name} className="h-full w-full object-contain" />
        </div>

        <div
          className={`
            flex absolute gap-4 items-center justify-center w-full bottom-0 left-0 px-3 py-2
            transform transition-all duration-300
            ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          `}
        >
          <button className="bg-yellow-400 p-2 w-full cursor-pointer">Buy Now</button>
          <button className="bg-gray-300 p-2 w-fit cursor-pointer">
            <LuShoppingBag />
          </button>
        </div>
      </div>

      <div className="text-center text-black py-4">
        <p>{product.name}</p>
        <p className="text-lg">{product.price}</p>
      </div>
    </div>
  );
}
