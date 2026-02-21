import { LuShoppingBag } from "react-icons/lu";
import { useCart } from "../../context/CartContext";

export default function CartToast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
      style={{ animation: "slideUpToast 0.3s ease" }}
    >
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-sm shadow-2xl"
        style={{
          backgroundColor: "#3D1613",
          border: "1px solid rgba(255,202,10,0.3)",
          minWidth: "220px",
        }}
      >
        {/* Gold bag icon */}
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
          style={{ backgroundColor: "#FFCA0A" }}
        >
          <LuShoppingBag className="text-black text-sm" />
        </div>

        {/* Text */}
        <div>
          <p className="text-white text-sm font-medium tracking-wide">{toast}</p>
          <p className="text-xs" style={{ color: "rgba(255,202,10,0.7)" }}>
            Item added to your cart
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUpToast {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
