import axiosInstance from "./axios";

/** GET /orders/ — requires auth */
export const fetchOrdersAPI = () => axiosInstance.get("/orders/");
