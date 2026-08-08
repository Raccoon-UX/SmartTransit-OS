import React, { useState } from 'react';
import { Bell, CheckCheck, Filter, ShieldCheck, Clock, Settings, Sparkles } from 'lucide-react';
import { passengerNotificationService } from '../../../services/passenger/passengerNotificationService.js';
import { AlertCard } from '../../../components/cards/AlertCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { cn } from '../../../utils/index.js';

export function NotificationsPage() {
  const [alerts, setAlerts] = useState(passengerNotificationService.getAlerts());
  const [filterType, setFilterType] = useState('ALL');
  const [preferences, setPreferences] = useState(passengerNotificationService.getPreferences());
  const [toast, setToast] = useState(null);

  const handleMarkAllRead = () => {
    const updated = passengerNotificationService.markAllAsRead();
    setAlerts(updated);
    setToast('All alerts marked as read.');
    setTimeout(() => setToast(null), 2000);
  };

  const handleTogglePref = (key) => {
    const updated = {
      ...preferences,
      [key]: !preferences[key],
    };
    passengerNotificationService.savePreferences(updated);
    setPreferences(updated);
    setToast('Notification preferences saved.');
    setTimeout(() => setToast(null), 2000);
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filterType === 'ALL') return true;
    return a.type === filterType;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold mb-1 border border-rose-500/20">
            <Bell className="w-3.5 h-3.5" />
            <span>METROPOLITAN ADVISORY FEED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Transit Alerts & Service Notices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Stay informed on line diversions, peak delays, weather notices, and fleet capacity changes.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={CheckCheck}
            onClick={handleMarkAllRead}
          >
            Mark All as Read
          </Button>
        </div>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">
          ✓ {toast}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
        <span className="text-[10px] text-slate-400 font-bold uppercase px-2">Filter:</span>
        {['ALL', 'DISRUPTION', 'WEATHER', 'FREQUENCY'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilterType(f)}
            className={cn(
              'px-3 py-1.5 rounded-xl font-bold transition-colors',
              filterType === f
                ? 'bg-transit-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Main Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => (
          <AlertCard
            key={alert.id}
            type={alert.type}
            severity={alert.severity}
            title={alert.title}
            description={alert.message}
            timestamp={alert.timestamp}
            affectedRoutes={alert.affectedRoutes}
          />
        ))}
      </div>

      {/* Notification Preferences Section */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Settings className="w-4 h-4 text-transit-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Passenger Alert Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { key: 'delayAlerts', label: 'Route Delay & Traffic Advisories', desc: 'Notify when saved routes experience delays > 5 mins.' },
            { key: 'favoriteRouteUpdates', label: 'Favorite Route Broadcasts', desc: 'Real-time schedule changes on your saved lines.' },
            { key: 'journeyReminders', label: 'Active Journey Arrival Alarms', desc: 'Alert 2 minutes before reaching your destination stop.' },
            { key: 'monsoonWeatherAdvisories', label: 'Monsoon High Tide Warnings', desc: 'Weather alerts impacting coastal transit corridors.' },
          ].map((item) => (
            <div
              key={item.key}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-start justify-between space-x-3"
            >
              <div>
                <div className="font-bold text-slate-900 dark:text-white font-sans">{item.label}</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>

              <input
                type="checkbox"
                checked={preferences[item.key]}
                onChange={() => handleTogglePref(item.key)}
                className="mt-1 rounded text-transit-500 focus:ring-transit-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
