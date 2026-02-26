import axiosInstance from "./axios";

export const toggleWishlistAPI = (productId) =>
  axiosInstance.post("/wishlist/add/", { product_id: productId });
