import { useState, useEffect } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import type { Vehicle } from '../types';
import { FloatingHeader } from '../components/FloatingHeader';
import { HeroSection } from '../components/HeroSection';
import { Footer } from '../components/Footer';

interface VehicleListItemProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
  index: number;
}

const VehicleListItem = ({ vehicle, onViewDetails, index }: VehicleListItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const statusColor = vehicle.status === 'ACTIVE' 
    ? 'text-green-700 bg-green-100 border-green-200' 
    : 'text-red-700 bg-red-100 border-red-200';

  return (
    <div 
      className={`relative group transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {/* Vehicle Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {vehicle.name}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColor}`}>
              {vehicle.status}
            </span>
          </div>
          
          {/* Vehicle Icon */}
          <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
            <svg className="w-6 h-6 text-[#F97C21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(vehicle)}
          className="w-full bg-gradient-to-r from-[#F97C21] to-[#F97C21]/90 hover:from-[#F97C21]/90 hover:to-[#F97C21] text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 group/btn"
        >
          <span>View Details</span>
          <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Vehicle Detail Modal Component
interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

const VehicleDetailModal = ({ vehicle, onClose }: VehicleDetailModalProps) => {
  if (!vehicle) return null;

  const fuelColor = vehicle.fuel_level > 50 
    ? 'text-green-600' 
    : vehicle.fuel_level > 20 
    ? 'text-yellow-600' 
    : 'text-red-600';

  const fuelBarColor = vehicle.fuel_level > 50
    ? 'bg-green-500'
    : vehicle.fuel_level > 20
    ? 'bg-yellow-500'
    : 'bg-red-500';

  const speedStatus = vehicle.speed > 0 ? 'Moving' : 'Parked';
  const speedColor = vehicle.speed > 0 ? 'text-[#F97C21]' : 'text-gray-500';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{vehicle.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center space-x-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${
              vehicle.status === 'ACTIVE' 
                ? 'text-green-700 bg-green-100 border-green-200' 
                : 'text-red-700 bg-red-100 border-red-200'
            }`}>
              {vehicle.status}
            </span>
            <span className={`text-lg font-medium ${speedColor}`}>
              {speedStatus}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fuel Level */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Fuel Level</span>
                <span className={`text-2xl font-bold ${fuelColor}`}>{vehicle.fuel_level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${fuelBarColor}`}
                  style={{ width: `${vehicle.fuel_level}%` }}
                ></div>
              </div>
            </div>

            {/* Speed */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Current Speed</span>
                <span className="text-2xl font-bold text-gray-800">
                  {vehicle.speed} <span className="text-sm text-gray-500">km/h</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {vehicle.speed > 0 ? (
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-[#F97C21] rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-[#F97C21]/80 rounded-full animate-pulse delay-100"></div>
                    <div className="w-3 h-3 bg-[#F97C21]/60 rounded-full animate-pulse delay-200"></div>
                  </div>
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                )}
                <span className="text-sm text-gray-500 ml-2">
                  {vehicle.speed > 0 ? 'In Motion' : 'Stationary'}
                </span>
              </div>
            </div>

            {/* Odometer */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-600 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#F97C21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Total Distance
              </span>
              <span className="text-2xl font-bold text-gray-900">{vehicle.odometer.toLocaleString()} km</span>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-600 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#F97C21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                GPS Coordinates
              </span>
              <div className="text-lg font-mono text-gray-700">
                <div>Lat: {vehicle.latitude.toFixed(6)}</div>
                <div>Lng: {vehicle.longitude.toFixed(6)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-[#F97C21] text-white px-6 py-2 rounded-lg hover:bg-[#F97C21]/90 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export function FeaturesSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const { vehicles, fetchVehicles } = useVehicleStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          // Fetch vehicles when section becomes visible
          fetchVehicles();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('features-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [fetchVehicles]);

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
  };

  return (
    <>
      {/* Floating Header */}
      <FloatingHeader />
      
      {/* Hero Section */}
      <HeroSection />
      
      <section id="features-section" className="relative py-20 bg-gray-50 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Vehicle
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97C21] to-orange-600">
                Fleet Management
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Monitor and manage your entire vehicle fleet with real-time tracking, 
              comprehensive analytics, and detailed vehicle information.
            </p>
          </div>

          {/* Vehicle List */}
          <div id="vehicle-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle, index) => (
              <VehicleListItem
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={handleViewDetails}
                index={index}
              />
            ))}
          </div>

          {/* Empty State */}
          {vehicles.length === 0 && sectionVisible && (
            <div className="text-center py-16">
              <div className="bg-orange-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#F97C21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles available</h3>
              <p className="text-gray-600">Check back later for vehicle information</p>
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Detail Modal */}
      <VehicleDetailModal 
        vehicle={selectedVehicle}
        onClose={handleCloseModal}
      />
      
      {/* Footer */}
      <Footer />
    </>
  );
}