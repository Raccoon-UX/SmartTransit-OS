import { Router } from 'express';
import { healthController } from '../controllers/healthController.js';

const router = Router();

// GET /api/v1/health
router.get('/', healthController.getHealth);

export default router;
