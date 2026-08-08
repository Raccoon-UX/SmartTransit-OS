/**
 * SmartTransit OS — Scalability & Capacity Headroom Dataset
 */

export const MOCK_SCALABILITY_DATA = {
  currentUsers: 8451,
  capacityLimit: 10000,
  currentReqPerSec: 1280,
  cpuUtilizationPercent: 63,
  ramUtilizationPercent: 70,
  websocketConnections: 1420,
  dbConnections: 142,
  maxDbConnections: 500,
  queueDepth: 4,
  currentNodesCount: 3,
  recommendedNodesCount: 4,
  scaleOutTriggerCpuPercent: 80,
  backpressureState: 'NORMAL', // NORMAL, WARNING, BACKPRESSURE
};
