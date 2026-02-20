import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [wish, setWish] = useState(false);
  const { addToCart } = useCart();

  return (
    <div
      className="bg-white group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE AREA */}
      <div className="border border-gray-200 p-5 relative pb-7 w-full overflow-hidden">
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWish(!wish);
          }}
          className="ms-auto block"
        >
          <FaHeart className={`transition ${wish ? "text-[#CBA61F]" : "text-gray-300"}`} />
        </button>

        <Link to={`/product/${product.id}`}>
          <div className="flex items-center justify-center">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-[350px] h-[500px] object-cover"
            />
          </div>
        </Link>

        {/* Hover buttons */}
        <div
          className={`
        flex absolute gap-4 items-center justify-center w-full bottom-0 left-0 px-3 py-6
        transform transition-all duration-300
        ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
      `}
        >
          <Link to={`/product/${product.id}`} className="w-full">
            <button className="bg-yellow-400 p-2 w-full">Buy Now</button>
          </Link>

          <button onClick={() => addToCart(product)} className="bg-gray-50 cursor-pointer p-2">
            <LuShoppingBag />
          </button>
        </div>
      </div>

      {/* INFO */}
      <Link to={`/product/${product.id}`}>
        <div className="text-center text-black py-4">
          <p>{product.name}</p>
          <p className="text-lg">{product.price}</p>
        </div>
      </Link>
    </div>
  );
}
