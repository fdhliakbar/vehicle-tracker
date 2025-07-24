import { Router } from 'express';
import { login, register, getProfile, changePassword, getAllUsers } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// POST /api/auth/login - User login
router.post('/login', login);

// POST /api/auth/register - User registration
router.post('/register', register);

// GET /api/auth/profile - Get user profile (protected)
router.get('/profile', authenticateToken, getProfile);

// PUT /api/auth/change-password - Change user password (protected)
router.put('/change-password', authenticateToken, changePassword);

// GET /api/auth/users - Get all users (admin only)
router.get('/users', authenticateToken, getAllUsers);
export default router;
