import axiosInstance from "./axios";

export const fetchProductsAPI = (params = {}) => axiosInstance.get("/products/", { params });

export const fetchProductByIdAPI = (id) => axiosInstance.get(`/products/${id}/`);

export const getCategories = () => axiosInstance.get(`/view_categories/`);

export const getProductsByCategory = (categoryId, options = {}) => {
  const { type = null, page = null, limit = null } = options ?? {};

  return fetchProductsAPI({
    category: categoryId,
    ...(type ? { type } : {}),
    ...(page ? { page } : {}),
    ...(limit ? { limit } : {}),
  });
};

export const addReviewAPI = (data) => axiosInstance.post("/review/add/", data);

