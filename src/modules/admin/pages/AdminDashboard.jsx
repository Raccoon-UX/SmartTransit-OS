import React, { useState, useEffect } from 'react';
import { Bus, Users, Calendar, Bell, BarChart3, Send, Radio, ArrowRight, Sparkles, LayoutGrid, ShieldCheck, Activity } from 'lucide-react';
import { MOCK_ADMIN_KPI } from '../../../data/admin/adminOverview.js';
import { MOCK_ADMIN_ALERTS } from '../../../data/admin/adminAlerts.js';
import { activityService } from '../../../services/admin/activityService.js';
import { FleetMap } from '../components/FleetMap.jsx';
import { DispatchActivityTimeline } from '../components/DispatchActivityTimeline.jsx';
import { AlertCard } from '../../../components/cards/AlertCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { DashboardCustomizerDrawer } from '../../../components/shell/DashboardCustomizerDrawer.jsx';

export function AdminDashboard({ onNavigate }) {
  const [activities, setActivities] = useState([]);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  useEffect(() => {
    const unsub = activityService.subscribe(setActivities);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6 text-left">
      {/* Operations Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8] dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] dark:text-white font-sans tracking-tight">
            Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#596273] dark:text-slate-400 mt-0.5">
            Real-time metropolitan transit network oversight.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" leftIcon={LayoutGrid} onClick={() => setCustomizerOpen(true)}>
            Customize Layout
          </Button>
        </div>
      </div>

      {/* SECTION 1: NETWORK SNAPSHOT — 3 Structured Operational Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Block 1: Active Fleet */}
        <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-[#E5E0D8] dark:border-slate-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#596273] dark:text-slate-400">
            <span>ACTIVE FLEET UTILIZATION</span>
            <Bus className="w-4 h-4 text-[#1769D1]" />
          </div>
          <div className="text-3xl font-bold text-[#172033] dark:text-white font-sans">
            256 <span className="text-lg font-normal text-[#596273] dark:text-slate-400">/ 312</span>
          </div>
          <div className="text-xs text-[#218A63] font-medium flex items-center space-x-1">
            <span>↑ 82% Active Utilization</span>
            <span className="text-[#596273] text-[11px] font-normal">• 56 Buses In Maintenance/Reserve</span>
          </div>
        </div>

        {/* Block 2: Service Reliability */}
        <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-[#E5E0D8] dark:border-slate-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#596273] dark:text-slate-400">
            <span>ON-TIME SERVICE RELIABILITY</span>
            <ShieldCheck className="w-4 h-4 text-[#0E8F82]" />
          </div>
          <div className="text-3xl font-bold text-[#172033] dark:text-white font-sans">
            94.7%
          </div>
          <div className="text-xs text-[#218A63] font-medium flex items-center space-x-1">
            <span>↑ +1.4% Target Surpassed</span>
            <span className="text-[#596273] text-[11px] font-normal">• Sub-Minute ETA Precision</span>
          </div>
        </div>

        {/* Block 3: Active Alerts */}
        <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-[#E5E0D8] dark:border-slate-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#596273] dark:text-slate-400">
            <span>NETWORK ALERTS & ADVISORIES</span>
            <Bell className="w-4 h-4 text-[#D97732]" />
          </div>
          <div className="text-3xl font-bold text-[#172033] dark:text-white font-sans">
            18
          </div>
          <div className="text-xs text-[#C8891A] font-medium flex items-center space-x-1">
            <span>● 2 High Impact Advisories</span>
            <span className="text-[#596273] text-[11px] font-normal">• 16 Info Notices</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: LIVE FLEET OPERATIONS WORKSPACE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#172033] dark:text-white font-sans">Live Fleet Operations</h2>
          <span className="text-xs text-[#596273] dark:text-slate-400 font-mono font-medium">● 2.1s GPS Refresh</span>
        </div>
        <FleetMap onSelectBus={(bus) => onNavigate(`/admin/fleet/${bus.id}`)} />
      </div>

      {/* SECTION 3: OPERATIONS & DISPATCH QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <DispatchActivityTimeline activities={activities.slice(0, 5)} />
        </div>
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-base font-bold text-[#172033] dark:text-white font-sans">Active Service Advisories</h3>
          {MOCK_ADMIN_ALERTS.filter((a) => a.status === 'ACTIVE').slice(0, 3).map((alert) => (
            <AlertCard
              key={alert.id}
              type={alert.type}
              severity={alert.severity}
              title={alert.title}
              description={alert.message}
              timestamp={alert.timestamp}
              affectedRoutes={[alert.affectedRoute]}
            />
          ))}
        </div>
      </div>

      {/* SECTION 4: OPERATIONS QUICK ACTIONS */}
      <div className="p-4 rounded-xl bg-[#F3F0E9] dark:bg-navy-900 border border-[#E5E0D8] dark:border-slate-800 space-y-2 text-xs">
        <div className="font-semibold text-[#596273] dark:text-slate-400">OPERATIONAL COMMAND SHORTCUTS</div>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="sm" leftIcon={Bus} onClick={() => onNavigate('/admin/fleet')}>Fleet Management</Button>
          <Button variant="secondary" size="sm" leftIcon={Sparkles} onClick={() => onNavigate('/ai/overview')}>AI Intelligence</Button>
          <Button variant="secondary" size="sm" leftIcon={Calendar} onClick={() => onNavigate('/admin/schedules')}>Schedule Dispatcher</Button>
          <Button variant="secondary" size="sm" leftIcon={Bell} onClick={() => onNavigate('/admin/alerts')}>Publish Alert</Button>
          <Button variant="secondary" size="sm" leftIcon={BarChart3} onClick={() => onNavigate('/admin/analytics')}>Analytics</Button>
        </div>
      </div>

      <DashboardCustomizerDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        storageKey="smarttransit_admin_dashboard_widgets"
      />
    </div>
  );
}

export default AdminDashboard;
