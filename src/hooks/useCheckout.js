import { useState, useCallback } from "react";
import { placeOrderAPI } from "../api/checkout";
import { createPaymentIntentAPI } from "../api/payment";

const COUNTRY_TO_CURRENCY = {
  India: "inr",
  UAE: "aed",
  USA: "usd",
  UK: "gbp",
};

const normalizeCurrency = (value) => {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  return /^[a-z]{3}$/.test(normalized) ? normalized : null;
};

const resolveCurrency = (formData) => {
  const fromForm = normalizeCurrency(formData?.currency);
  if (fromForm) return fromForm;

  const fromCountry = normalizeCurrency(COUNTRY_TO_CURRENCY[formData?.country]);
  if (fromCountry) return fromCountry;

  return "usd";
};

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

      const currency = resolveCurrency(formData);
      const paymentRes = await createPaymentIntentAPI(id, currency);
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
