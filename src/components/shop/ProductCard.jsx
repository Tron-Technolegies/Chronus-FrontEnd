import React from "react";
import { FaHeart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <div className="bg-white group cursor-pointer">
      {/* IMAGE AREA */}
      <div className="border border-gray-200 p-5 relative pb-7 w-full overflow-hidden">
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="ms-auto block"
        >
          <FaHeart className={`transition ${isWishlisted(product.id) ? "text-[#CBA61F]" : "text-gray-300"}`} />
        </button>

        <Link to={`/product/${product.id}`}>
          <div className="flex items-center justify-center">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full max-w-[350px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
            />
          </div>
        </Link>

        {/* Action buttons:
            Mobile  → always visible (translate-y-0 opacity-100)
            Desktop → hidden until group hover */}
        <div
          className="
            flex absolute gap-4 items-center justify-center w-full bottom-0 left-0 px-3 py-6
            transform transition-all duration-300
            translate-y-0 opacity-100
            sm:translate-y-full sm:opacity-0
            sm:group-hover:translate-y-0 sm:group-hover:opacity-100
          "
        >
          <Link to={`/product/${product.id}`} className="w-full">
            <button className="bg-yellow-400 p-2 w-full text-sm">Buy Now</button>
          </Link>

          <button onClick={() => addToCart(product)} className="bg-gray-50 cursor-pointer p-2 shrink-0">
            <LuShoppingBag />
          </button>
        </div>
      </div>

      {/* INFO */}
      <Link to={`/product/${product.id}`}>
        <div className="text-center text-black py-4 px-2">
          <p className="text-sm sm:text-base leading-snug">{product.name}</p>
          <p className="text-lg">{product.price}</p>
        </div>
      </Link>
    </div>
  );
}
