/**
 * SmartTransit OS — 12-Service Health Matrix Dataset
 */

export const MOCK_SERVICE_HEALTH = [
  { id: 'srv-01', name: 'Web Application UI', category: 'Frontend', status: 'ONLINE', latency: '8 ms', uptime: '99.99%', rate: '420 req/s', version: 'v2.0.4' },
  { id: 'srv-02', name: 'Authentication & RBAC', category: 'Security', status: 'ONLINE', latency: '12 ms', uptime: '100%', rate: '85 req/s', version: 'v1.8.2' },
  { id: 'srv-03', name: 'API Gateway Router', category: 'Core API', status: 'ONLINE', latency: '14 ms', uptime: '99.98%', rate: '1,280 req/s', version: 'v3.1.0' },
  { id: 'srv-04', name: 'Realtime Gateway', category: 'WebSockets', status: 'ONLINE', latency: '18 ms', uptime: '99.95%', rate: '3,820 msg/s', version: 'v2.4.1' },
  { id: 'srv-05', name: 'GPS Stream Pipeline', category: 'Telemetry', status: 'ONLINE', latency: '48 ms', uptime: '99.92%', rate: '1,284 ev/s', version: 'v2.2.0' },
  { id: 'srv-06', name: 'Passenger Notification Engine', category: 'Messaging', status: 'ONLINE', latency: '22 ms', uptime: '99.97%', rate: '110 msg/s', version: 'v1.5.0' },
  { id: 'srv-07', name: 'Fleet Telemetry Service', category: 'Operations', status: 'ONLINE', latency: '16 ms', uptime: '99.99%', rate: '340 req/s', version: 'v2.1.2' },
  { id: 'srv-08', name: 'Timetable Scheduling Service', category: 'Operations', status: 'ONLINE', latency: '10 ms', uptime: '100%', rate: '45 req/s', version: 'v1.9.0' },
  { id: 'srv-09', name: 'Analytics & BI Engine', category: 'Data', status: 'ONLINE', latency: '35 ms', uptime: '99.90%', rate: '150 req/s', version: 'v2.0.0' },
  { id: 'srv-10', name: 'PostgreSQL Primary Cluster', category: 'Database', status: 'ONLINE', latency: '8 ms', uptime: '99.99%', rate: '850 qps', version: 'PostgreSQL 16.2' },
  { id: 'srv-11', name: 'Redis Cache Cluster', category: 'Cache', status: 'ONLINE', latency: '2 ms', uptime: '100%', rate: '4,200 qps', version: 'Redis 7.2' },
  { id: 'srv-12', name: 'Automated Snapshot Backup Engine', category: 'Storage', status: 'ONLINE', latency: 'N/A', uptime: '99.99%', rate: 'Daily Sync', version: 'v1.4.0' },
];
