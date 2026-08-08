/**
 * SmartTransit OS — Simulated Application Server Cluster Dataset
 */

export const MOCK_SERVER_NODES = [
  { id: 'node-01', name: 'APP-NODE-01', region: 'us-east-1a', cpuPercent: 42, ramPercent: 61, networkMb: 28, status: 'HEALTHY', requestsPerSec: 410, connections: 2810 },
  { id: 'node-02', name: 'APP-NODE-02', region: 'us-east-1b', cpuPercent: 67, ramPercent: 73, networkMb: 34, status: 'HEALTHY', requestsPerSec: 450, connections: 2940 },
  { id: 'node-03', name: 'APP-NODE-03', region: 'us-east-1c', cpuPercent: 82, ramPercent: 78, networkMb: 52, status: 'WARNING', requestsPerSec: 420, connections: 2701 },
];
