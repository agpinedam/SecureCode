import axios from 'axios';

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/auth/login',
      credentials,
    );
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const formatDate = async (date) => {
  try {
    const response = await axios.post('http://localhost:5000/api/formatDate', {
      date,
    });
    return response.data;
  } catch (error) {
    console.error('Error formatting date:', error);
    throw error;
  }
};
