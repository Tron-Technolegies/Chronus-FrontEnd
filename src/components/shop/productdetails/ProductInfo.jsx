import { useState } from "react";
import { IoShieldOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiLoopLeftFill } from "react-icons/ri";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useWishlistToggle } from "../../../hooks/useWishlistToggle";
import { FaHeart } from "react-icons/fa";

export default function ProductInfo({ product }) {
  const [qty, setQty] = useState(1);
  const { handleAddToCart, loading: cartLoading } = useAddToCart();
  const { handleToggle, isWishlisted } = useWishlistToggle();

  const increase = () => {
    if (qty < product.stock) setQty(qty + 1);
  };

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  return (
    <div className="space-y-6">
      {/* SALE */}
      {product.originalPrice && (
        <span className="inline-block text-xs bg-red-500 text-white px-3 py-1 tracking-widest">
          SALE
        </span>
      )}

      {/* Title */}
      <h1 className="text-lg sm:text-xl tracking-widest font-[Bayon]">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
        <div className="flex text-[#CBA61F]">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i}>{i <= Math.round(product.rating) ? "★" : "☆"}</span>
          ))}
        </div>
        <span>
          {product.rating} ({product.reviewsCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
        <span className="text-2xl sm:text-3xl font-semibold">{product.price}</span>

        {product.originalPrice && (
          <span className="line-through text-gray-400 text-base sm:text-lg">
            {product.originalPrice}
          </span>
        )}
      </div>

      {/* Short desc */}
      <p className="text-gray-500 leading-6 max-w-md text-sm sm:text-base">{product.shortDesc}</p>

      {/* Qty + Buy + Wishlist row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        {/* Qty */}
        <div className="flex border border-gray-300 w-fit">
          <button onClick={decrease} className="px-4 py-2 cursor-pointer hover:bg-gray-50">
            -
          </button>
          <span className="px-6 flex items-center">{qty}</span>
          <button onClick={increase} className="px-4 py-2 cursor-pointer hover:bg-gray-50">
            +
          </button>
        </div>

        {/* Buy */}
        <button className="bg-[#F5C518] hover:brightness-95 px-6 cursor-pointer sm:px-24 py-3 text-sm tracking-wide w-full sm:w-auto">
          BUY NOW
        </button>

        {/* Add to Cart */}
        <button
          onClick={() => handleAddToCart(product, qty)}
          disabled={cartLoading}
          className="bg-gray-50 cursor-pointer p-3 shrink-0 disabled:opacity-50 border border-gray-200"
          aria-label="Add to cart"
        >
          {cartLoading ? (
            <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin block" />
          ) : (
            <LuShoppingBag size={18} />
          )}
        </button>

        {/* Wishlist toggle */}
        <button
          onClick={() => handleToggle(product)}
          className="p-3 shrink-0 border border-gray-200"
          aria-label="Toggle wishlist"
        >
          <FaHeart
            size={18}
            className={`transition ${isWishlisted(product.id) ? "text-[#CBA61F]" : "text-gray-300"}`}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-[#D9D9D9] pt-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <IoShieldOutline className="w-5 h-5" />
            <p className="text-[10px] sm:text-xs tracking-widest">AUTHENTICITY GUARANTEED</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <MdOutlineLocalShipping className="w-5 h-5" />
            <p className="text-[10px] sm:text-xs tracking-widest">FREE SHIPPING</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <RiLoopLeftFill className="w-5 h-5" />
            <p className="text-[10px] sm:text-xs tracking-widest">30-DAY RETURNS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
