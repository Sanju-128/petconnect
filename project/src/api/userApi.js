import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data?.message || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Registration failed'
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data?.message || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed'
    };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  return { success: true };
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.success ? response.data.user : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};