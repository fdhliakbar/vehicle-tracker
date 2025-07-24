import { Router } from 'express';
import { 
  getAllVehicles, 
  getVehicleById, 
  updateVehicleLocation, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} from '../controllers/vehicleController';

import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes (for demo purposes)
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

// Optional location-specific update endpoint
router.put('/:id/location', updateVehicleLocation);

// Protected routes (optional - uncomment if you want auth)
// router.get('/', authenticateToken, getAllVehicles);
// router.get('/:id', authenticateToken, getVehicleById);
// router.post('/', authenticateToken, createVehicle);
// router.put('/:id', authenticateToken, updateVehicle);
// router.delete('/:id', authenticateToken, deleteVehicle);

export default router;
