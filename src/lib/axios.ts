// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://backend-bmp-internal-system.vercel.app/api',
  baseURL: 'http://localhost:8080/api',

  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;