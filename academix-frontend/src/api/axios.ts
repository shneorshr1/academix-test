// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8007/api', // לשנות לפי הפורט שלך
  withCredentials: true
});

export default api;
