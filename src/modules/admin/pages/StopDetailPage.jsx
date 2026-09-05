import React, { useState } from 'react';
import { MapPin, ArrowLeft, Bus, AlertTriangle } from 'lucide-react';
import { stopService } from '../../../services/admin/stopService.js';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Modal } from '../../../components/ui/Modal.jsx';

import { regionalTransitData } from '../../../data/regionalTransitData.js';

export function StopDetailPage({ stopId, onNavigate }) {
  const [stop, setStop] = useState(() => stopService.getStopById(stopId));
  const [showToggle, setShowToggle] = useState(false);
  const [toast, setToast] = useState(null);

  const servingBuses = regionalTransitData.getAllBuses().filter(
    (b) => b.origin === stop.name || b.destination === stop.name
  );

  const upcomingBuses = servingBuses.length > 0 ? servingBuses : [
    { busNumber: 'Regional Service', routeCode: 'Scheduled', origin: stop.name, destination: 'Regional Hub', eta: 'Scheduled', occupancyPercent: 50 }
  ];

  const handleToggle = () => {
    const updated = stopService.toggleStopStatus(stop.id);
    setStop(updated);
    setShowToggle(false);
    setToast(`Stop ${updated.status === 'ACTIVE' ? 'reopened' : 'closed'} successfully.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <Button variant="outline" size="sm" leftIcon={ArrowLeft} onClick={() => onNavigate('/admin/stops')} className="mb-2">Back to Stops</Button>
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">{stop.name}</h1>
          <StatusBadge status={stop.status} size="md" />
        </div>
        <p className="text-xs font-mono text-slate-400">Code: {stop.code} • {stop.zone}</p>
      </div>

      {toast && <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">✓ {toast}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Station Information</h3>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {[['Stop Name', stop.name], ['Code', stop.code], ['Zone', stop.zone], ['Connected Routes', stop.routesCount], ['Passenger Volume', stop.passengerVolume], ['Kiosk Status', stop.kioskStatus], ['Accessibility', stop.accessibility], ['Service Status', stop.status]].map(([l, v]) => (
              <div key={l} className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{l}</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm truncate block">{String(v)}</span>
              </div>
            ))}
          </div>
          <Button variant={stop.status === 'ACTIVE' ? 'danger' : 'primary'} size="sm" leftIcon={AlertTriangle} onClick={() => setShowToggle(true)} fullWidth>
            {stop.status === 'ACTIVE' ? 'Temporarily Close Stop' : 'Reopen Stop'}
          </Button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Upcoming Arrivals</h3>
          <div className="space-y-3">
            {upcomingBuses.map((b, idx) => (
              <div key={b.id || idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-3">
                  <Bus className="w-4 h-4 text-transit-500" />
                  <div><span className="font-bold text-slate-900 dark:text-white">{b.busNumber}</span><span className="text-slate-400 ml-2">{b.routeCode || b.routeId}</span></div>
                </div>
                <div className="text-right"><span className="font-bold text-emerald-500">{b.eta || 'Scheduled'}</span><span className="text-slate-400 ml-2">{b.destination}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showToggle} onClose={() => setShowToggle(false)} title={stop.status === 'ACTIVE' ? 'Close Stop' : 'Reopen Stop'}>
        <div className="space-y-4 text-left font-sans">
          <p className="text-xs text-slate-600 dark:text-slate-300">{stop.status === 'ACTIVE' ? `Temporarily close ${stop.name}? Buses will bypass this stop.` : `Reopen ${stop.name} for normal operations?`}</p>
          <div className="flex justify-end space-x-3"><Button variant="outline" size="sm" onClick={() => setShowToggle(false)}>Cancel</Button><Button variant={stop.status === 'ACTIVE' ? 'danger' : 'primary'} size="sm" onClick={handleToggle}>Confirm</Button></div>
        </div>
      </Modal>
    </div>
  );
}
export default StopDetailPage;
