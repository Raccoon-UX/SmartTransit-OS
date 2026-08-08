/**
 * SmartTransit OS — AI Activity Audit Log Dataset
 * Centralized audit trail for AI inference generations, anomaly detections, and Admin reviews.
 */

export const MOCK_AI_ACTIVITY = [
  { id: 'act-001', timestamp: '09:42', type: 'ETA_GENERATED', entity: 'Bus 245 / RT-108', message: 'ETA prediction generated (+2 min delay, 91% confidence).', user: 'AI Engine' },
  { id: 'act-002', timestamp: '09:40', type: 'OCCUPANCY_UPDATED', entity: 'RT-108 Corridor', message: 'Occupancy forecast refreshed (Peak 94% forecast).', user: 'AI Engine' },
  { id: 'act-003', timestamp: '09:38', type: 'ANOMALY_DETECTED', entity: 'Bus 245', message: 'Unexpected speed drop detected near Magathane Junction.', user: 'Anomaly Detector' },
  { id: 'act-004', timestamp: '09:35', type: 'ALERT_DRAFTED', entity: 'RT-108', message: 'Intelligent passenger delay alert draft generated for Admin review.', user: 'AI Engine' },
  { id: 'act-005', timestamp: '09:31', type: 'ADMIN_APPROVED', entity: 'REC-004', message: 'Transport Admin approved application node scale-out recommendation.', user: 'sysadmin@smarttransit.city' },
  { id: 'act-006', timestamp: '09:28', type: 'INCIDENT_ASSESSED', entity: 'INC-2026-0084', message: 'AI root cause assessment completed (74% CPU load likelihood).', user: 'AI Engine' },
];
