// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8007/api', // לשנות לפי הפורט שלך
  withCredentials: true
});

api.interceptors.request.use((config) => {
  console.log('➡️ Request:', config.method?.toUpperCase(), config.url);
  return config;
});


export default api;
