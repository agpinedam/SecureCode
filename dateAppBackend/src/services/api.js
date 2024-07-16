import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

export const login = (username, password) => {
  return api.post('/auth/login', { username, password });
};

export const formatDate = (format) => {
  return api.post('/api/format', { format });
};
