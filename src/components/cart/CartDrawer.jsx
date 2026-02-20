import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
  const { cart, open, setOpen, subtotal, updateQty, removeItem } = useCart();
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 h-full w-[360px] bg-white z-50 shadow-2xl transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between">
          <h2 className="tracking-widest">CART</h2>
          <button onClick={() => setOpen(false)} className="cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto h-[70vh]">
          {cart.length === 0 && <p className="text-gray-400">Cart is empty</p>}

          {cart.map((p) => (
            <div key={p.id} className="flex gap-4 border-b border-[#D9D9D9] pb-4">
              <img src={p.images?.[0]} className="w-16 h-16 object-contain" />

              <div className="flex-1">
                <p className="text-sm">{p.name}</p>
                <p className="text-xs text-gray-400">{p.price}</p>

                {/* Qty */}
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(p.id, "dec")}>-</button>
                  <span>{p.qty}</span>
                  <button onClick={() => updateQty(p.id, "inc")}>+</button>
                </div>
              </div>

              <button onClick={() => removeItem(p.id)} className="cursor-pointer">
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <Link to="/checkout">
            <button className="bg-[#F5C518] w-full py-3">Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
}
