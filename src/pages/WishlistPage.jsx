import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { LuShoppingBag } from "react-icons/lu";
import { FiX, FiHeart } from "react-icons/fi";
import { useEffect } from "react";

export default function WishlistPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-20">
        <p className="text-xs text-gray-400 mb-6 tracking-wide">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-600">Wishlist</span>
        </p>

        <div className="flex items-center gap-3 mb-8">
          <FiHeart size={20} className="text-[#CBA61F]" />
          <h1 className="text-xl sm:text-2xl tracking-[0.12em] font-medium">My Wishlist</h1>
          {wishlist.length > 0 && (
            <span className="text-xs text-gray-400 ml-1">({wishlist.length} items)</span>
          )}
        </div>

        <hr className="border-gray-200 mb-8" />

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <FiHeart size={48} className="text-gray-200" />
            <p className="text-gray-400 text-sm tracking-wide">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-[#3D1613] text-white text-xs tracking-[0.2em] px-8 py-3 hover:bg-[#5a2019] transition-colors"
            >
              EXPLORE COLLECTIONS
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4 group transition-shadow hover:shadow-md"
              >
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-400 tracking-widest uppercase mb-1">
                    Order ID: ABC-{product.id?.toString().padStart(8, "0").slice(-8) ?? "00000000"}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-sm sm:text-base font-medium text-gray-900 hover:text-[#CBA61F] transition-colors leading-snug line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-base sm:text-lg font-semibold text-[#3D1613] mt-1">
                    {product.price}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <button
                    onClick={() => {
                      addToCart(product);
                    }}
                    className="flex items-center gap-2 bg-[#3D1613] text-white text-xs px-4 sm:px-5 py-2.5 rounded-sm hover:bg-[#5a2019] transition-colors whitespace-nowrap"
                  >
                    <LuShoppingBag size={14} />
                    <span className="hidden sm:inline">Add to bag</span>
                    <span className="sm:hidden">Add</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors p-1"
                    aria-label="Remove from wishlist"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate("/shop")}
                className="text-xs text-gray-400 hover:text-gray-600 tracking-widest uppercase transition-colors"
              >
                ← Continue Shopping
              </button>
              <button
                onClick={() => {
                  wishlist.forEach((p) => addToCart(p));
                }}
                className="bg-[#FFCA0A] text-black text-xs tracking-[0.15em] px-6 py-3 hover:bg-[#e6b600] transition-colors font-semibold"
              >
                ADD ALL TO BAG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
