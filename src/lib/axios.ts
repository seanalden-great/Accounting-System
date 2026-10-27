// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-bmp-internal-system.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;