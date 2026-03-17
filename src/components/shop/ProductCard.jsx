import React from "react";
import { FaHeart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useWishlistToggle } from "../../hooks/useWishlistToggle";
import { useAddToCart } from "../../hooks/useAddToCart";

const IMAGE_PLACEHOLDER = "https://via.placeholder.com/400x500?text=Product";

export default function ProductCard({ product }) {
  const { handleAddToCart, loading: cartLoading } = useAddToCart();
  const { handleToggle, isWishlisted } = useWishlistToggle();

  const productImage = product.images?.[0] || product.image || IMAGE_PLACEHOLDER;

  return (
    <div className="bg-white group cursor-pointer">
      <div className="border border-gray-200 bg-[#f7f1e7] p-3 relative overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleToggle(product);
          }}
          className={`absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow transition
            ${isWishlisted(product.id) ? "border-[#CBA61F]" : ""}`}
        >
          <FaHeart
            size={16}
            className={`${isWishlisted(product.id) ? "text-[#CBA61F]" : "text-gray-300"}`}
          />
        </button>

        <Link to={`/product/${product.id}`}>
          <div className="aspect-[3/4] w-full overflow-hidden flex items-center justify-center">
            <img
              src={productImage}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = IMAGE_PLACEHOLDER;
              }}
            />
          </div>
        </Link>

        <div
          className="
          flex gap-2 items-center justify-center w-full mt-3
          md:absolute md:bottom-0 md:left-0 md:px-3 md:py-4
          md:translate-y-full md:opacity-0
          md:group-hover:translate-y-0 md:group-hover:opacity-100
          md:transition-all md:duration-300
        "
        >
          <Link to={`/product/${product.id}`} className="w-full">
            <button className="bg-yellow-400 text-xs md:text-sm p-2 w-full">Buy Now</button>
          </Link>

          <button
            onClick={() => handleAddToCart(product)}
            disabled={cartLoading}
            className="bg-gray-50 p-2 shrink-0 disabled:opacity-50"
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
        <div className="text-center text-black py-3 px-2">
          <p className="text-xs sm:text-sm leading-snug line-clamp-2">{product.name}</p>
          <p className="text-sm sm:text-base font-medium">
            {product.categoryName === "Fine Art" ? `Starts from ${product.price}` : product.price}
          </p>
        </div>
      </Link>
    </div>
  );
}
