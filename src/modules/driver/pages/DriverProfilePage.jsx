import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Sun, Moon, LogOut, Award, Wrench, Building, Bus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useTheme } from '../../../design-system/context/ThemeContext.jsx';
import { driverService } from '../../../services/driver/driverService.js';
import { Button } from '../../../components/ui/Button.jsx';
import { Badge } from '../../../components/ui/Badge.jsx';

export function DriverProfilePage({ onLogoutSuccess }) {
  const { user, role, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    driverService.getProfile().then(setProfile);
  }, []);

  const userName = user?.name || profile?.name || 'Vikram Jadhav';
  const userEmail = user?.email || profile?.email || 'driver@smarttransit.city';
  const pilotId = profile?.pilotId || 'PLT-042';

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
            <span>TRANSIT PILOT CREDENTIALS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Driver Operational Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your official transit pilot credentials, assigned depot, and security settings.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={LogOut}
          onClick={handleLogout}
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
        >
          Sign Out Duty
        </Button>
      </div>

      {/* User Information Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-transit-500 to-transit-700 text-white font-extrabold text-xl font-mono flex items-center justify-center shadow-glow-sm">
              VJ
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-sans">{userName}</h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">{profile?.roleTitle || 'Senior Master Transit Pilot'}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  PILOT: {pilotId}
                </Badge>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  ● Certified Heavy Transit Master
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold space-y-1">
            <span>Safety Rating: {profile?.safetyScore}%</span>
            <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400">Zero Incident Record (6.5 Yrs)</div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">HMV License Number</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{profile?.licenseNumber}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Regional Depot</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{profile?.assignedDepot}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Bus & Route</span>
            <div className="text-sm font-bold text-transit-500">{profile?.assignedVehicle} ({profile?.assignedRoute})</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Duty Email</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{userEmail}</div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900 dark:text-white font-sans">Cockpit Theme Display Mode</div>
            <p className="text-[11px] text-slate-400 font-mono">Toggle high-contrast dark / light mode for optimal night driving visibility</p>
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
  );
}

export default DriverProfilePage;
