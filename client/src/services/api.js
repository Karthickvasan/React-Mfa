import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Your backend URL
  withCredentials: true,           // Needed to send cookies/session
});

export default api;
