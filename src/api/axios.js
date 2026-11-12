import axios from "axios";
import { ensureGuestId } from "../hooks/useGuestId";
import { getActiveCurrency } from "../utils/currency";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-Guest-ID"] = ensureGuestId();

  if (config.method === "get") {
    const currency = getActiveCurrency();
    config.params = { ...config.params, currency };
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
