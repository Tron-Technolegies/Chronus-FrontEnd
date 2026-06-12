import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiShoppingBag, FiCreditCard } from "react-icons/fi";

export default function PaymentStatusPage({ status }) {
  const { clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (status === "success") {
      clearCart();
    }
  }, [status, clearCart]);

  const config = {
    success: {
      icon: <FiCheckCircle size={40} style={{ color: "#FFCA0A" }} />,
      title: "Payment Successful",
      message: "Thank you! Your payment has been confirmed and your order is being processed.",
      borderColor: "#FFCA0A",
      bgClass: "rgba(255,202,10,0.15)",
    },
    cancel: {
      icon: <FiAlertCircle size={40} style={{ color: "#F59E0B" }} />,
      title: "Payment Cancelled",
      message: "You have cancelled the payment process. Your order has not been placed.",
      borderColor: "#F59E0B",
      bgClass: "rgba(245,158,11,0.15)",
    },
    failure: {
      icon: <FiXCircle size={40} style={{ color: "#EF4444" }} />,
      title: "Payment Failed",
      message: "Unfortunately, your payment could not be processed. Please try again or use a different payment method.",
      borderColor: "#EF4444",
      bgClass: "rgba(239,68,68,0.15)",
    },
  };

  const { icon, title, message, borderColor, bgClass } = config[status] || config.failure;

  return (
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl shadow-2xl overflow-hidden" style={{ background: "#3D1613" }}>
          <div className="h-1.5 w-full" style={{ background: borderColor }} />

          <div className="px-8 py-10 flex flex-col items-center text-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: bgClass,
                border: `2px solid ${borderColor}`,
                animation: "popIn 0.5s ease",
              }}
            >
              {icon}
            </div>

            <div>
              <h1 className="text-off-white text-xl sm:text-2xl font-semibold tracking-widest mb-2">
                {title}
              </h1>
              <p className="text-off-white-60 text-sm leading-relaxed">
                {message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2 mt-4">
              {status === "success" ? (
                <Link
                  to="/orders"
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] font-semibold rounded-sm transition-colors"
                  style={{ backgroundColor: "#FFCA0A", color: "#1a1a1a" }}
                >
                  <FiShoppingBag size={14} />
                  VIEW ORDERS
                </Link>
              ) : (
                <Link
                  to="/checkout"
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] font-semibold rounded-sm transition-colors"
                  style={{ backgroundColor: "#FFCA0A", color: "#1a1a1a" }}
                >
                  <FiCreditCard size={14} />
                  TRY AGAIN
                </Link>
              )}

              <Link
                to="/shop"
                className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] font-semibold rounded-sm border transition-colors"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <FiShoppingBag size={14} />
                SHOP MORE
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
