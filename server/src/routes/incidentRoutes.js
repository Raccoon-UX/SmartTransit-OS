import { Router } from 'express';
import { incidentController } from '../controllers/incidentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = Router();

// Incident Discovery
router.get('/', authenticate, incidentController.getIncidents);
router.get('/:id', authenticate, incidentController.getIncidentById);

// Incident Creation (DRIVER, ADMIN, SOC)
router.post(
  '/',
  authenticate,
  authorizeRoles('DRIVER', 'ADMIN', 'SOC'),
  incidentController.createIncident
);

// Incident Status Update (DRIVER [own], ADMIN, SOC)
router.patch(
  '/:id/status',
  authenticate,
  authorizeRoles('DRIVER', 'ADMIN', 'SOC'),
  incidentController.updateIncidentStatus
);

export default router;
