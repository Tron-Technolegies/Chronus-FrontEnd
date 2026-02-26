import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrderAPI } from "../api/checkout";
import { createPaymentIntentAPI } from "../api/payment";
import { useCart } from "../context/CartContext";

/**
 * Orchestrates the checkout → payment → order-success flow.
 *
 * Flow:
 *   1. POST /checkout/  → get order_id
 *   2. Save order_id to localStorage (guest tracking)
 *   3. POST /payments/create-intent/ → get client_secret
 *   4. Store client_secret for future Stripe integration
 *   5. Navigate to /order-success/:id
 *
 * IMPORTANT: We do NOT navigate to /orders before payment succeeds.
 */
export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const submit = useCallback(
    async (formData) => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Place order
        const orderRes = await placeOrderAPI(formData);
        const orderId = orderRes.data?.order_id ?? orderRes.data?.id;

        if (!orderId) throw new Error("No order ID returned from server.");

        // Step 2: Persist order ID for guest tracking
        localStorage.setItem("last_order_id", String(orderId));

        // Step 3: Create payment intent
        let secret = null;
        try {
          const paymentRes = await createPaymentIntentAPI(orderId);
          secret = paymentRes.data?.client_secret;
          if (secret) {
            setClientSecret(secret);
            // Store for future Stripe usage
            sessionStorage.setItem("payment_client_secret", secret);
          }
        } catch (payErr) {
          // Payment intent failure is non-blocking for order creation
          console.warn("Payment intent failed:", payErr?.message);
        }

        // Step 4: Clear local cart
        clearCart();

        // Step 5: Navigate to order success (NOT orders — payment may still be pending)
        navigate(`/order-success/${orderId}`);

        return { orderId, clientSecret: secret };
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
    [clearCart, navigate],
  );

  return { submit, loading, error, clientSecret };
}
