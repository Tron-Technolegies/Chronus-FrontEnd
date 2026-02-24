import axiosInstance from "./axios";

export const registerAPI = (data) => {
  return axiosInstance.post("/signup/", data);
};

export const loginAPI = (data) => {
  return axiosInstance.post("/login/", data);
};