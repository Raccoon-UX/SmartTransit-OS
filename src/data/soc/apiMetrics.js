/**
 * SmartTransit OS — Simulated API Endpoints Performance Dataset
 */

export const MOCK_API_ENDPOINTS = [
  { path: 'GET /api/fleet', rate: '340 req/s', avgLatency: '12 ms', p95Latency: '24 ms', errorRate: '0.01%', status: 'HEALTHY' },
  { path: 'GET /api/routes', rate: '280 req/s', avgLatency: '8 ms', p95Latency: '16 ms', errorRate: '0.00%', status: 'HEALTHY' },
  { path: 'GET /api/buses/:id', rate: '410 req/s', avgLatency: '14 ms', p95Latency: '28 ms', errorRate: '0.02%', status: 'HEALTHY' },
  { path: 'GET /api/driver/trip', rate: '180 req/s', avgLatency: '16 ms', p95Latency: '32 ms', errorRate: '0.01%', status: 'HEALTHY' },
  { path: 'GET /api/journey', rate: '120 req/s', avgLatency: '45 ms', p95Latency: '85 ms', errorRate: '0.05%', status: 'HEALTHY' },
  { path: 'GET /api/alerts', rate: '95 req/s', avgLatency: '6 ms', p95Latency: '12 ms', errorRate: '0.00%', status: 'HEALTHY' },
  { path: 'GET /api/admin/analytics', rate: '45 req/s', avgLatency: '35 ms', p95Latency: '62 ms', errorRate: '0.00%', status: 'HEALTHY' },
];
