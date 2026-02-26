import axiosInstance from "./axios";

/**
 * POST /checkout/
 * payload: { address, city, postal_code, country, phone, email, first_name, last_name }
 */
export const placeOrderAPI = (payload) =>
  axiosInstance.post("/checkout/", payload);
