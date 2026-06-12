import axiosInstance from "./axios";

export const createPaymentIntentAPI = (orderId, currency = null) =>
  axiosInstance.post("/payments/create-intent/", {
    order_id: orderId,
    ...(currency ? { currency } : {}),
  });

export const createZiinaPaymentAPI = (orderId, currency = null) =>
  axiosInstance.post("/payments/ziina/create/", {
    order_id: orderId,
    ...(currency ? { currency } : {}),
  });

export const createTabbyPaymentAPI = (orderId, customerData = {}) =>
  axiosInstance.post("/payments/tabby/", {
    order_id: orderId,
    name: customerData.name || "",
    city: customerData.city || "",
    country: customerData.country || "",
  });
