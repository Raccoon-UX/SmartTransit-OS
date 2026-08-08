import React, { useState } from 'react';
import { Settings, Sun, Moon, Save, Building } from 'lucide-react';
import { settingsService } from '../../../services/admin/settingsService.js';
import { useTheme } from '../../../design-system/context/ThemeContext.jsx';
import { Button } from '../../../components/ui/Button.jsx';

export function SettingsPage() {
  const [settings, setSettings] = useState(() => settingsService.getSettings());
  const { isDark, toggleTheme } = useTheme();
  const [toast, setToast] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    settingsService.saveSettings(settings);
    setToast('Transport authority preferences saved successfully.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 text-xs font-mono font-bold mb-1 border border-slate-500/20">
          <Settings className="w-3.5 h-3.5" />
          <span>ADMINISTRATION PREFERENCES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Transport Authority Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage operational preferences, alert thresholds, display modes, and regional authority metadata.
        </p>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">
          ✓ {toast}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl font-sans">
        {/* Section 1: Organization Metadata */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">
            Organization Profile & Region
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Authority Name</label>
              <input
                type="text"
                value={settings.organizationName}
                onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Operating Region</label>
              <input
                type="text"
                value={settings.operatingRegion}
                onChange={(e) => setSettings({ ...settings, operatingRegion: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Timezone</label>
              <input
                type="text"
                value={settings.timezone}
                disabled
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Operational Preferences */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">
            Fleet & Dispatch Thresholds
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Delay Alert Threshold (mins)</label>
              <input
                type="number"
                value={settings.fleetAlertThresholdMinutes}
                onChange={(e) => setSettings({ ...settings, fleetAlertThresholdMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Auto Refresh Stream (secs)</label>
              <input
                type="number"
                value={settings.autoRefreshIntervalSeconds}
                onChange={(e) => setSettings({ ...settings, autoRefreshIntervalSeconds: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs font-mono">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.broadcastAlertsToKiosks}
                onChange={(e) => setSettings({ ...settings, broadcastAlertsToKiosks: e.target.checked })}
                className="w-4 h-4 rounded text-transit-500 focus:ring-transit-500"
              />
              <span className="text-slate-800 dark:text-slate-200 font-bold">Broadcast active alerts automatically to passenger station kiosks</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowDriverSelfReassignment}
                onChange={(e) => setSettings({ ...settings, allowDriverSelfReassignment: e.target.checked })}
                className="w-4 h-4 rounded text-transit-500 focus:ring-transit-500"
              />
              <span className="text-slate-800 dark:text-slate-200 font-bold">Allow driver self-reassignment during standby shifts</span>
            </label>
          </div>
        </div>

        {/* Section 3: Theme Display Mode */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900 dark:text-white font-sans text-sm">Theme Display Mode</div>
            <p className="text-[11px] text-slate-400 font-mono">Toggle between Light and Dark mode for optimal operations room visibility</p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={isDark ? Sun : Moon}
            onClick={toggleTheme}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          leftIcon={Save}
          className="shadow-glow font-bold"
        >
          Save Transport Settings
        </Button>
      </form>
    </div>
  );
}

export default SettingsPage;
