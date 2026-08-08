/**
 * SmartTransit OS — Intelligent Draft Alerts Dataset
 * AI-generated draft transit advisories requiring Transport Admin approval.
 * SIMULATED AI ALERTS — Human-in-the-loop workflow.
 */

export const MOCK_ALERT_PREDICTIONS = [
  {
    id: 'aip-001',
    routeId: 'RT-108',
    routeName: 'Metro Coastal Express',
    predictedDelayMin: 6,
    affectedStopsCount: 5,
    confidence: 89,
    confidenceLevel: 'HIGH',
    title: 'Potential Delay Advisory: RT-108 Corridor',
    message: 'AI predicts a +6 min delay on RT-108 near Magathane Junction due to peak traffic buildup.',
    severity: 'WARNING',
    suggestedAction: 'Prepare passenger alert for RT-108 commuters.',
    status: 'DRAFT_PENDING_REVIEW', // DRAFT_PENDING_REVIEW, APPROVED, REJECTED
    createdAt: '09:25',
  },
  {
    id: 'aip-002',
    routeId: 'RT-302',
    routeName: 'CBD Feeder Corridor',
    predictedDelayMin: 4,
    affectedStopsCount: 4,
    confidence: 84,
    confidenceLevel: 'HIGH',
    title: 'Predicted Crowding Warning: BKC Station',
    message: 'Predicted passenger crowding on RT-302 exceeding 95% load capacity during evening peak.',
    severity: 'CRITICAL',
    suggestedAction: 'Notify passengers to take alternate feeder route RT-204.',
    status: 'DRAFT_PENDING_REVIEW',
    createdAt: '09:30',
  },
  {
    id: 'aip-003',
    routeId: 'RT-415',
    routeName: 'Suburban Ring Expressway',
    predictedDelayMin: 12,
    affectedStopsCount: 8,
    confidence: 78,
    confidenceLevel: 'MEDIUM',
    title: 'Expressway Congestion Delay Warning',
    message: 'Heavy traffic congestion detected on Eastern Express Highway causing ~12 min delays on RT-415.',
    severity: 'WARNING',
    suggestedAction: 'Publish commuter advisory and alert dispatch team.',
    status: 'DRAFT_PENDING_REVIEW',
    createdAt: '09:34',
  },
];
