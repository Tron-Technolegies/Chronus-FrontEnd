import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/admin/",
});

export const BASE_URL = "http://127.0.0.1:8000";
