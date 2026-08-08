import React, { useState, useEffect } from 'react';
import { Radio, Activity } from 'lucide-react';
import { dispatchService } from '../../../services/admin/dispatchService.js';
import { activityService } from '../../../services/admin/activityService.js';
import { DispatchQueue } from '../components/DispatchQueue.jsx';
import { DispatchActivityTimeline } from '../components/DispatchActivityTimeline.jsx';

export function DispatchPage() {
  const [dispatchData, setDispatchData] = useState(() => dispatchService.getDispatchQueue());
  const [activities, setActivities] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsub = activityService.subscribe(setActivities);
    return () => unsub();
  }, []);

  const handleAssignPending = (pendingId) => {
    const updated = dispatchService.assignPendingVehicle(pendingId, 'Bus 108', 'PLT-501');
    setDispatchData(updated);
    setToast('Vehicle dispatched successfully.'); setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold mb-1 border border-rose-500/20"><Radio className="w-3.5 h-3.5 animate-pulse" /><span>DISPATCH COMMAND</span></div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">Dispatch Center</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Operational vehicle dispatch, assignment queue, and real-time activity event logging.</p>
      </div>
      {toast && <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">✓ {toast}</div>}
      <DispatchQueue dispatchData={dispatchData} onAssignPending={handleAssignPending} />
      <DispatchActivityTimeline activities={activities} />
    </div>
  );
}
export default DispatchPage;
