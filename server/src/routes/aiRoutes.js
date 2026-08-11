import express from 'express';
import { aiController } from '../controllers/aiController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = express.Router();

// All AI endpoints require authentication
router.use(authenticate);

// Public-safe / General AI endpoints (Passenger, Driver, Admin, SOC)
router.get('/overview', aiController.getOverview);
router.get('/predictions/eta', aiController.getEtaPredictions);
router.get('/predictions/occupancy', aiController.getOccupancyForecasts);

// Restricted Operational AI endpoints (Admin and SOC only)
router.get('/anomalies', authorizeRoles('ADMIN', 'SOC'), aiController.getAnomalies);
router.get('/recommendations', authorizeRoles('ADMIN', 'SOC'), aiController.getRecommendations);
router.patch('/recommendations/:id', authorizeRoles('ADMIN', 'SOC'), aiController.updateRecommendationStatus);

export default router;
