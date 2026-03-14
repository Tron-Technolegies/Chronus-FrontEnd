import axiosInstance from "./axios";

/* Get products with filters */
export const fetchProductsAPI = (params = {}) => axiosInstance.get("/products/", { params });

/* Get single product */
export const fetchProductByIdAPI = (id) => axiosInstance.get(`/products/${id}/`);

/* Get categories */
export const getCategories = () => axiosInstance.get("/view_categories/");

/* Get products by category */
export const getProductsByCategory = (categoryId, options = {}) => {
  const { subcategory = null, page = null, limit = null } = options ?? {};

  return fetchProductsAPI({
    category: categoryId,
    ...(subcategory ? { subcategory } : {}),
    ...(page ? { page } : {}),
    ...(limit ? { limit } : {}),
  });
};

/* Add product review */
export const addReviewAPI = (data) => axiosInstance.post("/review/add/", data);
