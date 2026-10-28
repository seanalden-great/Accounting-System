// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-bmp-internal-system.vercel.app/api',
  // baseURL: 'https://backend-bmp-internal-system.vercel.app/api',

  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Otomatis tempelkan Token JWT sebelum request dikirim
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;