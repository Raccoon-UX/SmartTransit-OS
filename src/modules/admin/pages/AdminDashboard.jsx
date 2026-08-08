import React, { useState, useEffect } from 'react';
import { Bus, Users, Calendar, Bell, BarChart3, Send, Radio, ArrowRight, Sparkles, LayoutGrid } from 'lucide-react';
import { MOCK_ADMIN_KPI } from '../../../data/admin/adminOverview.js';
import { MOCK_ADMIN_ALERTS } from '../../../data/admin/adminAlerts.js';
import { activityService } from '../../../services/admin/activityService.js';
import { AdminKpiGrid } from '../components/AdminKpiGrid.jsx';
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
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            <span>TRANSPORT COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">Operations Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Real-time metropolitan transit network oversight and fleet command.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" leftIcon={LayoutGrid} onClick={() => setCustomizerOpen(true)}>
            Customize Dashboard
          </Button>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">v2.0 • Live</span>
        </div>
      </div>

      <AdminKpiGrid kpi={MOCK_ADMIN_KPI} />


      <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-xl space-y-3 min-w-0 w-full box-border">
        <div className="text-xs font-mono font-bold uppercase text-slate-400">Operations Quick Actions</div>
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono font-bold min-w-0 w-full">
          <Button variant="primary" size="md" leftIcon={Bus} onClick={() => onNavigate('/admin/fleet')} className="shadow-glow min-w-0 truncate">Fleet Management</Button>
          <Button variant="outline" size="md" leftIcon={Sparkles} onClick={() => onNavigate('/ai/overview')} className="text-amber-400 border-amber-500/40 hover:bg-slate-800 min-w-0 truncate">AI Intelligence</Button>
          <Button variant="outline" size="md" leftIcon={Calendar} onClick={() => onNavigate('/admin/schedules')} className="text-white border-slate-700 hover:bg-slate-800 min-w-0 truncate">Schedule Trip</Button>
          <Button variant="outline" size="md" leftIcon={Bell} onClick={() => onNavigate('/admin/alerts')} className="text-white border-slate-700 hover:bg-slate-800 min-w-0 truncate">Publish Alert</Button>
          <Button variant="outline" size="md" leftIcon={BarChart3} onClick={() => onNavigate('/admin/analytics')} className="text-white border-slate-700 hover:bg-slate-800 min-w-0 truncate">Analytics</Button>
        </div>
      </div>



      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Live Fleet Network Visualizer</h3>
        <FleetMap onSelectBus={(bus) => onNavigate(`/admin/fleet/${bus.id}`)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <DispatchActivityTimeline activities={activities.slice(0, 5)} />
        </div>
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Active Transit Advisories</h3>
          {MOCK_ADMIN_ALERTS.filter((a) => a.status === 'ACTIVE').slice(0, 3).map((alert) => (
            <AlertCard key={alert.id} type={alert.type} severity={alert.severity} title={alert.title} description={alert.message} timestamp={alert.timestamp} affectedRoutes={[alert.affectedRoute]} />
          ))}
        </div>
      </div>

      {/* Dashboard Layout Customization Drawer */}
      <DashboardCustomizerDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        storageKey="smarttransit_admin_dashboard_widgets"
      />
    </div>
  );
}

export default AdminDashboard;
