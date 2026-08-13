import React, { useState, useEffect } from 'react';
import { Bell, Plus, CheckCircle2, Trash2, Send } from 'lucide-react';
import { alertService } from '../../../services/admin/alertService.js';
import { AlertComposerModal } from '../components/AlertComposerModal.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function AlertsPage() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [alerts, setAlerts] = useState(() => alertService.getAlerts('ALL'));
  const [showComposer, setShowComposer] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    alertService.fetchAlerts?.().then((data) => {
      if (Array.isArray(data)) {
        setAlerts(statusFilter === 'ALL' ? data : data.filter((a) => a.status === statusFilter));
      }
    });
  }, [statusFilter]);

  const refresh = () => setAlerts(alertService.getAlerts(statusFilter));

  const handlePublish = (id) => { alertService.publishAlert(id); refresh(); setToast('Alert published.'); setTimeout(() => setToast(null), 3000); };
  const handleResolve = (id) => { alertService.resolveAlert(id); refresh(); setToast('Alert resolved.'); setTimeout(() => setToast(null), 3000); };
  const handleDelete = (id) => { alertService.deleteDraft(id); refresh(); setToast('Draft deleted.'); setTimeout(() => setToast(null), 3000); };

  const safeAlerts = Array.isArray(alerts) ? alerts : [];
  const filtered = statusFilter === 'ALL' ? safeAlerts : safeAlerts.filter((a) => a.status === statusFilter);

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold mb-1 border border-amber-500/20"><Bell className="w-3.5 h-3.5" /><span>PUBLIC ADVISORY</span></div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">Transit Alert Manager</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Compose, schedule, publish, and resolve public transit advisories.</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={Plus} onClick={() => setShowComposer(true)} className="shadow-glow">Create Alert</Button>
      </div>

      {toast && <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">✓ {toast}</div>}

      <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
        {['ALL', 'DRAFT', 'SCHEDULED', 'ACTIVE', 'RESOLVED'].map((st) => (<button key={st} type="button" onClick={() => { setStatusFilter(st); setAlerts(alertService.getAlerts(st === 'ALL' ? 'ALL' : st)); }} className={cn('px-3 py-1.5 rounded-xl font-bold transition-colors', statusFilter === st ? 'bg-transit-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-navy-850 text-slate-600 dark:text-slate-400')}>{st} ({st === 'ALL' ? alerts.length : alerts.filter((a) => a.status === st).length})</button>))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((alert) => (
          <div key={alert.id} className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <StatusBadge status={alert.status} size="sm" />
              <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{alert.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{alert.message}</p>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-transit-500/10 text-transit-600 dark:text-transit-400 font-bold">{alert.affectedRoute}</span>
              <span>{alert.type}</span>
              <span>• by {alert.publisher}</span>
            </div>
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {alert.status === 'DRAFT' && <><Button variant="primary" size="sm" leftIcon={Send} onClick={() => handlePublish(alert.id)}>Publish</Button><Button variant="outline" size="sm" leftIcon={Trash2} onClick={() => handleDelete(alert.id)}>Delete</Button></>}
              {alert.status === 'ACTIVE' && <Button variant="outline" size="sm" leftIcon={CheckCircle2} onClick={() => handleResolve(alert.id)}>Resolve</Button>}
            </div>
          </div>
        ))}
      </div>

      <AlertComposerModal isOpen={showComposer} onClose={() => setShowComposer(false)} onCreated={() => { refresh(); setToast('Alert created.'); setTimeout(() => setToast(null), 3000); }} />
    </div>
  );
}
export default AlertsPage;
