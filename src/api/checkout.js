import axiosInstance from "./axios";

export const placeOrderAPI = (payload) => {
  return axiosInstance.post("/checkout/", payload);
};

export const applyCouponAPI = (order_id, coupon_code) =>
  axiosInstance.post("/coupon/apply/", { order_id, coupon_code });

export const getShippingQuoteAPI = () => axiosInstance.get("/shipping-quote/");

export const getShippingPartnersAPI = (currency) =>
  axiosInstance.get("/view_shipping_partners_by_user", {
    params: currency ? { currency } : {},
  });
