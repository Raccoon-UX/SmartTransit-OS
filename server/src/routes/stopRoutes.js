import { Router } from 'express';
import { stopController } from '../controllers/stopController.js';

const router = Router();

// Public Transit Stop Discovery Endpoints
router.get('/', stopController.getStops);
router.get('/:id', stopController.getStopById);

export default router;
