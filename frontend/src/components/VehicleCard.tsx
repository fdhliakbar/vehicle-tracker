import type { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onViewDetails }: VehicleCardProps) {
  const statusColor = vehicle.status === 'ACTIVE' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  const fuelColor = vehicle.fuel_level > 50 ? 'text-green-600' : vehicle.fuel_level > 20 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{vehicle.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {vehicle.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Fuel Level:</span>
          <span className={`font-medium ${fuelColor}`}>{vehicle.fuel_level}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Speed:</span>
          <span className="font-medium">{vehicle.speed} km/h</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Odometer:</span>
          <span className="font-medium">{vehicle.odometer.toLocaleString()} km</span>
        </div>
      </div>
      
      <button
        onClick={() => onViewDetails(vehicle)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        View Details
      </button>
    </div>
  );
}
