import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
  const { cart, open, setOpen, subtotal, updateQty, removeItem } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[380px] bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="tracking-widest font-medium font-[bastoni]">Shopping Bag</h2>

          <button onClick={() => setOpen(false)} className="text-lg cursor-pointer">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 && (
            <p className="text-gray-400 text-center mt-20">Your cart is empty</p>
          )}

          {cart.map((p) => (
            <div key={p.id} className="flex gap-4 border-b border-[#D9D9D9] pb-4">
              <img
                src={p.images?.[0]}
                className="w-16 h-16 object-contain border border-[#D9D9D9] p-1"
              />

              <div className="flex-1 space-y-2">
                <p className="text-sm font-[BAYON]">{p.name}</p>
                <p className="text-xs font-semibold text-[#000000] ">{p.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQty(p.id, "dec")}
                    className="px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
                  >
                    −
                  </button>

                  <span className="min-w-[20px] text-center">{p.qty}</span>

                  <button
                    onClick={() => updateQty(p.id, "inc")}
                    className="px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(p.id)}
                className="cursor-pointer text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 space-y-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium  ">${subtotal.toLocaleString()}</span>
          </div>

          <Link to="/checkout" onClick={() => setOpen(false)}>
            <button className="bg-[#F5C518] w-full py-3 text-sm tracking-wide">Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
}
