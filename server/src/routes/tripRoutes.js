import { Router } from 'express';
import { tripController } from '../controllers/tripController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = Router();

// Active Trip Discovery (DRIVER only - scoped to own assigned vehicle)
router.get(
  '/active',
  authenticate,
  authorizeRoles('DRIVER'),
  tripController.getActiveTrip
);

// Trip Lifecycle Operations (DRIVER only)
router.post(
  '/start',
  authenticate,
  authorizeRoles('DRIVER'),
  tripController.startTrip
);

router.post(
  '/end',
  authenticate,
  authorizeRoles('DRIVER'),
  tripController.endTrip
);

// Passenger Occupancy Telemetry Updates (DRIVER, ADMIN)
router.post(
  '/occupancy',
  authenticate,
  authorizeRoles('DRIVER', 'ADMIN'),
  tripController.updateOccupancy
);

export default router;
