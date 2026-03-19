import axiosInstance from "./axios";

const getGuestPayload = () => {
  const accessToken = localStorage.getItem("accessToken");
  const guestId = localStorage.getItem("guest_id");

  if (accessToken || !guestId) {
    return {};
  }

  return { guest_id: guestId };
};

export const addToCartAPI = async (productId, quantity = 1, options = {}) => {
  const guestPayload = getGuestPayload();
  const { sizeId = null, frameId = null, materialId = null } = options;
  const payload = {
    product_id: productId,
    quantity,
    ...(sizeId ? { size_id: sizeId } : {}),
    ...(frameId ? { frame_id: frameId } : {}),
    ...(materialId ? { material_id: materialId } : {}),
    ...guestPayload,
  };

  try {
    return await axiosInstance.post("/cart/add/", payload);
  } catch (err) {
    const status = err?.response?.status;
    if (status !== 400) throw err;

    // Backward-compatible retry for APIs expecting `qty` instead of `quantity`.
    return axiosInstance.post("/cart/add/", {
      ...payload,
      qty: quantity,
    });
  }
};

export const fetchCartAPI = () => axiosInstance.get("/cart/", { params: getGuestPayload() });

export const removeCartItemAPI = (productId) =>
  axiosInstance.delete(`/cart/remove/${productId}/`, {
    params: getGuestPayload(),
    data: getGuestPayload(),
  });

