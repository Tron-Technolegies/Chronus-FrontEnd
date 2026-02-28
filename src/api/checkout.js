import axiosInstance from "./axios";

export const placeOrderAPI = (payload) => {
  const guestId = localStorage.getItem("guest_id");
  return axiosInstance.post("/checkout/", {
    ...payload,
    ...(guestId ? { guest_id: guestId } : {}),
  });
};

export const applyCouponAPI = (order_id, coupon_code) =>
  axiosInstance.post("/coupon/apply/", { order_id, coupon_code });

