/**
 * SmartTransit OS — Isolated Admin Operational Reports Dataset
 */

export const MOCK_ADMIN_REPORTS = [
  {
    id: 'rep-01',
    title: 'Fleet Utilization & Maintenance Audit',
    category: 'Fleet',
    dateGenerated: 'Today, 09:00 AM',
    summary: '256 / 312 active vehicles (82% utilization). 4 vehicles in service bay for routine brake & battery checks.',
    downloadableFormat: 'CSV',
  },
  {
    id: 'rep-02',
    title: 'Service Reliability & Delay Adherence',
    category: 'Service',
    dateGenerated: 'Today, 08:30 AM',
    summary: '94.7% overall network on-time performance. Main bottlenecks identified on RT-415 Airoli toll plaza.',
    downloadableFormat: 'CSV',
  },
  {
    id: 'rep-03',
    title: 'Driver Safety & Performance Audit',
    category: 'Driver',
    dateGenerated: 'Yesterday',
    summary: 'Average pilot safety rating: 97.4%. Zero major safety infractions recorded across 1,240 trip executions.',
    downloadableFormat: 'CSV',
  },
  {
    id: 'rep-04',
    title: 'Electric Fleet Battery & Fuel Efficiency',
    category: 'Energy',
    dateGenerated: 'Yesterday',
    summary: 'Electric bus fleet achieved 1.2 kWh / km efficiency. Carbon offset equivalent: 14.2 metric tons CO2.',
    downloadableFormat: 'CSV',
  },
];
