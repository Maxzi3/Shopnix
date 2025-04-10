import axios from "axios";

export const API_BASE_URL = "http://127.0.0.1:3000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensure cookies (JWT) are sent
  headers: {
    "Content-Type": "application/json",
  },
});
export const PAGE_SIZE = 2;