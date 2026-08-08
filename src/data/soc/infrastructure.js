/**
 * SmartTransit OS — Simulated Infrastructure Topology Graph Dataset
 */

export const MOCK_INFRASTRUCTURE_NODES = [
  { id: 'n-edge', label: 'Cloudflare CDN / Edge Filter', type: 'EDGE', status: 'HEALTHY', metric: '420 req/s' },
  { id: 'n-lb', label: 'HAProxy Load Balancer', type: 'LOAD_BALANCER', status: 'HEALTHY', metric: '1,280 req/s' },
  { id: 'n-gateway', label: 'API Gateway Router', type: 'GATEWAY', status: 'HEALTHY', metric: '14 ms Latency' },
  { id: 'n-cluster', label: 'App Kubernetes Cluster (3 Nodes)', type: 'CLUSTER', status: 'HEALTHY', metric: 'CPU 63% • RAM 70%' },
  { id: 'n-socket', label: 'Realtime Gateway (WebSockets)', type: 'GATEWAY', status: 'HEALTHY', metric: '1,420 Active Sockets' },
  { id: 'n-db', label: 'PostgreSQL Primary + Replica', type: 'DATABASE', status: 'HEALTHY', metric: '8 ms • 142/500 Conns' },
  { id: 'n-redis', label: 'Redis Sentinel Cluster', type: 'CACHE', status: 'HEALTHY', metric: '94.8% Hit Rate' },
  { id: 'n-backup', label: 'Encrypted S3 Cold Storage', type: 'STORAGE', status: 'HEALTHY', metric: 'Last Snapshot 04:00 AM' },
];
