import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { Vehicle } from '../types';

// ✅ Environment variable name sudah benar
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://vehicle-tracker-production-f186.up.railway.app/api'
    : 'http://localhost:5000/api');

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response format
api.interceptors.response.use(
  (response) => {
    // If response has success field, return the data
    if (response.data && response.data.success !== undefined) {
      return { ...response, data: response.data.data || response.data };
    }
    return response;
  },
  (error) => {
    // Handle error responses
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);

export const vehicleApi = {
  getAllVehicles: async (): Promise<Vehicle[]> => {
    const response = await api.get('/vehicles');
    return response.data;
  },
  
  getVehicleById: async (id: number): Promise<Vehicle> => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },
};