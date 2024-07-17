// dateAppFrontend/src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Interceptor para añadir el token a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const login = (username, password) => {
  return api.post('/auth/login', { username, password });
};

export const formatDate = (format) => {
  return api.post('/api/formatDate', { format });
};
