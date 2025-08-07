// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7001",
  withCredentials: true,
});

export default api; // ✅ default export
