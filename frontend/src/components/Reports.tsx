import { useState, useEffect } from 'react';
import { useVehicleStore } from '../store/vehicleStore';

interface ReportsProps {
  onClose: () => void;
}

export function Reports({ onClose }: ReportsProps) {
  const { vehicles, stats, fetchVehicles } = useVehicleStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchVehicles().finally(() => setIsLoading(false));
  }, [fetchVehicles]);

  const getFuelStats = () => {
    if (vehicles.length === 0) return { low: 0, medium: 0, high: 0 };
    
    const low = vehicles.filter(v => v.fuel_level <= 20).length;
    const medium = vehicles.filter(v => v.fuel_level > 20 && v.fuel_level <= 50).length;
    const high = vehicles.filter(v => v.fuel_level > 50).length;
    
    return { low, medium, high };
  };

  const getAverageStats = () => {
    if (vehicles.length === 0) return { fuel: 0, speed: 0, odometer: 0 };
    
    const totalFuel = vehicles.reduce((sum, v) => sum + v.fuel_level, 0);
    const totalSpeed = vehicles.reduce((sum, v) => sum + v.speed, 0);
    const totalOdometer = vehicles.reduce((sum, v) => sum + v.odometer, 0);
    
    return {
      fuel: Math.round(totalFuel / vehicles.length),
      speed: Math.round(totalSpeed / vehicles.length),
      odometer: Math.round(totalOdometer / vehicles.length)
    };
  };

  const fuelStats = getFuelStats();
  const averages = getAverageStats();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Reports</h2>
              <p className="text-gray-600 mt-1">Analytics and insights for your fleet</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Vehicles</p>
                      <p className="text-3xl font-bold">{stats.total}</p>
                    </div>
                    <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Active Vehicles</p>
                      <p className="text-3xl font-bold">{stats.active}</p>
                    </div>
                    <svg className="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm">Inactive Vehicles</p>
                      <p className="text-3xl font-bold">{stats.inactive}</p>
                    </div>
                    <svg className="w-8 h-8 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Avg Fuel Level</p>
                      <p className="text-3xl font-bold">{averages.fuel}%</p>
                    </div>
                    <svg className="w-8 h-8 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Fuel Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuel Level Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{fuelStats.low}</div>
                    <div className="text-sm text-gray-600">Low Fuel (≤20%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{fuelStats.medium}</div>
                    <div className="text-sm text-gray-600">Medium Fuel (21-50%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{fuelStats.high}</div>
                    <div className="text-sm text-gray-600">High Fuel (&gt;50%)</div>
                  </div>
                </div>
              </div>

              {/* Average Statistics */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Averages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{averages.fuel}%</div>
                    <div className="text-sm text-gray-600">Average Fuel Level</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{averages.speed} km/h</div>
                    <div className="text-sm text-gray-600">Average Speed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{averages.odometer.toLocaleString()} km</div>
                    <div className="text-sm text-gray-600">Average Odometer</div>
                  </div>
                </div>
              </div>

              {/* Vehicle List */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
                {vehicles.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No vehicles to display</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vehicle
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fuel Level
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Speed
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Odometer
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {vehicles.map((vehicle) => (
                          <tr key={vehicle.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                vehicle.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                                vehicle.status === 'INACTIVE' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {vehicle.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm font-medium ${
                                vehicle.fuel_level > 50 ? 'text-green-600' :
                                vehicle.fuel_level > 20 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {vehicle.fuel_level}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{vehicle.speed} km/h</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{vehicle.odometer.toLocaleString()} km</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
