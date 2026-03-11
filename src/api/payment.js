import axiosInstance from "./axios";

export const createPaymentIntentAPI = (orderId, currency = null) =>
  axiosInstance.post("/payments/create-intent/", {
    order_id: orderId,
    ...(currency ? { currency } : {}),
  });
