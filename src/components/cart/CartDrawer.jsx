import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatMoney } from "../../utils/currency";

export default function CartDrawer() {
  const { cart, open, setOpen, subtotal, updateQty, removeItem, loading } = useCart();

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
            x
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {cart.length === 0 && (
            <p className="text-gray-400 text-center mt-20">Your cart is empty</p>
          )}

          {cart.map((p) => {
            return (
              <div
                key={p.cartItemId ?? p.cartKey ?? `${p.id}-${p.selectedSize ?? "default"}`}
                className="flex gap-4 border-b border-[#D9D9D9] pb-4"
              >
                <img
                  src={p.image || p.images?.[0]}
                  className="w-16 h-16 object-contain border border-[#D9D9D9] p-1"
                  alt={p.product || p.name}
                />

                <div className="flex-1 space-y-2">
                  <p className="text-sm font-[BAYON]">{p.product || p.name}</p>
                  {(p.color || p.selectedColor) && <p className="text-[11px] text-gray-500">Color: {p.color || p.selectedColor}</p>}
                  {(p.size || p.selectedSize) && <p className="text-[11px] text-gray-500">Size: {p.size || p.selectedSize}</p>}
                  {(p.frame || p.selectedFrame) && (
                    <p className="text-[11px] text-gray-500">Frame: {p.frame || p.selectedFrame}</p>
                  )}
                  {(p.material || p.selectedMaterial) && (
                    <p className="text-[11px] text-gray-500">Material: {p.material || p.selectedMaterial}</p>
                  )}
                  {p.variant?.options?.map((opt, i) => (
                    <p key={i} className="text-[11px] text-gray-500">
                      {opt.option_name}: {opt.option_value}
                    </p>
                  ))}
                  <p className="text-xs font-semibold text-[#000000] ">{p.price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQty(p.id, "dec")}
                      disabled={loading}
                      className="px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      -
                    </button>

                    <span className="min-w-[20px] text-center">{p.quantity || p.qty}</span>

                    <button
                      onClick={() => updateQty(p.id, "inc")}
                      disabled={loading}
                      className="px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(p.cartItemId ?? p.id)}
                  disabled={loading}
                  className="cursor-pointer text-gray-400 hover:text-black disabled:opacity-50"
                >
                  x
                </button>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-gray-200 space-y-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium  ">{formatMoney(subtotal)}</span>
          </div>

          <Link to={loading ? "#" : "/checkout"} onClick={(e) => { if (loading) e.preventDefault(); else setOpen(false); }}>
            <button disabled={loading} className="bg-[#F5C518] w-full py-3 text-sm tracking-wide disabled:opacity-50">Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
}
