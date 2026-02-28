import axiosInstance from "./axios";

export const fetchProductsAPI = () => axiosInstance.get("/products/");

export const fetchProductByIdAPI = (id) => axiosInstance.get(`/products/${id}/`);

export const getCategories = () => axiosInstance.get(`/view_categories/`);

export const getProductsByCategory = (categoryId) =>
  axiosInstance.get(`/products/?category=${categoryId}`);

export const addReviewAPI = (data) => axiosInstance.post("/review/add/", data);

