import { useState, useCallback } from "react";
import { placeOrderAPI } from "../api/checkout";
import { createPaymentIntentAPI } from "../api/payment";
import { useCart } from "../context/CartContext";

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const { clearCart } = useCart();

  const submit = useCallback(
    async (formData) => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Place order
        const orderRes = await placeOrderAPI(formData);
        const id = orderRes.data?.order_id ?? orderRes.data?.id;

        if (!id) throw new Error("No order ID returned from server.");

        // Step 2: Persist order ID for guest tracking
        localStorage.setItem("last_order_id", String(id));
        setOrderId(id);

        // Step 3: Create payment intent
        let secret = null;
        try {
          const paymentRes = await createPaymentIntentAPI(id);
          secret = paymentRes.data?.client_secret;
          if (secret) {
            setClientSecret(secret);
            sessionStorage.setItem("payment_client_secret", secret);
          }
        } catch (payErr) {
          console.warn("Payment intent failed:", payErr?.message);
        }

        // Step 4: Clear local cart
        clearCart();

        // NOTE: We do NOT navigate here.
        // Navigation happens inside StripePaymentForm.onSuccess after Stripe confirms payment.

        return { orderId: id, clientSecret: secret };
      } catch (err) {
        const msg =
          err?.response?.data?.detail ??
          err?.response?.data?.message ??
          err?.message ??
          "Checkout failed. Please try again.";
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [clearCart],
  );

  return { submit, loading, error, clientSecret, orderId };
}
