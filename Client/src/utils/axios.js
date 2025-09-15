import axios from "axios";
import { getToken } from "./auth";
import { API_URL } from "./api";

const api = axios.create({
  baseURL: API_URL, // 👈 now uses API_URL from config
});

// Automatically add JWT token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
