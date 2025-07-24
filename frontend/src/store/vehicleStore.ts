import { create } from 'zustand';
import type { Vehicle } from '../types';
import { api } from '../services/api';

interface VehicleStore {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  isLoading: boolean;
  error: string | null;
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
  
  // Actions
  setVehicles: (vehicles: Vehicle[]) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // API Actions
  fetchVehicles: () => Promise<void>;
  createVehicle: (vehicle: Omit<Vehicle, 'id' | 'updated_at'>) => Promise<void>;
  updateVehicle: (id: number, vehicle: Partial<Omit<Vehicle, 'id' | 'updated_at'>>) => Promise<void>;
  deleteVehicle: (id: number) => Promise<void>;
  calculateStats: () => void;
}

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: [],
  selectedVehicle: null,
  isLoading: false,
  error: null,
  stats: {
    total: 0,
    active: 0,
    inactive: 0,
  },
  
  setVehicles: (vehicles) => {
    // Ensure vehicles is always an array
    const vehicleArray = Array.isArray(vehicles) ? vehicles : [];
    set({ vehicles: vehicleArray });
    get().calculateStats();
  },
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  fetchVehicles: async () => {
    console.log('🚗 VehicleStore: Starting fetch vehicles...');
    set({ isLoading: true, error: null });
    try {
      console.log('🔄 VehicleStore: Making API call to /vehicles');
      const response = await api.get('/vehicles');
      console.log('📡 VehicleStore: API response:', response);
      console.log('📊 VehicleStore: Response data:', response.data);
      
      // Handle both direct array and wrapped response
      const vehiclesData = response.data.data || response.data;
      
      if (!Array.isArray(vehiclesData)) {
        throw new Error('Invalid response format: expected array of vehicles');
      }
      
      set({ vehicles: vehiclesData });
      get().calculateStats();
      console.log('✅ VehicleStore: Vehicles set successfully');
    } catch (error: unknown) {
      console.error('❌ VehicleStore: Error fetching vehicles:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch vehicles';
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
  
  createVehicle: async (vehicleData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/vehicles', vehicleData);
      const currentVehicles = get().vehicles;
      set({ vehicles: [...currentVehicles, response.data] });
      get().calculateStats();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create vehicle';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  updateVehicle: async (id, vehicleData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/vehicles/${id}`, vehicleData);
      const currentVehicles = get().vehicles;
      const updatedVehicles = currentVehicles.map(vehicle => 
        vehicle.id === id ? response.data : vehicle
      );
      set({ vehicles: updatedVehicles });
      get().calculateStats();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update vehicle';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  deleteVehicle: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/vehicles/${id}`);
      const currentVehicles = get().vehicles;
      const filteredVehicles = currentVehicles.filter(vehicle => vehicle.id !== id);
      set({ vehicles: filteredVehicles });
      get().calculateStats();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete vehicle';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  calculateStats: () => {
    const vehicles = get().vehicles;
    
    // Ensure vehicles is an array
    if (!Array.isArray(vehicles)) {
      console.warn('⚠️ calculateStats: vehicles is not an array:', vehicles);
      set({ stats: { total: 0, active: 0, inactive: 0 } });
      return;
    }
    
    const total = vehicles.length;
    const active = vehicles.filter(v => v.status === 'ACTIVE').length;
    const inactive = vehicles.filter(v => v.status === 'INACTIVE').length;
    
    set({ stats: { total, active, inactive } });
  },
}));
