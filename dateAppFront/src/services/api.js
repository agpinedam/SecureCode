// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { username, password },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchDate = async () => {
  try {
    const response = await axios.get(`${API_URL}/date`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const formatDate = async (format) => {
  try {
    const response = await axios.post(
      `${API_URL}/date/formatDate`,
      { format },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
