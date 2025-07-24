import axios from 'axios';
import type { Vehicle } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
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

// Mock data untuk development
export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Fleet Truck 001",
    status: "ACTIVE",
    fuel_level: 85,
    odometer: 125400,
    latitude: -6.2088,
    longitude: 106.8456,
    speed: 45,
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Delivery Van 002",
    status: "INACTIVE",
    fuel_level: 23,
    odometer: 98200,
    latitude: -6.1751,
    longitude: 106.8650,
    speed: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Cargo Truck 003",
    status: "ACTIVE",
    fuel_level: 67,
    odometer: 156800,
    latitude: -6.2297,
    longitude: 106.8200,
    speed: 32,
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Service Van 004",
    status: "ACTIVE",
    fuel_level: 91,
    odometer: 87300,
    latitude: -6.1944,
    longitude: 106.8229,
    speed: 28,
    updated_at: new Date().toISOString(),
  },
];
