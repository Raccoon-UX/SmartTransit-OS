/**
 * SmartTransit OS — System Operations Center Preferences Service
 */

import { MOCK_SOC_SETTINGS } from '../../data/soc/socSettings.js';

const SOC_SETTINGS_KEY = 'smarttransit_soc_settings_v1';

export const socSettingsService = {
  getSettings() {
    try {
      const raw = localStorage.getItem(SOC_SETTINGS_KEY);
      if (!raw) return { ...MOCK_SOC_SETTINGS };
      return { ...MOCK_SOC_SETTINGS, ...JSON.parse(raw) };
    } catch (e) {
      return { ...MOCK_SOC_SETTINGS };
    }
  },

  saveSettings(newSettings) {
    try {
      localStorage.setItem(SOC_SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Failed to save SOC settings', e);
    }
    return newSettings;
  },
};

export default socSettingsService;
