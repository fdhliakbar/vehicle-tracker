import { useState, useEffect } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import type { Vehicle, VehicleStatus } from '../types';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle | null;
  mode: 'create' | 'edit';
}

export function VehicleModal({ isOpen, onClose, vehicle, mode }: VehicleModalProps) {
  const { createVehicle, updateVehicle, isLoading } = useVehicleStore();
  
  const [formData, setFormData] = useState({
    name: '',
    status: 'ACTIVE' as VehicleStatus,
    fuel_level: 100,
    odometer: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vehicle && mode === 'edit') {
      setFormData({
        name: vehicle.name,
        status: vehicle.status,
        fuel_level: vehicle.fuel_level,
        odometer: vehicle.odometer,
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
        speed: vehicle.speed,
      });
    } else {
      setFormData({
        name: '',
        status: 'ACTIVE',
        fuel_level: 100,
        odometer: 0,
        latitude: 0,
        longitude: 0,
        speed: 0,
      });
    }
    setErrors({});
  }, [vehicle, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vehicle name is required';
    }
    
    if (formData.fuel_level < 0 || formData.fuel_level > 100) {
      newErrors.fuel_level = 'Fuel level must be between 0 and 100';
    }
    
    if (formData.odometer < 0) {
      newErrors.odometer = 'Odometer cannot be negative';
    }
    
    if (formData.speed < 0) {
      newErrors.speed = 'Speed cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (mode === 'create') {
        await createVehicle(formData);
      } else if (vehicle) {
        await updateVehicle(vehicle.id, formData);
      }
      onClose();
    } catch (error) {
      // Error is handled in the store
      console.error('Error submitting form:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'create' ? 'Add New Vehicle' : 'Edit Vehicle'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter vehicle name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as VehicleStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Level (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.fuel_level}
                onChange={(e) => setFormData({ ...formData, fuel_level: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fuel_level ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 75.5"
              />
              {errors.fuel_level && <p className="text-red-500 text-sm mt-1">{errors.fuel_level}</p>}
            </div>              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speed (km/h)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.speed}
                  onChange={(e) => setFormData({ ...formData, speed: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.speed ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 60.5"
                />
                {errors.speed && <p className="text-red-500 text-sm mt-1">{errors.speed}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Odometer (km)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.odometer}
                onChange={(e) => setFormData({ ...formData, odometer: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.odometer ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 12345.5"
              />
              {errors.odometer && <p className="text-red-500 text-sm mt-1">{errors.odometer}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., -6.2088"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 106.8456"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Saving...' : mode === 'create' ? 'Add Vehicle' : 'Update Vehicle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
