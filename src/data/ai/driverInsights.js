/**
 * SmartTransit OS — Driver Intelligence Dataset
 * Operational safety insights, route adherence, and driving behavior.
 * SIMULATED AI DRIVER INSIGHTS — not operationally guaranteed. Operational assistance only.
 */

export const MOCK_DRIVER_INSIGHTS = [
  {
    id: 'dri-001',
    driverId: 'PLT-042',
    driverName: 'Vikram Jadhav',
    busId: 'b-245',
    busNumber: 'Bus 245',
    routeId: 'RT-108',
    safetyScore: 98.6,
    routeAdherencePercent: 96,
    onTimePerformancePercent: 94,
    speedVarianceScore: 'STABLE',
    insight: 'Stable operational performance with excellent smooth braking record.',
    confidence: 94,
    confidenceLevel: 'HIGH',
    events: [
      { type: 'SUDDEN_BRAKING', count: 1, severity: 'LOW', trend: 'IMPROVING' },
      { type: 'SPEED_DEVIATION', count: 0, severity: 'NONE', trend: 'STABLE' },
      { type: 'ROUTE_DEVIATION', count: 0, severity: 'NONE', trend: 'STABLE' },
    ],
    coachingSuggestion: 'Maintain current smooth deceleration technique near major junctions.',
  },
  {
    id: 'dri-002',
    driverId: 'PLT-108',
    driverName: 'Ramesh K.',
    busId: 'b-312',
    busNumber: 'Bus 312',
    routeId: 'RT-204',
    safetyScore: 99.2,
    routeAdherencePercent: 98,
    onTimePerformancePercent: 97,
    speedVarianceScore: 'EXCELLENT',
    insight: 'Consistently high safety compliance on express airport corridor.',
    confidence: 96,
    confidenceLevel: 'HIGH',
    events: [
      { type: 'SUDDEN_BRAKING', count: 0, severity: 'NONE', trend: 'STABLE' },
      { type: 'SPEED_DEVIATION', count: 0, severity: 'NONE', trend: 'STABLE' },
      { type: 'ROUTE_DEVIATION', count: 0, severity: 'NONE', trend: 'STABLE' },
    ],
    coachingSuggestion: 'Exemplary driving profile.',
  },
  {
    id: 'dri-003',
    driverId: 'PLT-212',
    driverName: 'Sanjay M.',
    busId: 'b-118',
    busNumber: 'Bus 118',
    routeId: 'RT-302',
    safetyScore: 92.4,
    routeAdherencePercent: 91,
    onTimePerformancePercent: 88,
    speedVarianceScore: 'MODERATE_VARIANCE',
    insight: 'Higher speed variance detected during peak CBD stop transitions.',
    confidence: 86,
    confidenceLevel: 'HIGH',
    events: [
      { type: 'SUDDEN_BRAKING', count: 3, severity: 'MEDIUM', trend: 'ATTENTION_NEEDED' },
      { type: 'SUDDEN_ACCELERATION', count: 2, severity: 'LOW', trend: 'STABLE' },
      { type: 'ROUTE_DEVIATION', count: 0, severity: 'NONE', trend: 'STABLE' },
    ],
    coachingSuggestion: 'Recommend smoother throttle management in stop-and-go CBD congestion.',
  },
];
