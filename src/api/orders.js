import axiosInstance from "./axios";

export const fetchOrdersAPI = () => axiosInstance.get("/orders/");
