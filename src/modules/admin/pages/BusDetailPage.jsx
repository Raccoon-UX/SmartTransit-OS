import React, { useState } from 'react';
import { Bus, MapPin, Wrench, Activity, ArrowLeft, ShieldCheck } from 'lucide-react';
import { fleetService } from '../../../services/admin/fleetService.js';
import { OccupancyIndicator } from '../../passenger/components/OccupancyIndicator.jsx';
import { DriverAssignmentModal } from '../components/DriverAssignmentModal.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Modal } from '../../../components/ui/Modal.jsx';

export function BusDetailPage({ busId, onNavigate }) {
  const [bus, setBus] = useState(() => fleetService.getBusById(busId));
  const [showAssign, setShowAssign] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [toast, setToast] = useState(null);

  const handleMarkMaintenance = () => {
    fleetService.updateBusStatus(bus.id, 'MAINTENANCE');
    setBus({ ...bus, status: 'MAINTENANCE' });
    setShowMaintenance(false);
    setToast('Vehicle marked for maintenance.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <Button variant="outline" size="sm" leftIcon={ArrowLeft} onClick={() => onNavigate('/admin/fleet')} className="mb-2">Back to Fleet</Button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">{bus.busNumber} — Vehicle Telemetry</h1>
          <p className="text-xs font-mono text-slate-400">Serial: {bus.serial} • Depot: {bus.depot}</p>
        </div>
        <StatusBadge status={bus.status} size="md" />
      </div>

      {toast && <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">✓ {toast}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Vehicle Information</h3>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {[
              ['Bus Number', bus.busNumber], ['Serial', bus.serial], ['Type', 'Electric AC Double-Decker'],
              ['Capacity', '52 Passengers'], ['Assigned Route', `${bus.routeId} (${bus.routeName})`],
              ['Assigned Pilot', `${bus.driverName} (${bus.driverId})`], ['Depot', bus.depot], ['Service Status', bus.status],
            ].map(([label, value]) => (
              <div key={label} className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{label}</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm truncate block">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Live Telemetry & Health</h3>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {[
              ['Speed', bus.speed], ['GPS Status', bus.gpsStatus], ['Network', bus.networkStatus],
              ['Current Location', bus.currentLocation], ['Next Stop', bus.nextStop], ['ETA', bus.eta],
              ['Engine Status', bus.healthStatus], ['Battery / Fuel', bus.batteryFuel],
            ].map(([label, value]) => (
              <div key={label} className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{label}</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm truncate block">{value}</span>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Occupancy</span>
            <OccupancyIndicator percent={bus.occupancyPercent} status={bus.occupancyStatus} showBar={true} />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Operational Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm" leftIcon={ShieldCheck} onClick={() => setShowAssign(true)}>Assign Route / Driver</Button>
          <Button variant="outline" size="sm" leftIcon={Wrench} onClick={() => setShowMaintenance(true)}>Mark Maintenance</Button>
        </div>
      </div>

      <DriverAssignmentModal isOpen={showAssign} onClose={() => setShowAssign(false)} bus={bus} onAssigned={() => { setToast('Assignment updated.'); setTimeout(() => setToast(null), 3000); }} />
      <Modal isOpen={showMaintenance} onClose={() => setShowMaintenance(false)} title="Confirm Maintenance">
        <div className="space-y-4 text-left font-sans">
          <p className="text-xs text-slate-600 dark:text-slate-300">Mark <strong>{bus.busNumber}</strong> for maintenance? It will be removed from active service.</p>
          <div className="flex justify-end space-x-3"><Button variant="outline" size="sm" onClick={() => setShowMaintenance(false)}>Cancel</Button><Button variant="danger" size="sm" onClick={handleMarkMaintenance}>Confirm Maintenance</Button></div>
        </div>
      </Modal>
    </div>
  );
}
export default BusDetailPage;
