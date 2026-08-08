import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { occupancyService } from '../../../services/driver/occupancyService.js';
import { OccupancyControl } from '../components/OccupancyControl.jsx';

export function DriverOccupancyPage() {
  const [occupancy, setOccupancy] = useState(occupancyService.getOccupancy());
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsub = occupancyService.subscribeOccupancy(setOccupancy);
    return () => unsub();
  }, []);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleIncrement = () => {
    const updated = occupancyService.incrementPassengers(1);
    triggerToast(`Boarded (+1). Total: ${updated.totalPassengers} (${updated.occupancyPercent}%)`);
  };

  const handleDecrement = () => {
    const updated = occupancyService.decrementPassengers(1);
    triggerToast(`Alighted (-1). Total: ${updated.totalPassengers} (${updated.occupancyPercent}%)`);
  };

  const handleSetPreset = (level) => {
    const updated = occupancyService.setPreset(level);
    triggerToast(`Occupancy updated to ${updated.occupancyPercent}% (${updated.occupancyStatus})`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>PASSENGER CROWD BROADCAST</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Occupancy Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Keep passenger arrival countdowns and station kiosks updated with accurate vehicle crowding levels.
          </p>
        </div>
      </div>

      {toast && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700 shadow-lg">
          ✓ {toast}
        </div>
      )}

      {/* Touch-Friendly Occupancy Control Component */}
      <OccupancyControl
        occupancy={occupancy}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onSetPreset={handleSetPreset}
      />
    </div>
  );
}

export default DriverOccupancyPage;
