import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function StripePaymentForm({ orderId, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const submitResult = await elements.submit();
    if (submitResult.error) {
      setError(submitResult.error.message || "Please check your payment details.");
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message || "Payment failed. Please try again.");
    } else if (result.paymentIntent?.status === "succeeded") {
      onSuccess(orderId);
    } else {
      setError("Payment is processing. Please wait a moment and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-sm p-4 bg-white focus-within:border-[#CBA61F] focus-within:ring-1 focus-within:ring-[#CBA61F] transition-all">
        <PaymentElement
          options={{
            layout: "tabs",
            paymentMethodOrder: ["card"],
          }}
        />
      </div>

      <p className="text-[11px] text-gray-400 flex items-center gap-1">
        Card details are handled securely by Stripe. We never see your full card data.
      </p>

      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          {error}
        </p>
      )}

      <button
        onClick={handlePay}
        disabled={loading || !stripe || !elements}
        className="w-full bg-[#3D1613] text-off-white py-3.5 text-xs tracking-[0.2em] font-semibold hover:bg-[#5a2019] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            PROCESSING...
          </>
        ) : (
          "PAY NOW"
        )}
      </button>
    </div>
  );
}
