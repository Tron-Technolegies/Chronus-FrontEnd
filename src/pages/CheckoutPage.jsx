import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiCreditCard, FiCheckCircle, FiTruck } from "react-icons/fi";

const STEPS = [
  { label: "Shipping", icon: FiPackage },
  { label: "Payment", icon: FiCreditCard },
  { label: "Review", icon: FiCheckCircle },
];

const inputClass =
  "w-full border border-gray-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#CBA61F] focus:ring-1 focus:ring-[#CBA61F] transition-all placeholder:text-gray-400 bg-white";

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const [step, setStep] = useState(1);

  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-16">
        <p className="text-xs text-gray-400 mb-6 tracking-wide">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-600">Checkout</span>
        </p>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl tracking-[0.15em] font-medium mb-8">Secure Checkout</h1>

        {/* ─── Step Indicator ─── */}
        <div className="flex items-center mb-10 max-w-sm">
          {STEPS.map((s, i) => {
            const active = step === i + 1;
            const done = step > i + 1;
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${done ? "bg-[#CBA61F] text-white" : active ? "bg-[#3D1613] text-[#CBA61F]" : "bg-gray-200 text-gray-400"}`}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span
                    className={`mt-1 text-[10px] tracking-widest ${active ? "text-[#3D1613] font-semibold" : "text-gray-400"}`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-[1px] mx-2 mb-4 ${done ? "bg-[#CBA61F]" : "bg-gray-200"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
          {/* ============ LEFT — Form ============ */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
            {/* Shipping Step */}
            {step === 1 && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <FiTruck className="text-[#CBA61F]" size={18} />
                  <h2 className="text-sm tracking-[0.15em] font-medium uppercase">
                    Shipping Information
                  </h2>
                </div>
                <hr className="border-gray-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputClass} placeholder="First Name" />
                  <input className={inputClass} placeholder="Last Name" />
                </div>

                <input className={inputClass} placeholder="Email Address" type="email" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input className={inputClass} placeholder="City" />
                  <input className={inputClass} placeholder="Postal Code" />
                  <select className={inputClass}>
                    <option value="">Country</option>
                    <option>India</option>
                    <option>UAE</option>
                    <option>USA</option>
                    <option>UK</option>
                  </select>
                </div>

                <input className={inputClass} placeholder="Phone Number" type="tel" />

                <button
                  onClick={() => setStep(2)}
                  className="bg-[#FFCA0A] w-full py-3.5 text-xs sm:text-sm tracking-[0.2em] font-semibold hover:bg-[#e6b600] transition-colors"
                >
                  CONTINUE TO PAYMENT
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <FiCreditCard className="text-[#CBA61F]" size={18} />
                  <h2 className="text-sm tracking-[0.15em] font-medium uppercase">
                    Payment Details
                  </h2>
                </div>
                <hr className="border-gray-100" />

                <input className={inputClass} placeholder="Cardholder Name" />
                <input className={inputClass} placeholder="Card Number" maxLength={19} />

                <div className="grid grid-cols-2 gap-4">
                  <input className={inputClass} placeholder="MM / YY" maxLength={7} />
                  <input className={inputClass} placeholder="CVV" maxLength={4} type="password" />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-200 py-3.5 text-xs tracking-widest hover:bg-gray-50 transition-colors"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#FFCA0A] py-3.5 text-xs tracking-[0.2em] font-semibold hover:bg-[#e6b600] transition-colors"
                  >
                    REVIEW ORDER
                  </button>
                </div>
              </>
            )}

            {/* Review Step */}
            {step === 3 && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <FiCheckCircle className="text-[#CBA61F]" size={18} />
                  <h2 className="text-sm tracking-[0.15em] font-medium uppercase">
                    Review & Place Order
                  </h2>
                </div>
                <hr className="border-gray-100" />

                <p className="text-sm text-gray-500 leading-relaxed">
                  Please review your order details below before confirming. By placing the order you
                  agree to our terms and conditions.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-200 py-3.5 text-xs tracking-widest hover:bg-gray-50 transition-colors"
                  >
                    BACK
                  </button>
                  <button className="flex-1 bg-[#3D1613] text-white py-3.5 text-xs tracking-[0.2em] font-semibold hover:bg-[#5a2019] transition-colors">
                    PLACE ORDER
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ============ RIGHT — Order Summary ============ */}
          <div className="rounded-lg overflow-hidden shadow-sm" style={{ background: "#3D1613" }}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-sm tracking-[0.2em] font-semibold text-[#FFCA0A] uppercase">
                Order Summary
              </h3>
            </div>

            {/* Items */}
            <div className="px-6 py-4 space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
              {cart.length === 0 ? (
                <p className="text-white/50 text-sm text-center py-4">Your cart is empty</p>
              ) : (
                cart.map((p) => (
                  <div
                    key={p.id}
                    className="flex gap-3 pb-4 border-b border-white/10 last:border-0"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center shrink-0">
                      <img src={p.images?.[0]} className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium tracking-wide leading-snug line-clamp-2">
                        {p.name}
                      </p>
                      <p className="text-white/50 text-[11px] mt-0.5">Qty: {p.qty}</p>
                      <p className="text-[#FFCA0A] text-sm font-semibold mt-0.5">{p.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="px-6 py-5 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-white/70 text-xs">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70 text-xs">
                <span>Shipping</span>
                <span className="text-[#FFCA0A] font-medium">Free</span>
              </div>
              <div className="flex justify-between text-white/70 text-xs">
                <span>Tax (15%)</span>
                <span className="text-white">${tax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white text-sm font-semibold tracking-wide">Total</span>
                <span className="text-[#FFCA0A] text-base font-bold">${total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
