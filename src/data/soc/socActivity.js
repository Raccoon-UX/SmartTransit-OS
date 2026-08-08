/**
 * SmartTransit OS — Central SOC Audit & Event Stream Feed Dataset
 */

export const INITIAL_SOC_ACTIVITY = [
  { id: 'soc-act-01', timestamp: '10:48 AM', actor: 'Telemetry Engine', action: 'GPS_STREAM_HEALTH_CHECK', details: 'All 256 vehicle streams emitting clean 48ms coordinates', status: 'HEALTHY' },
  { id: 'soc-act-02', timestamp: '10:42 AM', actor: 'SRE On-Call Lead', action: 'INCIDENT_INVESTIGATION_STARTED', details: 'INC-2026-0084 assigned to investigation pipeline', status: 'INFO' },
  { id: 'soc-act-03', timestamp: '10:12 AM', actor: 'System Watchdog', action: 'INCIDENT_CREATED', details: 'INC-2026-0084 flagged API latency > 150ms on route search', status: 'WARNING' },
  { id: 'soc-act-04', timestamp: '04:00 AM', actor: 'Backup Service', action: 'DAILY_SNAPSHOT_COMPLETED', details: '4.8 GB cold backup snapshot created in 3m 42s', status: 'SUCCESS' },
];
