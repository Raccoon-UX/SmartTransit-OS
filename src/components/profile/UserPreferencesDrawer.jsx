import React, { useState } from 'react';
import { Sliders, Sun, Moon, Globe, Bell, Volume2, RefreshCw, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { Drawer } from '../ui/Drawer.jsx';
import { useTheme } from '../../design-system/context/ThemeContext.jsx';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { cn } from '../../utils/index.js';

export function UserPreferencesDrawer({ isOpen, onClose }) {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = usePublicAccessibility();

  // Interactive Preference State
  const [preferences, setPreferences] = useState({
    city: 'Mumbai Metropolitan Region',
    workspace: 'Transport Operations',
    defaultRoute: 'RT-108 (Metro Coastal Express)',
    defaultDepot: 'Western Express Depot',
    preferredView: 'Operations Dashboard',
    liveTracking: true,
    realTimeNotifications: true,
    serviceAlerts: true,
    aiRecommendations: true,
    dispatchAlerts: true,
    soundNotifications: true,
    autoRefresh: true,
    autoRefreshInterval: '5 seconds',
    textScaling: '100% (Default)',
    highContrast: false,
    reducedMotion: false,
  });

  const togglePref = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Transit Preferences"
      subtitle="Operational workspace & live telemetry configuration"
      width="max-w-md"
    >
      <div className="space-y-6 text-left font-sans text-xs">
        
        {/* 1. APPEARANCE & ACCESSIBILITY (Interactive Theme & Language Controls) */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
            <Sun className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span>APPEARANCE & LANGUAGE</span>
          </h4>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-3 font-mono">
            {/* Theme Segmented Control */}
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300 font-bold">Theme</span>
              <div className="flex items-center p-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => isDark && toggleTheme()}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1',
                    !isDark ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => !isDark && toggleTheme()}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1',
                    isDark ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <Moon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Language Segmented Control */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300 font-bold">Language</span>
              <div className="flex items-center p-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => toggleLanguage('en')}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    language === 'en' ? 'bg-[#B83E12] text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  )}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => toggleLanguage('mr')}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans',
                    language === 'mr' ? 'bg-[#B83E12] text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  )}
                >
                  मराठी
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. WORKSPACE & METRIC CONFIGURATION */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span>WORKSPACE & ROUTE PREFERENCES</span>
          </h4>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-3 font-sans">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">Preferred City</label>
              <select
                value={preferences.city}
                onChange={(e) => setPreferences({ ...preferences, city: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#B83E12]"
              >
                <option value="Mumbai Metropolitan Region">Mumbai Metropolitan Region</option>
                <option value="Pune Transit Mesh">Pune Transit Mesh</option>
                <option value="Nagpur Metro Network">Nagpur Metro Network</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">Default Depot</label>
              <select
                value={preferences.defaultDepot}
                onChange={(e) => setPreferences({ ...preferences, defaultDepot: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#B83E12]"
              >
                <option value="Western Express Depot">Western Express Depot</option>
                <option value="Metropolitan Fleet Command">Metropolitan Fleet Command</option>
                <option value="Bandra Transit Terminal">Bandra Transit Terminal</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">Auto Refresh Interval</label>
              <select
                value={preferences.autoRefreshInterval}
                onChange={(e) => setPreferences({ ...preferences, autoRefreshInterval: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#B83E12]"
              >
                <option value="3 seconds">3 seconds</option>
                <option value="5 seconds">5 seconds</option>
                <option value="10 seconds">10 seconds</option>
                <option value="30 seconds">30 seconds</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. TELEMETRY & NOTIFICATION TOGGLES */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
            <Bell className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span>NOTIFICATION & STREAMING TOGGLES</span>
          </h4>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2.5 font-sans">
            {[
              { key: 'liveTracking', label: 'Live GPS Tracking Stream' },
              { key: 'realTimeNotifications', label: 'Real-Time Notifications' },
              { key: 'serviceAlerts', label: 'Service Advisories & Disruptions' },
              { key: 'aiRecommendations', label: 'AI Operational Recommendations' },
              { key: 'dispatchAlerts', label: 'Emergency Dispatch SOS Alerts' },
              { key: 'soundNotifications', label: 'Sound Alerts' },
              { key: 'autoRefresh', label: 'Auto Refresh Data Stream' },
            ].map((item) => {
              const isChecked = preferences[item.key];
              return (
                <div key={item.key} className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-700/50 last:border-0">
                  <span className="text-slate-800 dark:text-slate-200 font-medium text-xs">{item.label}</span>
                  <button
                    type="button"
                    onClick={() => togglePref(item.key)}
                    className={cn(
                      'w-10 h-5 rounded-full transition-colors relative cursor-pointer',
                      isChecked ? 'bg-[#B83E12]' : 'bg-slate-300 dark:bg-slate-700'
                    )}
                  >
                    <span
                      className={cn(
                        'w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform shadow-xs',
                        isChecked ? 'translate-x-5' : 'translate-x-0.5'
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Drawer>
  );
}

export default UserPreferencesDrawer;
