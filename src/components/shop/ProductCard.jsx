import React from "react";
import { FaHeart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useWishlistToggle } from "../../hooks/useWishlistToggle";
import { useAddToCart } from "../../hooks/useAddToCart";

export default function ProductCard({ product }) {
  const { handleAddToCart, loading: cartLoading } = useAddToCart();
  const { handleToggle, isWishlisted } = useWishlistToggle();

  return (
    <div className="bg-white group cursor-pointer">
      <div className="border border-gray-200 bg-[#FFF5E6] p-5 relative pb-7 w-full overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleToggle(product);
          }}
          className={`ms-auto flex items-center justify-center w-13 h-13 rounded-full transition
            ${isWishlisted(product.id) ? "border-[#CBA61F] " : " hover:border-[#CBA61F]"}`}
          aria-label="Toggle wishlist"
        >
          <FaHeart
            size={24}
            className={`transition ${isWishlisted(product.id) ? "text-[#CBA61F]" : "text-gray-300"}`}
          />
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

          <button
            onClick={() => handleAddToCart(product)}
            disabled={cartLoading}
            className="bg-gray-50 cursor-pointer p-2 shrink-0 disabled:opacity-50"
            aria-label="Add to cart"
          >
            {cartLoading ? (
              <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin block" />
            ) : (
              <LuShoppingBag />
            )}
          </button>
        </div>
      </div>

      <Link to={`/product/${product.id}`}>
        <div className="text-center text-black py-4 px-2">
          <p className="text-sm sm:text-base leading-snug">{product.name}</p>
          <p className="text-lg">{product.price}</p>
        </div>
      </Link>
    </div>
  );
}
