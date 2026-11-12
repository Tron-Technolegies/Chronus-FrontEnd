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

export const createTabbyPaymentAPI = (orderId, customerData = {}) => {
  const fullName =
    customerData.full_name ||
    customerData.name ||
    `${customerData.first_name || ""} ${customerData.last_name || ""}`.trim();

  return axiosInstance.post("/payments/tabby/", {
    order_id: orderId,
    name: fullName,
    email: customerData.email || "",
    phone: customerData.phone || "",
    city: customerData.city || "",
    country: customerData.country || "",
  });
};
