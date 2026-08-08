import React, { useState, useEffect } from 'react';
import { Sliders, Check, RotateCcw, X, Eye, EyeOff, LayoutGrid } from 'lucide-react';
import { Button } from '../ui/Button.jsx';

const DEFAULT_WIDGETS = [
  { id: 'fleet_kpi', name: 'Fleet KPIs & Metrics', description: 'Active buses, pilots, on-time performance & delays', enabled: true },
  { id: 'quick_actions', name: 'Operations Quick Actions', description: 'Fast navigation actions for dispatch and alerts', enabled: true },
  { id: 'fleet_map', name: 'Live Fleet Map Visualizer', description: 'Real-time interactive GPS bus position canvas', enabled: true },
  { id: 'dispatch_timeline', name: 'Dispatch Activity Timeline', description: 'Real-time operational dispatch log stream', enabled: true },
  { id: 'active_advisories', name: 'Active Transit Advisories', description: 'High-priority passenger & network alerts', enabled: true },
  { id: 'driver_performance', name: 'Driver Shift Performance', description: 'Safety scores, distance logged & shift status', enabled: false },
  { id: 'ai_capacity_risk', name: 'AI Capacity Risk Forecast', description: 'Predictive occupancy risk and surge warnings', enabled: true },
];

export function DashboardCustomizerDrawer({ isOpen, onClose, storageKey = 'smarttransit_dashboard_widgets', onSave }) {
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setWidgets(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load dashboard preferences', e);
    }
  }, [storageKey, isOpen]);

  const toggleWidget = (id) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  const handleSave = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(widgets));
    } catch (e) {
      console.warn('Failed to save dashboard preferences', e);
    }
    if (onSave) onSave(widgets);
    onClose();
  };

  const handleReset = () => {
    setWidgets(DEFAULT_WIDGETS);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn('Failed to reset dashboard preferences', e);
    }
    if (onSave) onSave(DEFAULT_WIDGETS);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-navy-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between p-6">
          {/* Header */}
          <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-transit-500/10 text-transit-500 border border-transit-500/20">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                    CUSTOMIZE DASHBOARD
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Configure visible operational widgets & layout
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Widget List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              AVAILABLE DASHBOARD WIDGETS
            </span>

            {widgets.map((widget) => (
              <div
                key={widget.id}
                onClick={() => toggleWidget(widget.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                  widget.enabled
                    ? 'bg-slate-50 dark:bg-navy-850 border-transit-500/40 text-slate-900 dark:text-white'
                    : 'bg-slate-100/50 dark:bg-navy-950/50 border-slate-200 dark:border-slate-800/60 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {widget.enabled ? (
                    <Eye className="w-4 h-4 text-transit-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-sans">{widget.name}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        widget.enabled
                          ? 'bg-transit-500/10 text-transit-500 border border-transit-500/30'
                          : 'bg-slate-200 dark:bg-navy-800 text-slate-500'
                      }`}
                    >
                      {widget.enabled ? 'VISIBLE' : 'HIDDEN'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{widget.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <Button variant="ghost" size="sm" leftIcon={RotateCcw} onClick={handleReset}>
              Reset Default
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" leftIcon={Check} onClick={handleSave}>
                Save Layout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCustomizerDrawer;
