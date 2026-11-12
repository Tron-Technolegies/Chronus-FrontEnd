import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { getShippingPartnersAPI } from "../api/checkout";
import { addAddressAPI, updateAddressAPI } from "../api/auth";
import { formatMoney, getActiveCurrency, parseAmount } from "../utils/currency";
import { extractErrorMessage } from "../utils/errorHandler";
import { FiPackage, FiCreditCard, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import ShippingForm from "../components/checkout/ShippingForm";
import OrderReview from "../components/checkout/OrderReview";
import StripeProvider from "../providers/StripeProvider";
import StripePaymentForm from "../components/checkout/StripePaymentForm";

// ── Steps: 1 Shipping → 2 Review → 3 Payment ──────────────────────────────
const STEPS = [
  { label: "Shipping", icon: FiPackage },
  { label: "Review", icon: FiCheckCircle },
  { label: "Payment", icon: FiCreditCard },
];

const INITIAL_FORM = {
  address_id: "",
  first_name: "",
  last_name: "",
  email: "",
  address_line_1: "",
  address_line_2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const PAYMENT_GATEWAYS = [
  {
    id: "stripe",
    label: "Stripe/Card Payment",
    description: "Pay by card with Stripe's secure checkout form.",
  },
  {
    id: "ziina",
    label: "Ziina",
    description: "Continue to Ziina to complete your payment.",
  },
  {
    id: "tabby",
    label: "Tabby",
    description: "Split your purchase into 4 interest-free payments.",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/;

function validateShipping(form) {
  const errs = {};
  if (!form.email?.trim()) errs.email = "Email is required";
  else if (!EMAIL_RE.test(form.email)) errs.email = "Enter a valid email address";

  if (form.address_id) {
    return errs;
  }

  if (!form.first_name?.trim()) errs.first_name = "First name is required";
  if (!form.last_name?.trim()) errs.last_name = "Last name is required";
  if (!form.address_line_1?.trim()) errs.address_line_1 = "Street address is required";
  else if (form.address_line_1.trim().length > 45) errs.address_line_1 = "Address must be 45 characters or less";
  if (!form.city?.trim()) errs.city = "City is required";
  if (!form.state?.trim()) errs.state = "State/Province is required";
  if (!form.postal_code?.trim()) errs.postal_code = "Postal code is required";
  if (!form.country) errs.country = "Please select a country";
  if (!form.phone?.trim()) errs.phone = "Phone number is required";
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
  const [paymentCurrency, setPaymentCurrency] = useState("AED");
  const [activeCurrency, setActiveCurrency] = useState(getActiveCurrency());

  // Shipping partners (managed in the admin dashboard)
  const [partners, setPartners] = useState([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [partnerError, setPartnerError] = useState("");

  const {
    submit,
    startStripePayment,
    startZiinaPayment,
    startTabbyPayment,
    loading,
    error,
    clientSecret,
    orderId,
    paymentUrl,
    orderTotals,
  } = useCheckout();

  const subtotalNum = Number(subtotal);

  // Before the order exists use the active currency; after it, the backend's currency.
  const displayCurrency = (orderTotals?.currency ?? activeCurrency ?? "AED")
    .toString()
    .toUpperCase();

  const selectedPartner = partners.find((p) => p.id === selectedPartnerId);
  const previewShipping = selectedPartner
    ? parseAmount(selectedPartner.shipping_charge)
    : null;

  // Before the order exists, show the selected partner's charge.
  // After it, use the backend's authoritative figures.
  const shippingAmount = orderTotals ? orderTotals.shippingCharge : previewShipping;

  const shippingText =
    shippingAmount === null
      ? "Select a partner"
      : shippingAmount > 0
        ? formatMoney(shippingAmount, displayCurrency)
        : "Free";

  const subtotalText = formatMoney(
    orderTotals?.subtotal ?? subtotal,
    displayCurrency,
  );

  const totalText = formatMoney(
    orderTotals
      ? orderTotals.amount
      : Number.isFinite(subtotalNum)
        ? subtotalNum + (previewShipping ?? 0)
        : subtotal,
    displayCurrency,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setForm((f) => ({ ...f, email: user.email || "" }));
      } catch (e) {}
    }
  }, []);

  // Sync activeCurrency when changed in other tabs or components
  useEffect(() => {
    const handleCurrencyChange = () => {
      setActiveCurrency(getActiveCurrency());
    };
    window.addEventListener("currencyChange", handleCurrencyChange);
    window.addEventListener("storage", handleCurrencyChange);
    return () => {
      window.removeEventListener("currencyChange", handleCurrencyChange);
      window.removeEventListener("storage", handleCurrencyChange);
    };
  }, []);

  // Load available shipping partners (refetch when activeCurrency changes)
  useEffect(() => {
    setPartnersLoading(true);
    setPartnerError("");
    getShippingPartnersAPI(activeCurrency)
      .then((res) => {
        const rawList = Array.isArray(res.data)
          ? res.data
          : (res.data?.results || res.data?.shipping_partners || res.data?.data || []);

        // Filter only available shipping partners
        const availablePartners = rawList.filter((p) => {
          if (p.is_active === false || p.is_available === false || p.available === false) {
            return false;
          }
          if (typeof p.status === "string" && p.status.toLowerCase() === "inactive") {
            return false;
          }
          return true;
        });

        setPartners(availablePartners);

        // Auto-select if only 1 partner, or ensure selectedPartnerId is still in list
        if (availablePartners.length === 1) {
          setSelectedPartnerId(availablePartners[0].id);
        } else if (selectedPartnerId && !availablePartners.some((p) => p.id === selectedPartnerId)) {
          setSelectedPartnerId(null);
        }
      })
      .catch((err) => {
        setPartnerError(extractErrorMessage(err, "Could not load shipping options."));
      })
      .finally(() => setPartnersLoading(false));
  }, [activeCurrency]);

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

  // Add a new address, or update an existing one when editingId is set
  const handleSaveAddress = async (editingId = null, isDefault = false) => {
    const errs = validateShipping({ ...form, address_id: "" });
    setTouched(Object.keys(INITIAL_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      throw new Error("Please fix the highlighted fields first.");
    }

    const payload = {
      full_name: `${form.first_name || ""} ${form.last_name || ""}`.trim(),
      address_line_1: form.address_line_1,
      address_line_2: form.address_line_2,
      city: form.city,
      state: form.state,
      postal_code: form.postal_code,
      country: form.country,
      phone: form.phone,
      is_default: isDefault,
    };

    try {
      const res = editingId
        ? await updateAddressAPI(editingId, payload)
        : await addAddressAPI(payload);

      return res.data;
    } catch (err) {
      throw new Error(extractErrorMessage(err, "Could not save address."));
    }
  };

  // Step 1 → 2
  const handleContinueToReview = () => {
    const errs = validateShipping(form);
    setTouched(Object.keys(INITIAL_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    setFieldErrors(errs);

    if (!selectedPartnerId || !partners.some((p) => p.id === selectedPartnerId)) {
      setPartnerError("Please select a shipping method");
      return;
    }

    if (Object.keys(errs).length === 0) setStep(2);
  };

  // Step 2 → 3: Place Order with backend validation
  const handlePlaceOrder = async () => {
    if (loading || cart.length === 0) return;
    try {
      const result = await submit({
        ...form,
        shipping_partner_id: selectedPartnerId,
      });
      setPaymentCurrency(result?.currency ?? activeCurrency ?? "AED");
      setStep(3);
    } catch {
      // error shown in hook
    }
  };

  const handleGatewayContinue = async () => {
    if (!orderId || loading) return;

    try {
      if (selectedGateway === "tabby") {
        const result = await startTabbyPayment(orderId, form);
        const targetUrl = result?.paymentUrl;

        if (targetUrl) {
          window.location.replace(targetUrl);
        } else {
          console.error("Tabby redirect failed", result);
        }
        return;
      }

      if (selectedGateway === "ziina") {
        const result = await startZiinaPayment(orderId, "AED"); // Ziina processes in AED
        const targetUrl = result?.paymentUrl;

        if (targetUrl) {
          window.location.replace(targetUrl);
        } else {
          console.error("Ziina redirect failed", result);
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
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-16">
        <p className="text-xs text-gray-400 mb-6 tracking-wide">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-600">Checkout</span>
        </p>

        <h1 className="text-xl sm:text-2xl tracking-[0.15em] font-medium mb-8">Secure Checkout</h1>

        {/* ─── Step Indicator ─── */}
        <div className="flex items-center mb-10 max-w-sm w-full overflow-x-auto pb-1">
          {STEPS.map((s, i) => {
            const active = step === i + 1;
            const done = step > i + 1;
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${done ? "bg-[#CBA61F] text-off-white" : active ? "bg-[#3D1613] text-[#CBA61F]" : "bg-gray-200 text-gray-400"}`}
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
                setForm={setForm}
                touched={touched}
                fieldErrors={fieldErrors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                onContinue={handleContinueToReview}
                partners={partners}
                partnersLoading={partnersLoading}
                selectedPartnerId={selectedPartnerId}
                onSelectPartner={(id) => {
                  setSelectedPartnerId(id);
                  setPartnerError("");
                }}
                partnerError={partnerError}
                currency={displayCurrency}
                onSaveAddress={handleSaveAddress}
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
                  <h2 className="text-sm tracking-[0.15em] font-medium uppercase">
                    Payment Details
                  </h2>
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
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
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
                        `CONTINUE WITH ${selectedGateway === "ziina" ? "ZIINA" : selectedGateway === "tabby" ? "TABBY" : "STRIPE"}`
                      )}
                    </button>

                    {(selectedGateway === "ziina" || selectedGateway === "tabby") && paymentUrl && (
                      <p className="text-xs text-gray-500">
                        If you are not redirected automatically,{" "}
                        <a href={paymentUrl} className="underline">
                          continue to {selectedGateway === "ziina" ? "Ziina" : "Tabby"}
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
                      totals={orderTotals}
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
              <h3 className="text-sm tracking-[0.2em] font-semibold text-[#FFCA0A] uppercase">
                Order Summary
              </h3>
            </div>

            {/* Cart items */}
            <div className="px-6 py-4 space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
              {cart.length === 0 ? (
                <p className="text-off-white-50 text-sm text-center py-4">Your cart is empty</p>
              ) : (
                cart.map((p) => (
                  <div
                    key={p.cartItemId ?? p.cartKey ?? `${p.id}-${p.selectedSize ?? "default"}`}
                    className="flex gap-3 pb-4 border-b border-white/10 last:border-0"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center shrink-0">
                      <img src={p.image || p.images?.[0]} className="w-10 h-10 object-contain" alt={p.product || p.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-off-white text-xs font-medium tracking-wide leading-snug line-clamp-2">
                        {p.product || p.name}
                      </p>
                      {(p.color || p.selectedColor) && (
                        <p className="text-off-white-50 text-[11px] mt-0.5">
                          Color: {p.color || p.selectedColor}
                        </p>
                      )}
                      {(p.size || p.selectedSize) && (
                        <p className="text-off-white-50 text-[11px] mt-0.5">
                          Size: {p.size || p.selectedSize}
                        </p>
                      )}
                      {(p.frame || p.selectedFrame) && (
                        <p className="text-off-white-50 text-[11px] mt-0.5">
                          Frame: {p.frame || p.selectedFrame}
                        </p>
                      )}
                      {(p.material || p.selectedMaterial) && (
                        <p className="text-off-white-50 text-[11px] mt-0.5">
                          Material: {p.material || p.selectedMaterial}
                        </p>
                      )}
                      {p.variant?.options?.map((opt, i) => (
                        <p key={i} className="text-off-white-50 text-[11px] mt-0.5">
                          {opt.option_name}: {opt.option_value}
                        </p>
                      ))}
                      <p className="text-off-white-50 text-[11px] mt-0.5">Qty: {p.quantity || p.qty}</p>
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
                <span className="text-off-white">{subtotalText}</span>
              </div>
              <div className="flex justify-between text-off-white-70 text-xs">
                <span>
                  Shipping{selectedPartner ? ` (${selectedPartner.name})` : ""}
                </span>
                <span className="text-[#FFCA0A] font-medium">{shippingText}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-off-white text-sm font-semibold tracking-wide">Total</span>
                <span className="text-[#FFCA0A] text-base font-bold">{totalText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
