import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { Vehicle } from '../types';

// ✅ Environment variable name sudah benar
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  'https://vehicle-tracker-production-f186.up.railway.app/api';

// Debug: Log API URL untuk troubleshooting
console.log('🔧 DEBUG - API_BASE_URL:', API_BASE_URL);
console.log('🔧 DEBUG - VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('🔧 DEBUG - Environment Mode:', import.meta.env.MODE);

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
    console.log('📡 API Response:', response.data);
    // Keep the original response structure - let the stores handle data extraction
    return response;
  },
  (error) => {
    console.log('❌ API Error:', error.response?.data || error.message);
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