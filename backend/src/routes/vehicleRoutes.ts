import { Router } from 'express';
import { getAllVehicles, getVehicleById, updateVehicleLocation } from '../controllers/vehicleController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes (for demo purposes)
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);

// Protected routes (optional - uncomment if you want auth)
// router.get('/', authenticateToken, getAllVehicles);
// router.get('/:id', authenticateToken, getVehicleById);
// router.put('/:id', authenticateToken, updateVehicleLocation);

// Optional update endpoint
router.put('/:id', updateVehicleLocation);

export default router;
