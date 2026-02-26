import axiosInstance from "./axios";

export const createPaymentIntentAPI = (orderId) =>
  axiosInstance.post("/payments/create-intent/", { order_id: orderId });
