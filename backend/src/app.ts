import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vehicleRoutes from './routes/vehicleRoutes';
import authRoutes from './routes/authRoutes';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.NODE_ENV === 'production' 
      ? process.env.ALLOWED_ORIGINS?.split(',') || []
      : ['http://localhost:3000', 'http://localhost:5173']
  ].flat(),
  credentials: true
}));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Vehicle Tracker API - Widya Assignment',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
