import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Puedes ajustar la URL del backend aquí
});

export const login = (username, password) => {
  return api.post('/auth/login', { username, password });
};

export const formatDate = (format) => {
  return api.post('/formatDate', { format });
};
