import { useState, useCallback } from "react";
import { placeOrderAPI } from "../api/checkout";
import { createPaymentIntentAPI } from "../api/payment";
export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const submit = useCallback(async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const orderRes = await placeOrderAPI(formData);
      const id = orderRes.data?.order_id ?? orderRes.data?.id;

      if (!id) throw new Error("No order ID returned from server.");

      localStorage.setItem("last_order_id", String(id));
      setOrderId(id);

      const paymentRes = await createPaymentIntentAPI(id);
      const secret = paymentRes.data?.client_secret;

      if (!secret) throw new Error("Payment setup failed. Please try again.");

      setClientSecret(secret);
      sessionStorage.setItem("payment_client_secret", secret);

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
  }, []);

  return { submit, loading, error, clientSecret, orderId };
}
