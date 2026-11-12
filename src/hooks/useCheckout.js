import { useState, useCallback } from "react";
import { placeOrderAPI } from "../api/checkout";
import {
  createPaymentIntentAPI,
  createZiinaPaymentAPI,
  createTabbyPaymentAPI,
} from "../api/payment";
import { getActiveCurrency } from "../utils/currency";
import { extractErrorMessage } from "../utils/errorHandler";

const normalizeCurrency = (value) => {
  if (!value) return null;
  const normalized = String(value).trim().toUpperCase();
  return /^[A-Z]{3}$/.test(normalized) ? normalized : null;
};

const resolveCurrency = () => {
  const current = getActiveCurrency();
  return normalizeCurrency(current) ?? "AED";
};

// Accepts 25, "25.00" or "AED 25.00"
const toNum = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const n = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : null;
};

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paymentGateway, setPaymentGateway] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [orderTotals, setOrderTotals] = useState(null);

  // Create order
  const submit = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    setClientSecret(null);
    setPaymentUrl(null);
    setPaymentGateway(null);
    setOrderTotals(null);

    try {
      const token = localStorage.getItem("accessToken");
      const guestId = localStorage.getItem("guest_id");
      const guestPayload = (!token && guestId) ? { guest_id: guestId } : {};

      const partnerId = formData.shipping_partner_id
        ? Number(formData.shipping_partner_id) || formData.shipping_partner_id
        : null;

      let payload;

      if (formData.address_id) {
        payload = {
          address_id: formData.address_id,
          shipping_address_id: formData.address_id,
          email: formData.email,
          shipping_partner_id: partnerId,
          shipping_partner: partnerId,
          currency: resolveCurrency(),
          ...guestPayload,
        };
      } else {
        const { address_id, ...manualData } = formData;
        const fullName =
          manualData.full_name ||
          `${manualData.first_name || ""} ${manualData.last_name || ""}`.trim();

        payload = {
          ...manualData,
          full_name: fullName,
          shipping_partner_id: partnerId,
          shipping_partner: partnerId,
          currency: resolveCurrency(),
          ...guestPayload,
        };
      }

      const orderRes = await placeOrderAPI(payload);
      const data = orderRes.data ?? {};
      const id = data.order_id ?? data.id;

      if (!id) {
        throw new Error("No order ID returned from server.");
      }

      // Read authoritative amounts calculated by the backend
      const subtotal = toNum(data.subtotal);
      const shippingCharge = toNum(data.shipping_charge);
      const amount = toNum(data.amount ?? data.total_amount ?? data.total);
      const currency = normalizeCurrency(data.currency) ?? resolveCurrency();

      if (subtotal !== null && shippingCharge !== null && amount !== null) {
        setOrderTotals({
          subtotal,
          shippingCharge,
          amount,
          currency,
        });
      }

      localStorage.setItem("last_order_id", String(id));
      setOrderId(id);
      sessionStorage.removeItem("payment_client_secret");

      return {
        orderId: id,
        currency,
        orderTotals: {
          subtotal,
          shippingCharge,
          amount,
          currency,
        },
      };
    } catch (err) {
      const msg = extractErrorMessage(err, "Checkout failed. Please try again.");
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Stripe payment
  const startStripePayment = useCallback(
    async (targetOrderId, currency = null) => {
      setLoading(true);
      setError(null);
      setPaymentUrl(null);

      try {
        const paymentRes = await createPaymentIntentAPI(
          targetOrderId,
          currency ? currency.toLowerCase() : null
        );

        const secret = paymentRes.data?.client_secret;
        if (!secret) {
          throw new Error("Payment setup failed. Please try again.");
        }

        setClientSecret(secret);
        setPaymentGateway("stripe");
        sessionStorage.setItem("payment_client_secret", secret);

        return { clientSecret: secret };
      } catch (err) {
        const msg = extractErrorMessage(err, "Stripe payment setup failed. Please try again.");
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Ziina payment
  const startZiinaPayment = useCallback(
    async (targetOrderId, currency = null) => {
      setLoading(true);
      setError(null);
      setClientSecret(null);

      try {
        const paymentRes = await createZiinaPaymentAPI(
          targetOrderId,
          currency ? currency.toLowerCase() : "aed"
        );

        const url =
          paymentRes.data?.payment_url ??
          paymentRes.data?.checkout_url ??
          paymentRes.data?.redirect_url ??
          paymentRes.data?.url;

        if (!url) {
          throw new Error("Ziina payment setup failed. Please try again.");
        }

        setPaymentGateway("ziina");
        setPaymentUrl(url);

        return { paymentUrl: url };
      } catch (err) {
        const msg = extractErrorMessage(err, "Ziina payment setup failed. Please try again.");
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Tabby payment
  const startTabbyPayment = useCallback(
    async (targetOrderId, customerData = {}) => {
      setLoading(true);
      setError(null);
      setClientSecret(null);

      try {
        const paymentRes = await createTabbyPaymentAPI(
          targetOrderId,
          customerData
        );

        const url =
          paymentRes.data?.payment_url ??
          paymentRes.data?.checkout_url ??
          paymentRes.data?.redirect_url ??
          paymentRes.data?.url ??
          paymentRes.data?.web_url;

        if (!url) {
          throw new Error("Tabby payment setup failed. Please try again.");
        }

        setPaymentGateway("tabby");
        setPaymentUrl(url);

        return { paymentUrl: url };
      } catch (err) {
        const msg = extractErrorMessage(err, "Tabby payment setup failed. Please try again.");
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    submit,
    startStripePayment,
    startZiinaPayment,
    startTabbyPayment,
    loading,
    error,
    clientSecret,
    orderId,
    paymentGateway,
    paymentUrl,
    orderTotals,
  };
}
