import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCheckout } from "../hooks/useCheckout";
import { FiPackage, FiCreditCard, FiCheckCircle, FiTruck, FiAlertCircle } from "react-icons/fi";

const STEPS = [
  { label: "Shipping", icon: FiPackage },
  { label: "Payment", icon: FiCreditCard },
  { label: "Review", icon: FiCheckCircle },
];

const inputBase =
  "w-full border rounded-sm px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 bg-white";
const inputOk = "border-gray-200 focus:border-[#CBA61F] focus:ring-1 focus:ring-[#CBA61F]";
const inputErr = "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50";

const INITIAL_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  city: "",
  postal_code: "",
  country: "",
  phone: "",
};

// ── Validators ────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/;

function validateShipping(form) {
  const errs = {};
  if (!form.first_name.trim()) errs.first_name = "First name is required";
  if (!form.last_name.trim()) errs.last_name = "Last name is required";
  if (!form.email.trim()) errs.email = "Email is required";
  else if (!EMAIL_RE.test(form.email)) errs.email = "Enter a valid email address";
  if (!form.city.trim()) errs.city = "City is required";
  if (!form.postal_code.trim()) errs.postal_code = "Postal code is required";
  if (!form.country) errs.country = "Please select a country";
  if (!form.phone.trim()) errs.phone = "Phone number is required";
  else if (!PHONE_RE.test(form.phone)) errs.phone = "Enter a valid phone number";
  return errs;
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ error, children }) {
  return (
    <div>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { submit, loading, error } = useCheckout();

  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change if already touched
    if (touched[name]) {
      const errs = validateShipping({ ...form, [name]: value });
      setFieldErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validateShipping(form);
    setFieldErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleContinueToPayment = () => {
    const errs = validateShipping(form);
    // Mark all fields touched
    setTouched(Object.keys(INITIAL_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    setFieldErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    try {
      await submit(form);
    } catch {
      // error already set in hook
    }
  };

  // Helper: input class based on error state
  const ic = (name) => `${inputBase} ${fieldErrors[name] && touched[name] ? inputErr : inputOk}`;

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-16">
        <p className="text-xs text-gray-400 mb-6 tracking-wide">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-600">Checkout</span>
        </p>

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
                  <span className={`mt-1 text-[10px] tracking-widest ${active ? "text-[#3D1613] font-semibold" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-[1px] mx-2 mb-4 ${done ? "bg-[#CBA61F]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
          {/* ============ LEFT — Form ============ */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">

            {/* API Error banner */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-sm">
                <FiAlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* ── Step 1: Shipping ── */}
            {step === 1 && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <FiTruck className="text-[#CBA61F]" size={18} />
                  <h2 className="text-sm tracking-[0.15em] font-medium uppercase">Shipping Information</h2>
                </div>
                <hr className="border-gray-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field error={touched.first_name && fieldErrors.first_name}>
                    <input
                      className={ic("first_name")}
                      name="first_name"
                      placeholder="First Name *"
                      value={form.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                  <Field error={touched.last_name && fieldErrors.last_name}>
                    <input
                      className={ic("last_name")}
                      name="last_name"
                      placeholder="Last Name *"
                      value={form.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                </div>

                <Field error={touched.email && fieldErrors.email}>
                  <input
                    className={ic("email")}
                    name="email"
                    placeholder="Email Address *"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field error={touched.city && fieldErrors.city}>
                    <input
                      className={ic("city")}
                      name="city"
                      placeholder="City *"
                      value={form.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                  <Field error={touched.postal_code && fieldErrors.postal_code}>
                    <input
                      className={ic("postal_code")}
                      name="postal_code"
                      placeholder="Postal Code *"
                      value={form.postal_code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                  <Field error={touched.country && fieldErrors.country}>
                    <select
                      className={ic("country")}
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Country *</option>
                      <option value="India">India</option>
                      <option value="UAE">UAE</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                  </Field>
                </div>

                <Field error={touched.phone && fieldErrors.phone}>
                  <input
                    className={ic("phone")}
                    name="phone"
                    placeholder="Phone Number *"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                <button
                  onClick={handleContinueToPayment}
                  className="bg-[#FFCA0A] w-full py-3.5 text-xs sm:text-sm tracking-[0.2em] font-semibold hover:bg-[#e6b600] transition-colors"
                >
                  CONTINUE TO PAYMENT
                </button>
              </>
            )}

            {/* ── Step 2: Payment ── */}
            {step === 2 && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <FiCreditCard className="text-[#CBA61F]" size={18} />
                  <h2 className="text-sm tracking-[0.15em] font-medium uppercase">Payment Details</h2>
                </div>
                <hr className="border-gray-100" />

                <div className="space-y-4">
                  <input className={`${inputBase} ${inputOk}`} placeholder="Cardholder Name" />
                  <input className={`${inputBase} ${inputOk}`} placeholder="Card Number" maxLength={19} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className={`${inputBase} ${inputOk}`} placeholder="MM / YY" maxLength={7} />
                    <input className={`${inputBase} ${inputOk}`} placeholder="CVV" maxLength={4} type="password" />
                  </div>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">
                    🔒 Payment processed securely via Stripe
                  </p>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 py-3.5 text-xs tracking-widest hover:bg-gray-50 transition-colors">
                    BACK
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-[#FFCA0A] py-3.5 text-xs tracking-[0.2em] font-semibold hover:bg-[#e6b600] transition-colors">
                    REVIEW ORDER
                  </button>
                </div>
              </>
            )}

            {/* ── Step 3: Review ── */}
            {step === 3 && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <FiCheckCircle className="text-[#CBA61F]" size={18} />
                  <h2 className="text-sm tracking-[0.15em] font-medium uppercase">Review &amp; Place Order</h2>
                </div>
                <hr className="border-gray-100" />

                {/* Address summary */}
                <div className="bg-gray-50 rounded-sm p-4 text-sm space-y-1">
                  <p className="font-medium text-gray-700">{form.first_name} {form.last_name}</p>
                  <p className="text-gray-500">{form.email}</p>
                  <p className="text-gray-500">
                    {form.city}{form.postal_code ? `, ${form.postal_code}` : ""}{form.country ? `, ${form.country}` : ""}
                  </p>
                  {form.phone && <p className="text-gray-500">{form.phone}</p>}
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Please review your order details before confirming. By placing the order you agree to our terms and conditions.
                </p>

                {cart.length === 0 && (
                  <p className="text-yellow-600 text-xs">
                    Your cart is empty. <Link to="/shop" className="underline">Continue shopping</Link>
                  </p>
                )}

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 py-3.5 text-xs tracking-widest hover:bg-gray-50 transition-colors">
                    BACK
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading || cart.length === 0}
                    className="flex-1 bg-[#3D1613] text-white py-3.5 text-xs tracking-[0.2em] font-semibold hover:bg-[#5a2019] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
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
            )}
          </div>

          {/* ============ RIGHT — Order Summary ============ */}
          <div className="rounded-lg overflow-hidden shadow-sm" style={{ background: "#3D1613" }}>
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-sm tracking-[0.2em] font-semibold text-[#FFCA0A] uppercase">Order Summary</h3>
            </div>

            <div className="px-6 py-4 space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
              {cart.length === 0 ? (
                <p className="text-white/50 text-sm text-center py-4">Your cart is empty</p>
              ) : (
                cart.map((p) => (
                  <div key={p.id} className="flex gap-3 pb-4 border-b border-white/10 last:border-0">
                    <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center shrink-0">
                      <img src={p.images?.[0]} className="w-10 h-10 object-contain" alt={p.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium tracking-wide leading-snug line-clamp-2">{p.name}</p>
                      <p className="text-white/50 text-[11px] mt-0.5">Qty: {p.qty}</p>
                      <p className="text-[#FFCA0A] text-sm font-semibold mt-0.5">{p.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

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
