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
