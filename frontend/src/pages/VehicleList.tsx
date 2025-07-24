import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { VehicleCard } from '../components/VehicleCard';
import { useVehicleStore } from '../store/vehicleStore';
import { mockVehicles } from '../services/api';
import type { Vehicle } from '../types';

export function VehicleList() {
  const { vehicles, setVehicles, setSelectedVehicle } = useVehicleStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');

  useEffect(() => {
    // Simulasi loading data dari API
    // Dalam implementasi nyata, gunakan vehicleApi.getAllVehicles()
    setVehicles(mockVehicles);
  }, [setVehicles]);

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    // Navigasi ke detail page (implementasi router nanti)
    console.log('Navigate to vehicle detail:', vehicle.id);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = vehicles.filter(v => v.status === 'ACTIVE').length;
  const inactiveCount = vehicles.filter(v => v.status === 'INACTIVE').length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fleet Overview</h2>
            <p className="text-gray-600 mt-1">Monitor and manage your vehicle fleet</p>
          </div>
          <div className="flex space-x-4">
            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <span className="text-green-800 font-medium">{activeCount} Active</span>
            </div>
            <div className="bg-red-100 px-4 py-2 rounded-lg">
              <span className="text-red-800 font-medium">{inactiveCount} Inactive</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search vehicles by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active Only</option>
                <option value="INACTIVE">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚛</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
