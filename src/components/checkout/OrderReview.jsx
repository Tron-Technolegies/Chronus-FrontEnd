import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function OrderReview({ form, cart, loading, onBack, onPlaceOrder }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <FiCheckCircle className="text-[#CBA61F]" size={18} />
        <h2 className="text-sm tracking-[0.15em] font-medium uppercase">Review &amp; Place Order</h2>
      </div>
      <hr className="border-gray-100" />

      {/* Address summary */}
      <div className="bg-gray-50 rounded-sm p-4 text-sm space-y-1 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 border-b pb-1">Shipping Address</h3>
        <p className="font-medium text-gray-700">{form.first_name} {form.last_name}</p>
        <p className="text-gray-500">{form.email}</p>
        {form.address_line_1 && <p className="text-gray-500">{form.address_line_1}</p>}
        {form.address_line_2 && <p className="text-gray-500">{form.address_line_2}</p>}
        <p className="text-gray-500">
          {form.city}{form.postal_code ? `, ${form.postal_code}` : ""}{form.country ? `, ${form.country}` : ""}
        </p>
        {form.phone && <p className="text-gray-500">{form.phone}</p>}
      </div>

      {/* Items summary */}
      <div className="bg-gray-50 rounded-sm p-4 text-sm space-y-3 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 border-b pb-1">Order Items</h3>
        {cart.map((p) => (
          <div key={p.cartItemId ?? p.cartKey ?? `${p.id}-${p.selectedSize ?? "default"}`} className="flex justify-between items-start border-b border-gray-200 pb-2 last:border-0 last:pb-0">
            <div>
              <p className="font-medium text-gray-700 leading-tight">{p.product || p.name}</p>
              <div className="flex flex-wrap gap-x-3 mt-1 text-xs text-gray-500">
                {(p.color || p.selectedColor) && <span>Color: {p.color || p.selectedColor}</span>}
                {(p.size || p.selectedSize) && <span>Size: {p.size || p.selectedSize}</span>}
                {(p.frame || p.selectedFrame) && <span>Frame: {p.frame || p.selectedFrame}</span>}
                {(p.material || p.selectedMaterial) && <span>Material: {p.material || p.selectedMaterial}</span>}
              </div>
            </div>
            <div className="text-right ml-4">
              <p className="font-medium text-gray-700">{p.quantity || p.qty} × {p.price}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        Please review your order details before confirming. By placing the order you agree to our terms and conditions.
      </p>

      {cart.length === 0 && (
        <p className="text-yellow-600 text-xs">
          Your cart is empty.{" "}
          <Link to="/shop" className="underline">
            Continue shopping
          </Link>
        </p>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-200 py-3.5 text-xs tracking-widest hover:bg-gray-50 transition-colors"
        >
          BACK
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={loading || cart.length === 0}
          className="flex-1 bg-[#3D1613] text-off-white py-3.5 text-xs tracking-[0.2em] font-semibold hover:bg-[#5a2019] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              PLACING ORDER…
            </>
          ) : (
            "PLACE ORDER"
          )}
        </button>
      </div>
    </>
  );
}

