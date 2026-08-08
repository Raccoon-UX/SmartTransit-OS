/**
 * SmartTransit OS — Backup & Disaster Recovery Readiness Dataset
 */

export const MOCK_BACKUP_DATA = {
  lastBackupTime: 'Today at 04:00 AM',
  status: 'SUCCESS',
  sizeGb: '4.8 GB',
  duration: '3m 42s',
  successRatePercent: 99.9,
  retentionPeriodDays: 30,
  storageUsedPercent: 44,
  drReadinessPercent: 98,
  rpoMinutes: 15,
  rtoMinutes: 30,
  lastRestoreTest: 'PASSED (07 Aug 2026)',
  snapshotsHistory: [
    { id: 'snp-01', date: '08 Aug 2026 04:00 AM', type: 'DAILY_FULL', size: '4.8 GB', duration: '3m 42s', status: 'SUCCESS' },
    { id: 'snp-02', date: '07 Aug 2026 04:00 AM', type: 'DAILY_FULL', size: '4.7 GB', duration: '3m 38s', status: 'SUCCESS' },
    { id: 'snp-03', date: '06 Aug 2026 04:00 AM', type: 'DAILY_FULL', size: '4.6 GB', duration: '3m 45s', status: 'SUCCESS' },
  ],
};
