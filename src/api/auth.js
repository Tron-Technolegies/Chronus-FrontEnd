import axiosInstance from "../api/axios";

export const registerAPI = (data) => {
  return axiosInstance.post("/signup/", data);
};

export const loginAPI = (data) => {
  return axiosInstance.post("/login/", data);
};

export const getProfileAPI = () => axiosInstance.get("/profile/");

export const updateProfileAPI = (data) => axiosInstance.put("/profile/", data);

export const changePasswordAPI = (data) => axiosInstance.post("/reset-password/", data);

export const forgotPasswordAPI = (data) => axiosInstance.post("/forgot-password/", data);

export const resetPasswordAPI = (data) => axiosInstance.post("/reset-password/", data);

export const getAddressesAPI = () => axiosInstance.get("/addresses/");

export const addAddressAPI = (data) => axiosInstance.post("/addresses/add/", data);

export const updateAddressAPI = (id, data) => axiosInstance.put(`/addresses/${id}/update/`, data);

export const deleteAddressAPI = (id) => axiosInstance.delete(`/addresses/${id}/delete/`);
