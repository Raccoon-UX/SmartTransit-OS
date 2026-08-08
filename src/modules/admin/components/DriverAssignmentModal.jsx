import React, { useState } from 'react';
import { User, Bus, Route, CheckCircle2 } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { fleetService } from '../../../services/admin/fleetService.js';
import { adminDriverService } from '../../../services/admin/adminDriverService.js';

export function DriverAssignmentModal({ isOpen, onClose, bus, driver, onAssigned }) {
  const [selectedBus, setSelectedBus] = useState(bus?.busNumber || 'Bus 245');
  const [selectedDriver, setSelectedDriver] = useState(driver?.name || 'Vikram Jadhav');
  const [selectedRoute, setSelectedRoute] = useState('RT-108');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssign = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      fleetService.assignRouteAndDriver({
        busId: bus?.id || 'b-245',
        routeId: selectedRoute,
        driverName: selectedDriver,
      });

      if (driver) {
        adminDriverService.assignVehicle({
          driverId: driver.id,
          busNumber: selectedBus,
          routeCode: selectedRoute,
        });
      }

      setIsSubmitting(false);
      if (onAssigned) onAssigned();
      onClose();
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Driver & Vehicle Corridor">
      <form onSubmit={handleAssign} className="space-y-4 text-left font-sans">
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Transit Pilot / Driver</label>
          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="Vikram Jadhav">Vikram Jadhav (PLT-042)</option>
            <option value="Ramesh K.">Ramesh K. (PLT-108)</option>
            <option value="Sanjay M.">Sanjay M. (PLT-212)</option>
            <option value="Anil P.">Anil P. (PLT-315)</option>
            <option value="Rajesh V.">Rajesh V. (PLT-501 - Standby)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Target Vehicle</label>
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="Bus 245">Bus 245 (NY-TR-8042)</option>
            <option value="Bus 312">Bus 312 (NY-TR-9914)</option>
            <option value="Bus 118">Bus 118 (NY-TR-4402)</option>
            <option value="Bus 504">Bus 504 (NY-TR-3381)</option>
            <option value="Bus 108">Bus 108 (NY-TR-1190 - Ready)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Route Line Corridor</label>
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="RT-108">RT-108 Metro Coastal Express</option>
            <option value="RT-204">RT-204 Airport Link</option>
            <option value="RT-302">RT-302 CBD Feeder</option>
            <option value="RT-415">RT-415 Suburban Ring</option>
          </select>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
            leftIcon={CheckCircle2}
          >
            Confirm Assignment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default DriverAssignmentModal;
