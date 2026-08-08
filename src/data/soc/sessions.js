/**
 * SmartTransit OS — Active User Sessions & Capacity Headroom Dataset
 */

export const MOCK_USER_SESSIONS = {
  totalActiveUsers: 8451,
  capacityThreshold: 10000,
  utilizationPercent: 84.5,
  capacityStatus: 'NORMAL', // NORMAL, WARNING, CRITICAL
  breakdown: [
    { role: 'Passengers', count: 8120, percent: 96.1, color: 'text-transit-500' },
    { role: 'Drivers', count: 241, percent: 2.8, color: 'text-emerald-500' },
    { role: 'Transport Admin', count: 84, percent: 1.0, color: 'text-cyan-500' },
    { role: 'System Admin (SOC)', count: 6, percent: 0.1, color: 'text-purple-500' },
  ],
};
