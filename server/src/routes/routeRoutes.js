import { Router } from 'express';
import { routeController } from '../controllers/routeController.js';

const router = Router();

// Public Route Discovery Endpoints
router.get('/', routeController.getRoutes);
router.get('/:id', routeController.getRouteById);

export default router;
