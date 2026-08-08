import React, { useState, useEffect } from 'react';
import { AlertOctagon, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { incidentService } from '../../../services/driver/incidentService.js';
import { EmergencyPanel } from '../components/EmergencyPanel.jsx';

export function DriverEmergencyPage() {
  const [incidentsData, setIncidentsData] = useState({
    incidents: incidentService.getIncidents(),
    activeSos: incidentService.getActiveSos(),
  });

  useEffect(() => {
    const unsub = incidentService.subscribe(setIncidentsData);
    return () => unsub();
  }, []);

  const handleTriggerSos = ({ reason, category }) => {
    incidentService.triggerEmergencySos({ reason, category });
  };

  const handleCancelSos = () => {
    incidentService.cancelEmergencySos();
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold mb-1 border border-rose-500/20">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>SAFETY & EMERGENCY RESPONSE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Driver Emergency SOS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Rapid safety assistance channel for medical, breakdown, or security incidents on route.
          </p>
        </div>
      </div>

      {/* Safety-Critical Emergency Panel */}
      <EmergencyPanel
        activeSos={incidentsData.activeSos}
        onTriggerSos={handleTriggerSos}
        onCancelSos={handleCancelSos}
      />
    </div>
  );
}

export default DriverEmergencyPage;
