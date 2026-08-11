import { Router } from 'express';
import { fleetController } from '../controllers/fleetController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = Router();

// Fleet Retrieval (All authenticated transit roles)
router.get(
  '/',
  authenticate,
  authorizeRoles('PASSENGER', 'DRIVER', 'ADMIN', 'SOC'),
  fleetController.getFleet
);

router.get(
  '/:id',
  authenticate,
  authorizeRoles('PASSENGER', 'DRIVER', 'ADMIN', 'SOC'),
  fleetController.getBusById
);

// Fleet Operational Status Update (ADMIN, SOC)
router.patch(
  '/:id/status',
  authenticate,
  authorizeRoles('ADMIN', 'SOC'),
  fleetController.updateBusStatus
);

// Vehicle Dispatch Assignment (ADMIN only)
router.post(
  '/:id/assign',
  authenticate,
  authorizeRoles('ADMIN'),
  fleetController.assignDriverRoute
);

export default router;
