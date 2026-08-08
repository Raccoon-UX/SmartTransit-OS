/**
 * SmartTransit OS — PostgreSQL & Redis Cache Telemetry Dataset
 */

export const MOCK_DATABASE_METRICS = {
  postgres: {
    engine: 'PostgreSQL 16.2 Primary + Read Replica',
    status: 'HEALTHY',
    queryLatencyMs: 8,
    activeConnections: 142,
    maxConnections: 500,
    storagePercent: 62,
    replicationState: 'SYNCED (Lag 0ms)',
    queriesPerSec: 850,
  },
  redis: {
    engine: 'Redis 7.2 Sentinel Cluster',
    status: 'HEALTHY',
    hitRatePercent: 94.8,
    memoryPercent: 61,
    latencyMs: 2,
    commandsPerSec: 4200,
    evictionsCount: 0,
  },
};
