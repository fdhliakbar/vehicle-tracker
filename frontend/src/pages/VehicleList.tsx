import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { VehicleCard } from '../components/VehicleCard';
import { HeroSection } from '../components/HeroSection';
import { useVehicleStore } from '../store/vehicleStore';
import type { Vehicle } from '../types';

export function VehicleList() {
  const { vehicles, setVehicles, setSelectedVehicle } = useVehicleStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, [setVehicles]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/vehicles');
      const data = await response.json();
      
      if (data.success) {
        setVehicles(data.data);
      } else {
        setError('Failed to fetch vehicles');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

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
    <>
      {/* Hero Section - hanya tampil di homepage */}
      <Layout>
      <HeroSection />
        <div className="space-y-6" id="vehicles-section">
          {/* Page Header with improved design */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2">Fleet Overview</h2>
                <p className="text-blue-100">Monitor and manage your vehicle fleet in real-time</p>
              </div>
              <div className="flex space-x-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{activeCount}</div>
                  <div className="text-sm text-blue-100">Active</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{inactiveCount}</div>
                  <div className="text-sm text-blue-100">Inactive</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{vehicles.length}</div>
                  <div className="text-sm text-blue-100">Total</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter with improved design */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search vehicles by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <span className="text-gray-600 font-medium">Loading vehicles...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md mx-auto">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-medium">Error</span>
                </div>
                <p className="mb-4">{error}</p>
                <button
                  onClick={fetchVehicles}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Vehicle Grid with animation */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVehicles.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="opacity-0"
                  style={{ 
                    animation: `slideInFromBottom 0.6s ease-out ${index * 0.1}s forwards`
                  }}
                >
                  <VehicleCard
                    vehicle={vehicle}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredVehicles.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('ALL');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
