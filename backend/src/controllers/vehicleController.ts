import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { updated_at: 'desc' }
    });
    
    res.json({
      success: true,
      message: 'Vehicles retrieved successfully',
      data: vehicles,
      count: vehicles.length
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicles',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID'
      });
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      message: 'Vehicle retrieved successfully',
      data: vehicle
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicle',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateVehicleLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { latitude, longitude, speed, fuel_level } = req.body;
    
    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID'
      });
    }

    const vehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        latitude: latitude || undefined,
        longitude: longitude || undefined,
        speed: speed || undefined,
        fuel_level: fuel_level || undefined,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update vehicle',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { name, status, fuel_level, odometer, latitude, longitude, speed } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle name is required'
      });
    }

    // Normalize status to match enum values
    const normalizedStatus = status ? status.toUpperCase() : 'ACTIVE';

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        status: normalizedStatus as 'ACTIVE' | 'INACTIVE',
        fuel_level: parseFloat(fuel_level) || 0,
        odometer: parseFloat(odometer) || 0,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
        speed: parseFloat(speed) || 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle
    });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create vehicle',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status, fuel_level, odometer, latitude, longitude, speed } = req.body;
    
    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID'
      });
    }

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!existingVehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Normalize status to match enum values
    const normalizedStatus = status ? status.toUpperCase() : existingVehicle.status;

    const vehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        name: name || existingVehicle.name,
        status: normalizedStatus as 'ACTIVE' | 'INACTIVE',
        fuel_level: fuel_level !== undefined ? parseFloat(fuel_level) : existingVehicle.fuel_level,
        odometer: odometer !== undefined ? parseFloat(odometer) : existingVehicle.odometer,
        latitude: latitude !== undefined ? parseFloat(latitude) : existingVehicle.latitude,
        longitude: longitude !== undefined ? parseFloat(longitude) : existingVehicle.longitude,
        speed: speed !== undefined ? parseFloat(speed) : existingVehicle.speed,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update vehicle',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID'
      });
    }

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!existingVehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    await prisma.vehicle.delete({
      where: { id: vehicleId }
    });

    res.json({
      success: true,
      message: 'Vehicle deleted successfully',
      data: { id: vehicleId }
    });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete vehicle',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
