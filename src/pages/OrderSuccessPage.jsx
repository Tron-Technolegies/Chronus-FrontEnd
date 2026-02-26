import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiCheckCircle, FiPackage, FiShoppingBag } from "react-icons/fi";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { clearCart } = useCart();

  // Clear cart on mount — order is placed
  useEffect(() => {
    clearCart();
    window.scrollTo(0, 0);
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-xl shadow-2xl overflow-hidden"
          style={{ background: "#3D1613" }}
        >
          {/* Gold top bar */}
          <div className="h-1.5 w-full" style={{ background: "#FFCA0A" }} />

          {/* Body */}
          <div className="px-8 py-10 flex flex-col items-center text-center gap-5">
            {/* Animated check */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(255,202,10,0.15)",
                border: "2px solid #FFCA0A",
                animation: "popIn 0.5s ease",
              }}
            >
              <FiCheckCircle size={40} style={{ color: "#FFCA0A" }} />
            </div>

            <div>
              <h1 className="text-white text-xl sm:text-2xl font-semibold tracking-widest mb-2">
                Order Placed!
              </h1>
              <p className="text-white/60 text-sm leading-relaxed">
                Thank you for your purchase. Your order is being processed.
              </p>
            </div>

            {/* Order ID pill */}
            {id && (
              <div
                className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono"
                style={{
                  backgroundColor: "rgba(255,202,10,0.1)",
                  border: "1px solid rgba(255,202,10,0.3)",
                  color: "#FFCA0A",
                }}
              >
                <FiPackage size={14} />
                Order #{id}
              </div>
            )}

            {/* Payment status note */}
            <div
              className="w-full rounded-sm px-4 py-3 text-left text-xs leading-relaxed"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              💳 Your payment is being verified. You will receive a confirmation email shortly.
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <Link
                to="/orders"
                className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] font-semibold rounded-sm transition-colors"
                style={{ backgroundColor: "#FFCA0A", color: "#1a1a1a" }}
              >
                <FiPackage size={14} />
                VIEW ORDERS
              </Link>

              <Link
                to="/shop"
                className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] font-semibold rounded-sm border transition-colors"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <FiShoppingBag size={14} />
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes popIn {
            0%   { transform: scale(0.5); opacity: 0; }
            70%  { transform: scale(1.1); }
            100% { transform: scale(1);   opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
