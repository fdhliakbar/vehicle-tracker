export type VehicleStatus = "ACTIVE" | "INACTIVE";

export interface Vehicle {
  id: number;
  name: string;
  status: VehicleStatus;
  fuel_level: number;
  odometer: number;
  latitude: number;
  longitude: number;
  speed: number;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}
