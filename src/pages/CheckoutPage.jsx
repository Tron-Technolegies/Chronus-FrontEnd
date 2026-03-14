import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import {
  FiPackage,
  FiCreditCard,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import ShippingForm from "../components/checkout/ShippingForm";
import OrderReview from "../components/checkout/OrderReview";
import StripeProvider from "../providers/StripeProvider";
import StripePaymentForm from "../components/checkout/StripePaymentForm";

// ── Steps: 1 Shipping → 2 Review → 3 Payment ──────────────────────────────
const STEPS = [
  { label: "Shipping", icon: FiPackage },
  { label: "Review",   icon: FiCheckCircle },
  { label: "Payment",  icon: FiCreditCard },
];

const INITIAL_FORM = {
  first_name:  "",
  last_name:   "",
  email:       "",
  address:     "",
  city:        "",
  postal_code: "",
  country:     "",
  phone:       "",
};

const PAYMENT_GATEWAYS = [
  {
    id: "stripe",
    label: "Stripe",
    description: "Pay by card with Stripe's secure checkout form.",
  },
  {
    id: "ziina",
    label: "Ziina",
    description: "Continue to Ziina to complete your payment.",
  },
];

// ── Validators ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/;

function validateShipping(form) {
  const errs = {};
  if (!form.first_name.trim())  errs.first_name  = "First name is required";
  if (!form.last_name.trim())   errs.last_name   = "Last name is required";
  if (!form.email.trim())       errs.email       = "Email is required";
  else if (!EMAIL_RE.test(form.email)) errs.email = "Enter a valid email address";
  if (!form.address.trim())     errs.address     = "Street address is required";
  if (!form.city.trim())        errs.city        = "City is required";
  if (!form.postal_code.trim()) errs.postal_code = "Postal code is required";
  if (!form.country)            errs.country     = "Please select a country";
  if (!form.phone.trim())       errs.phone       = "Phone number is required";
  else if (!PHONE_RE.test(form.phone)) errs.phone = "Enter a valid phone number";
  return errs;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [selectedGateway, setSelectedGateway] = useState("stripe");
  const [paymentCurrency, setPaymentCurrency] = useState("usd");
  const {
    submit,
    startStripePayment,
    startZiinaPayment,
    loading,
    error,
    clientSecret,
    orderId,
    paymentGateway,
    paymentUrl,
  } = useCheckout();

  // No tax — total = subtotal only
  const total = subtotal;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  // Step 1 → 2
  const handleContinueToReview = () => {
    const errs = validateShipping(form);
    setTouched(Object.keys(INITIAL_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    setFieldErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  // Step 2 → 3
  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    try {
      const result = await submit(form);
      setPaymentCurrency(result?.currency ?? "usd");
      setStep(3);
    } catch {
      // error shown in hook
    }
  };

  const handleGatewayContinue = async () => {
    if (!orderId) return;

    try {
      if (selectedGateway === "ziina") {
        const result = await startZiinaPayment(orderId, paymentCurrency);
        const targetUrl = result?.paymentUrl ?? paymentUrl;

        if (targetUrl) {
          window.location.href = targetUrl;
        }
        return;
      }

      await startStripePayment(orderId, paymentCurrency);
    } catch {
      // error shown in hook
    }
  };


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
        <div className="flex items-center mb-10 max-w-sm w-full overflow-x-auto pb-1">
          {STEPS.map((s, i) => {
            const active = step === i + 1;
            const done   = step > i + 1;
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${done ? "bg-[#CBA61F] text-off-white" : active ? "bg-[#3D1613] text-[#CBA61F]" : "bg-gray-200 text-gray-400"}`}
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

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-sm">
                <FiAlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <ShippingForm
                form={form}
                touched={touched}
                fieldErrors={fieldErrors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                onContinue={handleContinueToReview}
              />
            )}

            {/* Step 2 */}
            {step === 2 && (
              <OrderReview
                form={form}
                cart={cart}
                loading={loading}
                onBack={() => setStep(1)}
                onPlaceOrder={handlePlaceOrder}
              />
            )}

            {/* Step 3 */}
            {step === 3 && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <FiCreditCard className="text-[#CBA61F]" size={18} />
                  <h2 className="text-sm tracking-[0.15em] font-medium uppercase">Payment Details</h2>
                </div>
                <hr className="border-gray-100" />
                {!clientSecret && (
                  <div className="space-y-5">
                    <div className="space-y-3">
                      {PAYMENT_GATEWAYS.map((gateway) => {
                        const isSelected = selectedGateway === gateway.id;

                        return (
                          <button
                            key={gateway.id}
                            type="button"
                            onClick={() => setSelectedGateway(gateway.id)}
                            className={`w-full text-left border rounded-sm p-4 transition
                              ${
                                isSelected
                                  ? "border-[#CBA61F] bg-[#fff9e8]"
                                  : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm font-medium text-black">{gateway.label}</p>
                                <p className="text-xs text-gray-500 mt-1">{gateway.description}</p>
                              </div>
                              <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0
                                  ${
                                    isSelected
                                      ? "border-[#CBA61F] bg-[#CBA61F]"
                                      : "border-gray-300 bg-white"
                                  }`}
                              >
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={handleGatewayContinue}
                      disabled={loading || !orderId}
                      className="w-full bg-[#3D1613] text-off-white py-3.5 text-xs tracking-[0.2em] font-semibold hover:bg-[#5a2019] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          PREPARING PAYMENT...
                        </>
                      ) : (
                        `CONTINUE WITH ${selectedGateway === "ziina" ? "ZIINA" : "STRIPE"}`
                      )}
                    </button>

                    {selectedGateway === "ziina" && paymentUrl && (
                      <p className="text-xs text-gray-500">
                        If you are not redirected automatically,{" "}
                        <a href={paymentUrl} className="underline">
                          continue to Ziina
                        </a>
                        .
                      </p>
                    )}
                  </div>
                )}

                {clientSecret && (
                  <StripeProvider clientSecret={clientSecret}>
                    <StripePaymentForm
                      orderId={orderId ?? localStorage.getItem("last_order_id")}
                      onSuccess={(id) => navigate(`/order-success/${id}`)}
                    />
                  </StripeProvider>
                )}
              </>
            )}
          </div>

          {/* ============ RIGHT — Order Summary ============ */}
          <div className="rounded-lg overflow-hidden shadow-sm" style={{ background: "#3D1613" }}>
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-sm tracking-[0.2em] font-semibold text-[#FFCA0A] uppercase">Order Summary</h3>
            </div>

            {/* Cart items */}
            <div className="px-6 py-4 space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
              {cart.length === 0 ? (
                <p className="text-off-white-50 text-sm text-center py-4">Your cart is empty</p>
              ) : (
                cart.map((p) => (
                  <div
                    key={p.cartKey ?? `${p.id}-${p.selectedSize ?? "default"}`}
                    className="flex gap-3 pb-4 border-b border-white/10 last:border-0"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center shrink-0">
                      <img src={p.images?.[0]} className="w-10 h-10 object-contain" alt={p.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-off-white text-xs font-medium tracking-wide leading-snug line-clamp-2">{p.name}</p>
                      {p.selectedSize && <p className="text-off-white-50 text-[11px] mt-0.5">Size: {p.selectedSize}</p>}
                      <p className="text-off-white-50 text-[11px] mt-0.5">Qty: {p.qty}</p>
                      <p className="text-[#FFCA0A] text-sm font-semibold mt-0.5">{p.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="px-6 py-5 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-off-white-70 text-xs">
                <span>Subtotal</span>
                <span className="text-off-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-off-white-70 text-xs">
                <span>Shipping</span>
                <span className="text-[#FFCA0A] font-medium">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-off-white text-sm font-semibold tracking-wide">Total</span>
                <span className="text-[#FFCA0A] text-base font-bold">${total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

