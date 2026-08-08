/**
 * SmartTransit OS — Incident Response Management Console Dataset
 */

export const INITIAL_INCIDENTS = [
  {
    id: 'INC-2026-0084',
    title: 'API Gateway Latency Spike on Route Search',
    severity: 'P2 HIGH',
    status: 'INVESTIGATING', // DETECTED, INVESTIGATING, MITIGATING, MONITORING, RESOLVED
    detectedTime: 'Today at 10:12 AM',
    affectedService: 'API Gateway Router',
    currentImpact: 'Average response time 184ms (Normal < 100ms)',
    assignedResponder: 'SRE On-Call Lead',
    description: 'Transient query load spike on PostgreSQL read replica causing minor API gateway latency elevation.',
    timeline: [
      { timestamp: '10:12 AM', note: 'Automated anomaly detector flagged API gateway latency > 150ms' },
      { timestamp: '10:15 AM', note: 'SRE On-Call lead assigned to investigate' },
      { timestamp: '10:19 AM', note: 'Read-replica DB node #2 query queue identified as cause' },
    ],
  },
  {
    id: 'INC-2026-0079',
    title: 'GPS Stream Packet Re-ordering',
    severity: 'P3 MEDIUM',
    status: 'RESOLVED',
    detectedTime: 'Yesterday at 03:40 PM',
    affectedService: 'GPS Stream Pipeline',
    currentImpact: 'Resolved. Zero packet loss confirmed.',
    assignedResponder: 'Telemetry Engineer',
    description: 'Minor socket buffer congestion caused out-of-order vehicle coordinate frames.',
    timeline: [
      { timestamp: '03:40 PM', note: 'GPS Stream metric watcher flagged out-of-sequence sequence IDs' },
      { timestamp: '03:48 PM', note: 'Socket buffer increased from 2MB to 8MB' },
      { timestamp: '04:02 PM', note: 'Stream latency normalized to 48ms. Incident resolved.' },
    ],
  },
];
