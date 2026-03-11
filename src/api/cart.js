import axiosInstance from "./axios";

export const addToCartAPI = async (productId, quantity = 1) => {
  try {
    return await axiosInstance.post("/cart/add/", { product_id: productId, quantity });
  } catch (err) {
    const status = err?.response?.status;
    if (status !== 400) throw err;

    // Backward-compatible retry for APIs expecting `qty` instead of `quantity`.
    return axiosInstance.post("/cart/add/", { product_id: productId, qty: quantity });
  }
};

export const fetchCartAPI = () => axiosInstance.get("/cart/");

export const removeCartItemAPI = (productId) =>
  axiosInstance.delete(`/cart/remove/${productId}/`);

