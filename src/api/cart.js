import axiosInstance from "./axios";

const getGuestPayload = () => {
  const accessToken = localStorage.getItem("accessToken");
  const guestId = localStorage.getItem("guest_id");

  if (accessToken || !guestId) {
    return {};
  }

  return { guest_id: guestId };
};

export const addToCartAPI = async (productId, quantity = 1) => {
  const guestPayload = getGuestPayload();

  try {
    return await axiosInstance.post("/cart/add/", {
      product_id: productId,
      quantity,
      ...guestPayload,
    });
  } catch (err) {
    const status = err?.response?.status;
    if (status !== 400) throw err;

    // Backward-compatible retry for APIs expecting `qty` instead of `quantity`.
    return axiosInstance.post("/cart/add/", {
      product_id: productId,
      qty: quantity,
      ...guestPayload,
    });
  }
};

export const fetchCartAPI = () => axiosInstance.get("/cart/", { params: getGuestPayload() });

export const removeCartItemAPI = (productId) =>
  axiosInstance.delete(`/cart/remove/${productId}/`, {
    params: getGuestPayload(),
    data: getGuestPayload(),
  });

