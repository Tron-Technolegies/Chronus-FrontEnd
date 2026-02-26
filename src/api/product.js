import axiosInstance from "./axios";

export const fetchProductsAPI = () => axiosInstance.get("/products/");

export const fetchProductByIdAPI = (id) => axiosInstance.get(`/products/${id}/`);

export const getCategories = () => axiosInstance.get(`/view_categories/`);
