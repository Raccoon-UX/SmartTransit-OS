/**
 * SmartTransit OS — AI Intelligence Overview Dataset
 * Global AI KPIs, model health summaries, and quick-insight cards.
 * DEMO AI INTELLIGENCE — All metrics are simulated.
 */

export const MOCK_AI_OVERVIEW = {
  predictionsToday: 1284,
  highConfidencePercent: 94.2,
  activeInsights: 18,
  avgInferenceLatencyMs: 42,
  anomaliesDetected: 6,
  recommendationsPending: 9,
  alertDraftsAwaitingReview: 3,
  modelHealthSummary: {
    totalModels: 6,
    operational: 5,
    degraded: 1,
    offline: 0,
  },
  topInsights: [
    {
      id: 'ins-001',
      type: 'PREDICTION',
      title: 'RT-108 Peak Crowding Predicted',
      summary: 'Occupancy on RT-108 expected to reach 94% between 08:30–09:15.',
      confidence: 91,
      confidenceLevel: 'HIGH',
      entity: 'RT-108',
      timestamp: '09:12',
    },
    {
      id: 'ins-002',
      type: 'ANOMALY',
      title: 'Bus 245 Speed Drop Detected',
      summary: 'Speed dropped 42% below expected route profile near Magathane Junction.',
      confidence: 88,
      confidenceLevel: 'HIGH',
      entity: 'Bus 245',
      timestamp: '09:18',
    },
    {
      id: 'ins-003',
      type: 'RECOMMENDATION',
      title: 'Add Vehicle to RT-302',
      summary: 'Demand forecast exceeds current fleet capacity during evening peak.',
      confidence: 84,
      confidenceLevel: 'HIGH',
      entity: 'RT-302',
      timestamp: '09:24',
    },
    {
      id: 'ins-004',
      type: 'SYSTEM',
      title: 'API Latency Trend Upward',
      summary: 'P95 API latency trending from 42ms to 68ms over last 30 minutes.',
      confidence: 76,
      confidenceLevel: 'MEDIUM',
      entity: 'API Gateway',
      timestamp: '09:31',
    },
  ],
};
