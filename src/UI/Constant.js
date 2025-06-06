import axios from "axios";
export const PAGE_SIZE = 3;

export const API_BASE_URL = "https://shopnix-backend.onrender.com/api/v1";
// export const API_BASE_URL = "http://localhost:3000/api/v1";

// FRONTEND_URL=https://shopnix.onrender.com
// BACKEND_URL=https://shopnix-backend.onrender.com
// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // Ensure cookies (JWT) are sent
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
