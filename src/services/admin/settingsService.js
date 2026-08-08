/**
 * SmartTransit OS — Transport Administration Preferences Service
 */

import { MOCK_ADMIN_SETTINGS } from '../../data/admin/adminSettings.js';

const SETTINGS_KEY = 'smarttransit_admin_settings_v1';

export const settingsService = {
  getSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return { ...MOCK_ADMIN_SETTINGS };
      return { ...MOCK_ADMIN_SETTINGS, ...JSON.parse(raw) };
    } catch (e) {
      return { ...MOCK_ADMIN_SETTINGS };
    }
  },

  saveSettings(newSettings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Failed to persist settings', e);
    }
    return newSettings;
  },
};

export default settingsService;
