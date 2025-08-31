import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://main-website-7au1.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("xpr_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("xpr_token");
      localStorage.removeItem("xpr_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
