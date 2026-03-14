import axiosInstance from "./axios";

export const placeOrderAPI = (payload) => {
  const accessToken = localStorage.getItem("accessToken");
  const guestId = localStorage.getItem("guest_id");

  return axiosInstance.post("/checkout/", {
    ...payload,
    ...(!accessToken && guestId ? { guest_id: guestId } : {}),
  });
};

export const applyCouponAPI = (order_id, coupon_code) =>
  axiosInstance.post("/coupon/apply/", { order_id, coupon_code });

