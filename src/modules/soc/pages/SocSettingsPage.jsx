import React, { useState } from 'react';
import { Settings, Sun, Moon, Save, Monitor } from 'lucide-react';
import { socSettingsService } from '../../../services/soc/socSettingsService.js';
import { useTheme } from '../../../design-system/context/ThemeContext.jsx';
import { Button } from '../../../components/ui/Button.jsx';

export function SocSettingsPage() {
  const [settings, setSettings] = useState(() => socSettingsService.getSettings());
  const { isDark, toggleTheme } = useTheme();
  const [toast, setToast] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    socSettingsService.saveSettings(settings);
    setToast('SOC settings saved successfully.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 text-xs font-mono font-bold mb-1 border border-slate-500/20">
          <Settings className="w-3.5 h-3.5" />
          <span>SOC COMMAND PREFERENCES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          SOC Operations Settings & Wall Mode
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Monitoring thresholds, stream refresh intervals, and SOC Wall Mode display preferences.
        </p>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">
          ✓ {toast}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl font-sans text-xs">
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 font-mono">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">
            Monitoring Refresh & Thresholds
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Telemetry Stream Refresh (sec)</label>
              <input
                type="number"
                value={settings.telemetryRefreshIntervalSeconds}
                onChange={(e) => setSettings({ ...settings, telemetryRefreshIntervalSeconds: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">CPU Warning Threshold (%)</label>
              <input
                type="number"
                value={settings.cpuWarningThresholdPercent}
                onChange={(e) => setSettings({ ...settings, cpuWarningThresholdPercent: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between font-mono">
          <div>
            <div className="font-bold text-slate-900 dark:text-white font-sans text-sm">SOC Wall Display Mode</div>
            <p className="text-[11px] text-slate-400 font-mono">Optimize layout density for 1920px+ ultra-wide command room screens</p>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableWallMode}
              onChange={(e) => setSettings({ ...settings, enableWallMode: e.target.checked })}
              className="w-4 h-4 rounded text-transit-500 focus:ring-transit-500"
            />
            <span className="font-bold text-slate-900 dark:text-white">Wall Mode</span>
          </label>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900 dark:text-white font-sans text-sm">Theme Display Mode</div>
            <p className="text-[11px] text-slate-400 font-mono">Toggle between Light and Dark mode for SOC monitors</p>
          </div>

          <Button type="button" variant="outline" size="sm" leftIcon={isDark ? Sun : Moon} onClick={toggleTheme}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        <Button type="submit" variant="primary" size="lg" leftIcon={Save} className="shadow-glow font-bold">
          Save SOC Settings
        </Button>
      </form>
    </div>
  );
}

export default SocSettingsPage;
