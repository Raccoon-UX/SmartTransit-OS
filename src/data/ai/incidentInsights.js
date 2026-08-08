/**
 * SmartTransit OS — SOC Incident AI Insights Dataset
 * AI root-cause assessments for SOC incidents.
 * SIMULATED AI ASSESSMENT — not a definitive root cause.
 */

export const MOCK_INCIDENT_INSIGHTS = [
  {
    id: 'ii-001',
    incidentId: 'INC-2026-0084',
    title: 'API Latency Degradation',
    summary: 'Application node CPU saturation is 74% more likely to be the root cause than database latency.',
    confidence: 82,
    confidenceLevel: 'HIGH',
    contributingSignals: [
      { name: 'Application Node CPU Load', status: 'ELEVATED (+24%)', likelihood: 74 },
      { name: 'API Requests / Sec', status: 'SURGING (+35%)', likelihood: 68 },
      { name: 'API P95 Latency', status: 'DEGRADED (128ms)', likelihood: 62 },
      { name: 'Database Primary Latency', status: 'NORMAL (8ms)', likelihood: 12 },
    ],
    recommendedActions: [
      'Inspect application server node node-app-03 utilization',
      'Trigger scale-out to deploy +1 application node',
      'Verify API Gateway rate-limiting thresholds',
    ],
    assessedAt: '09:32',
  },
  {
    id: 'ii-002',
    incidentId: 'INC-2026-0085',
    title: 'GPS Stream Ingestion Lag',
    summary: 'Network socket buffer overflow on ingress node-gps-01 detected.',
    confidence: 76,
    confidenceLevel: 'MEDIUM',
    contributingSignals: [
      { name: 'GPS Ingestion Rate', status: 'HIGH (1,420 msgs/s)', likelihood: 81 },
      { name: 'Socket Queue Backpressure', status: 'WARNING', likelihood: 72 },
      { name: 'Redis Cache Write Latency', status: 'NORMAL (2ms)', likelihood: 15 },
    ],
    recommendedActions: [
      'Flush stale socket buffers on node-gps-01',
      'Restart ingestion worker thread pool',
    ],
    assessedAt: '09:36',
  },
];

export const MOCK_SYSTEM_INSIGHTS = {
  healthScore: 94,
  capacityRisk: 'MEDIUM',
  apiRisk: 'LOW',
  databaseRisk: 'LOW',
  gpsRisk: 'LOW',
  backupRisk: 'LOW',
  projectedCapacityIn15min: 91,
  currentUtilization: 78,
  confidence: 86,
  confidenceLevel: 'HIGH',
  recommendation: 'Prepare additional application capacity ahead of 10:00 morning peak.',
  assessedAt: '09:38',
};
