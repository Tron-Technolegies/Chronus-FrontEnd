import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "14px",
      color: "#1a1a1a",
      fontFamily: "inherit",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#ef4444" },
  },
};

export default function StripePaymentForm({ orderId, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const clientSecret = sessionStorage.getItem("payment_client_secret");

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent?.status === "succeeded") {
      onSuccess(orderId);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Stripe CardElement */}
      <div className="border border-gray-200 rounded-sm p-4 bg-white focus-within:border-[#CBA61F] focus-within:ring-1 focus-within:ring-[#CBA61F] transition-all">
        <CardElement options={CARD_STYLE} />
      </div>

      <p className="text-[11px] text-gray-400 flex items-center gap-1">
        🔒 Card details handled securely by Stripe — we never see your card data.
      </p>

      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          ⚠ {error}
        </p>
      )}

      <button
        onClick={handlePay}
        disabled={loading || !stripe}
        className="w-full bg-[#3D1613] text-white py-3.5 text-xs tracking-[0.2em] font-semibold hover:bg-[#5a2019] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            PROCESSING…
          </>
        ) : (
          "PAY NOW"
        )}
      </button>
    </div>
  );
}
