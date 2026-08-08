import React, { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, Settings, LogOut, Sun, Moon, Sparkles } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useTheme } from '../../../design-system/context/ThemeContext.jsx';
import { passengerNotificationService } from '../../../services/passenger/passengerNotificationService.js';
import { Button } from '../../../components/ui/Button.jsx';
import { Badge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function PassengerProfilePage({ onLogoutSuccess }) {
  const { user, role, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [preferences, setPreferences] = useState(passengerNotificationService.getPreferences());
  const [toast, setToast] = useState(null);

  const userName = user?.name || 'Aarav Sharma';
  const userEmail = user?.email || 'passenger@smarttransit.city';
  const userPhone = user?.phone || '+91 98201 44820';
  const avatar = user?.avatar || 'AS';

  const handleModeChange = (mode) => {
    const updated = { ...preferences, defaultTravelMode: mode };
    passengerNotificationService.savePreferences(updated);
    setPreferences(updated);
    setToast('Default travel preference updated.');
    setTimeout(() => setToast(null), 2000);
  };

  const handleLogout = () => {
    logout();
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <User className="w-3.5 h-3.5" />
            <span>COMMUTER PROFILE & PREFERENCES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Passenger Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your personal commuter identity, travel routing preferences, and security settings.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={LogOut}
          onClick={handleLogout}
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
        >
          Sign Out
        </Button>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">
          ✓ {toast}
        </div>
      )}

      {/* User Information Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-transit-500 to-transit-700 text-white font-extrabold text-xl font-mono flex items-center justify-center shadow-glow-sm">
              {avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-sans">{userName}</h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">{user?.roleTitle || 'Registered Transit Commuter'}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  {user?.roleCode || 'PASSENGER'}
                </Badge>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  ● Verified Session
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Registered Email</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{userEmail}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Mobile Phone Number</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{userPhone}</div>
          </div>
        </div>
      </div>

      {/* Travel Routing Preferences */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
          Mobility & Travel Preferences
        </h3>

        <div className="space-y-3 text-xs">
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase font-bold text-slate-400">Default Routing Mode</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'fastest', label: 'Fastest Transit', sub: 'Prioritize quickest ETA' },
                { id: 'fewer_transfers', label: 'Fewer Transfers', sub: 'Single direct bus' },
                { id: 'less_walking', label: 'Minimal Walking', sub: 'Under 300m walking' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeChange(item.id)}
                  className={cn(
                    'p-3.5 rounded-2xl border text-left transition-all',
                    preferences.defaultTravelMode === item.id
                      ? 'bg-transit-500/10 border-transit-500 text-slate-900 dark:text-white ring-2 ring-transit-500/20'
                      : 'bg-slate-50 dark:bg-navy-850 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  )}
                >
                  <div className="font-bold font-sans">{item.label}</div>
                  <span className="text-[10px] font-mono text-slate-400">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-sans">Theme Mode</div>
              <p className="text-[11px] text-slate-400 font-mono">Synchronized with your device preference</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={isDark ? Sun : Moon}
              onClick={toggleTheme}
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerProfilePage;
