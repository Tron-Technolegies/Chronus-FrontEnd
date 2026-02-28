import axiosInstance from "./axios";

export const addToCartAPI = (productId, quantity = 1) =>
  axiosInstance.post("/cart/add/", { product_id: productId, quantity });

export const fetchCartAPI = () => axiosInstance.get("/cart/");

export const removeCartItemAPI = (productId) =>
  axiosInstance.delete(`/cart/remove/${productId}/`);

export const clearCartAPI = () => axiosInstance.delete("/cart/clear/");

