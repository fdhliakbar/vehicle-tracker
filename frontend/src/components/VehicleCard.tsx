import type { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onViewDetails }: VehicleCardProps) {
  const statusColor = vehicle.status === 'ACTIVE' 
    ? 'text-green-700 bg-green-100 border-green-200' 
    : 'text-red-700 bg-red-100 border-red-200';
  
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
    <div className="vehicle-card bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#F97C21] transition-colors duration-300 mb-2">
              {vehicle.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColor} transition-all duration-300`}>
                {vehicle.status}
              </span>
              <span className={`text-sm font-medium ${speedColor}`}>
                {speedStatus}
              </span>
            </div>
          </div>
          
          {/* Vehicle icon */}
          <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
            <svg className="w-6 h-6 text-[#F97C21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Fuel Level */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Fuel Level</span>
              <span className={`text-lg font-bold ${fuelColor}`}>{vehicle.fuel_level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${fuelBarColor}`}
                style={{ width: `${vehicle.fuel_level}%` }}
              ></div>
            </div>
          </div>

          {/* Speed */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Speed</span>
              <span className="text-lg font-bold text-gray-800">{vehicle.speed} <span className="text-sm text-gray-500">km/h</span></span>
            </div>
            <div className="flex items-center space-x-1">
              {vehicle.speed > 0 ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#F97C21] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#F97C21]/80 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-[#F97C21]/60 rounded-full animate-pulse delay-200"></div>
                </div>
              ) : (
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              )}
              <span className="text-xs text-gray-500 ml-2">
                {vehicle.speed > 0 ? 'Active' : 'Idle'}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600 flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#F97C21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Odometer
            </span>
            <span className="font-semibold text-gray-800">{vehicle.odometer.toLocaleString()} km</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600 flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#F97C21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </span>
            <span className="text-sm text-gray-600">
              {vehicle.latitude.toFixed(4)}, {vehicle.longitude.toFixed(4)}
            </span>
          </div>
        </div>
        
        {/* Action Button */}
        <button
          onClick={() => onViewDetails(vehicle)}
          className="w-full bg-gradient-to-r from-[#F97C21] to-[#F97C21]/90 hover:from-[#F97C21]/90 hover:to-[#F97C21] text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 group/btn"
        >
          <span>View Details</span>
          <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#F97C21] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}