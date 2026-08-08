import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity } from 'lucide-react';
import { incidentService } from '../../../services/soc/incidentService.js';
import { IncidentCard } from '../components/IncidentCard.jsx';
import { IncidentTimeline } from '../components/IncidentTimeline.jsx';

export function IncidentsPage() {
  const [incidents, setIncidents] = useState(() => incidentService.getIncidents());
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsub = incidentService.subscribe(setIncidents);
    return () => unsub();
  }, []);

  const handleUpdateStatus = (id, newStatus, note) => {
    incidentService.updateIncidentStatus(id, newStatus, note);
    setToast(`Incident ${id} transitioned to ${newStatus}.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold mb-1 border border-rose-500/20">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>INCIDENT COMMAND</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Incident Response Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Operational incident lifecycle state machine (DETECTED → INVESTIGATING → MITIGATING → RESOLVED).
        </p>
      </div>

      {toast && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700 shadow-lg">
          ✓ {toast}
        </div>
      )}

      <div className="space-y-6">
        {incidents.map((inc) => (
          <div key={inc.id} className="space-y-4">
            <IncidentCard incident={inc} onUpdateStatus={handleUpdateStatus} />
            <IncidentTimeline timeline={inc.timeline} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncidentsPage;
