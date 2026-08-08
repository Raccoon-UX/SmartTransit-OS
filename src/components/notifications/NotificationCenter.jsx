import React, { useState } from 'react';
import { Bell, Bus, AlertTriangle, CheckCircle2, ShieldAlert, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { cn } from '../../utils/index.js';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Bus 245 Delayed',
    message: 'Bus 245 on Route RT-108 is delayed by 5 minutes due to expressway traffic.',
    category: 'fleet',
    timestamp: '2 mins ago',
    unread: true,
    icon: Bus,
    color: 'text-amber-500 bg-amber-500/10',
  },
  {
    id: 'notif-2',
    title: 'Route RT-108 High Occupancy',
    message: 'Passenger crowd density reached 88% along RT-108. Secondary unit recommended.',
    category: 'alerts',
    timestamp: '10 mins ago',
    unread: true,
    icon: AlertTriangle,
    color: 'text-rose-500 bg-rose-500/10',
  },
  {
    id: 'notif-3',
    title: 'System Backup Completed',
    message: 'Automated municipal telemetry snapshot archived to redundant cold storage.',
    category: 'system',
    timestamp: '25 mins ago',
    unread: false,
    icon: CheckCircle2,
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    id: 'notif-4',
    title: 'Bus 312 Approaching Stop',
    message: 'Bus 312 is approximately 2 minutes away from Western Terminal Hub.',
    category: 'fleet',
    timestamp: '1 hour ago',
    unread: false,
    icon: Bus,
    color: 'text-transit-500 bg-transit-500/10',
  },
];

export function NotificationCenter({ className = '' }) {
  const { role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // 'all' | 'fleet' | 'alerts' | 'system'

  // Role-based notification filtering: Transport Admin and lower roles get operational notifications only
  const roleFilteredNotifications = notifications.filter((item) => {
    if ((role === 'passenger' || role === 'driver' || role === 'admin') && item.category === 'system') {
      return false;
    }
    return true;
  });

  const unreadCount = roleFilteredNotifications.filter((n) => n.unread).length;


  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const filteredNotifications = roleFilteredNotifications.filter((n) => {
    if (filter === 'all') return true;
    return n.category === filter;
  });


  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative p-2 rounded-xl text-slate-600 dark:text-slate-300 transition-all',
          'hover:bg-slate-100 dark:hover:bg-navy-850 border border-transparent hover:border-slate-200 dark:hover:border-slate-800',
          'focus:outline-none focus:ring-2 focus:ring-transit-500'
        )}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 text-left space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
                  Transit Notifications
                </h4>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-[11px] font-mono font-semibold text-transit-500 hover:text-transit-600 dark:hover:text-transit-400"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex space-x-1 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'fleet', label: 'Fleet' },
                { id: 'alerts', label: 'Alerts' },
                { id: 'system', label: 'System' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    'text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg transition-all',
                    filter === tab.id
                      ? 'bg-transit-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-navy-700'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notification Stream */}
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 font-mono">
                  No notifications in this category.
                </div>
              ) : (
                filteredNotifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      onClick={() => toggleRead(notif.id)}
                      className={cn(
                        'p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 text-left',
                        notif.unread
                          ? 'bg-transit-500/5 dark:bg-transit-500/10 border-transit-500/30'
                          : 'bg-slate-50/70 dark:bg-navy-850/50 border-slate-200/80 dark:border-slate-800/80 opacity-80'
                      )}
                    >
                      <div className={cn('p-2 rounded-lg flex-shrink-0 mt-0.5', notif.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {notif.title}
                          </h5>
                          <span className="text-[10px] font-mono text-slate-400 ml-2 flex-shrink-0">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationCenter;
