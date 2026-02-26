import axiosInstance from "./axios";

export const addToCartAPI = (productId, quantity = 1) =>
  axiosInstance.post("/cart/add/", { product_id: productId, quantity });

export const fetchCartAPI = () => axiosInstance.get("/cart/");
