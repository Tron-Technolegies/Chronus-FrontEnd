import axiosInstance from "../api/axios";

export const registerAPI = (data) => {
  return axiosInstance.post("/signup/", data);
};

export const loginAPI = (data) => {
  return axiosInstance.post("/login/", data);
};

export const getProfileAPI = () => axiosInstance.get("/profile/");

export const updateProfileAPI = (data) => axiosInstance.put("/profile/", data);

export const changePasswordAPI = (data) =>
  axiosInstance.post("/change-password/", data);
