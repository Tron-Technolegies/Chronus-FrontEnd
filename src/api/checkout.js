import axiosInstance from "./axios";

export const placeOrderAPI = (payload) => {
  return axiosInstance.post("/checkout/", payload);
};

export const applyCouponAPI = (order_id, coupon_code) =>
  axiosInstance.post("/coupon/apply/", { order_id, coupon_code });

