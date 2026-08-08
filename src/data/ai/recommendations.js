/**
 * SmartTransit OS — Recommendation Repository Dataset
 * Consolidated AI recommendations across Passenger, Fleet, Driver, Route, Operations, SOC, and Security.
 * SIMULATED RECOMMENDATIONS — require Admin review & action.
 */

export const MOCK_RECOMMENDATIONS = [
  {
    id: 'REC-001',
    title: 'Add 1 vehicle to RT-108 during morning peak',
    category: 'Fleet & Dispatch',
    categoryCode: 'FLEET',
    reason: 'Predicted occupancy exceeds 90% during 08:30–09:15 window.',
    expectedImpact: 'Reduce crowding by ~12% and improve on-time reliability.',
    confidence: 87,
    confidenceLevel: 'HIGH',
    priority: 'HIGH',
    createdAt: '09:15',
    status: 'NEW', // NEW, REVIEWED, APPROVED, REJECTED, EXPIRED
    targetEntity: 'RT-108',
  },
  {
    id: 'REC-002',
    title: 'Publish passenger delay advisory for RT-415',
    category: 'Passenger Experience',
    categoryCode: 'PASSENGER',
    reason: 'Traffic incident on Eastern Express Highway causing ~12 min delays.',
    expectedImpact: 'Inform commuters early and reduce passenger complaints.',
    confidence: 84,
    confidenceLevel: 'HIGH',
    priority: 'HIGH',
    createdAt: '09:20',
    status: 'NEW',
    targetEntity: 'RT-415',
  },
  {
    id: 'REC-003',
    title: 'Reassign standby driver PLT-108 to RT-302 shift',
    category: 'Driver Operations',
    categoryCode: 'DRIVER',
    reason: 'RT-302 experiencing 92% passenger load with single-pilot fatigue risk.',
    expectedImpact: 'Ensure safe shift rotation and maintain schedule frequency.',
    confidence: 91,
    confidenceLevel: 'HIGH',
    priority: 'MEDIUM',
    createdAt: '09:24',
    status: 'REVIEWED',
    targetEntity: 'PLT-108',
  },
  {
    id: 'REC-004',
    title: 'Prepare scale-out of application server node-app-04',
    category: 'Infrastructure & SOC',
    categoryCode: 'SOC',
    reason: 'System capacity utilization projected to reach 91% in 15 minutes.',
    expectedImpact: 'Maintain P95 API latency under 30ms during traffic surge.',
    confidence: 86,
    confidenceLevel: 'HIGH',
    priority: 'CRITICAL',
    createdAt: '09:28',
    status: 'APPROVED',
    targetEntity: 'node-app-04',
  },
  {
    id: 'REC-005',
    title: 'Reduce off-peak frequency on RT-204',
    category: 'Route Optimization',
    categoryCode: 'ROUTE',
    reason: 'Load factor below 40% during 11:00–14:00 window.',
    expectedImpact: 'Optimize fleet utilization and save fuel costs.',
    confidence: 78,
    confidenceLevel: 'MEDIUM',
    priority: 'LOW',
    createdAt: '09:00',
    status: 'REJECTED',
    targetEntity: 'RT-204',
  },
];

export const RECOMMENDATION_CATEGORIES = ['FLEET', 'PASSENGER', 'DRIVER', 'ROUTE', 'SOC', 'SECURITY'];
export const RECOMMENDATION_STATUSES = ['NEW', 'REVIEWED', 'APPROVED', 'REJECTED', 'EXPIRED'];
