import axiosInstance from "./axios";

export const fetchProductsAPI = (params = {}) => axiosInstance.get("/products/", { params });

export const fetchProductByIdAPI = (id) => axiosInstance.get(`/products/${id}/`);

export const getCategories = () => axiosInstance.get(`/view_categories/`);

export const getProductsByCategory = (categoryId, type = null) =>
  fetchProductsAPI({
    category: categoryId,
    ...(type ? { type } : {}),
  });

export const addReviewAPI = (data) => axiosInstance.post("/review/add/", data);

