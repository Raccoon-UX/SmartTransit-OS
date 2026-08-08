/**
 * SmartTransit OS — System Intelligence Dataset
 * System capacity risk predictions and cluster health AI scores.
 * SIMULATED AI SYSTEM INTELLIGENCE — not operationally guaranteed.
 */

export const MOCK_SYSTEM_INSIGHTS_DATA = {
  healthScore: 94,
  capacityRisk: 'MEDIUM',
  apiRisk: 'LOW',
  databaseRisk: 'LOW',
  gpsRisk: 'LOW',
  backupRisk: 'LOW',
  currentUtilization: 78,
  projectedUtilization15m: 91,
  confidence: 86,
  confidenceLevel: 'HIGH',
  recommendation: 'Prepare additional application capacity ahead of morning peak surge.',
  riskFactors: [
    { factor: 'Surging active sessions', weight: 4.2 },
    { factor: 'P95 API response time shift', weight: 2.1 },
    { factor: 'Database read replica load', weight: 1.1 },
  ],
  timestamp: '09:38',
};
