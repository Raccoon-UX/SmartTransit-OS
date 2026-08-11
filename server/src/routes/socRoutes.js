import { Router } from 'express';
import { socController } from '../controllers/socController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';

const router = Router();

// Infrastructure Telemetry & Node Health (SOC ONLY)
router.get(
  '/overview',
  authenticate,
  authorizeRoles('SOC'),
  socController.getSocOverview
);

router.get(
  '/nodes',
  authenticate,
  authorizeRoles('SOC'),
  socController.getNodeCluster
);

// Cluster Simulation Actions (SOC ONLY)
router.post(
  '/surge',
  authenticate,
  authorizeRoles('SOC'),
  socController.simulateSurge
);

router.post(
  '/scale-out',
  authenticate,
  authorizeRoles('SOC'),
  socController.scaleOutCluster
);

// Audit Logs Retrieval (SOC, ADMIN)
router.get(
  '/audit-logs',
  authenticate,
  authorizeRoles('SOC', 'ADMIN'),
  socController.getAuditLogs
);

export default router;
