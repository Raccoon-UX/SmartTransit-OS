/**
 * SmartTransit OS — Backup & Disaster Recovery Service
 */

import { MOCK_BACKUP_DATA } from '../../data/soc/backupData.js';

export const backupService = {
  getBackupData() {
    return { ...MOCK_BACKUP_DATA };
  },

  simulateRestoreTest() {
    return {
      status: 'PASSED',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      details: 'Simulated restore test completed successfully on isolated sandbox database.',
    };
  },
};

export default backupService;
