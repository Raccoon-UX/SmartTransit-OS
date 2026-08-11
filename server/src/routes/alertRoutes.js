import { Router } from 'express';
import { alertController } from '../controllers/alertController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = Router();

// Public / Commuter Advisory Discovery
router.get('/', alertController.getAlerts);
router.get('/:id', alertController.getAlertById);

// Alert Broadcasting & Mutation (ADMIN, SOC)
router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN', 'SOC'),
  alertController.createAlert
);

router.patch(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN', 'SOC'),
  alertController.updateAlert
);

export default router;
