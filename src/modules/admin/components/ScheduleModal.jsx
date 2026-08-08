import React, { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle2 } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { scheduleService } from '../../../services/admin/scheduleService.js';

export function ScheduleModal({ isOpen, onClose, onCreated }) {
  const [routeCode, setRouteCode] = useState('RT-108');
  const [departureTime, setDepartureTime] = useState('11:30 AM');
  const [arrivalTime, setArrivalTime] = useState('12:45 PM');
  const [busNumber, setBusNumber] = useState('Bus 245');
  const [driverName, setDriverName] = useState('Vikram Jadhav (PLT-042)');
  const [day, setDay] = useState('TODAY');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const result = scheduleService.createSchedule({
        routeCode,
        departureTime,
        arrivalTime,
        busNumber,
        driverName,
        day,
      });

      setIsSubmitting(false);
      if (onCreated) onCreated(result);
      onClose();
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Scheduled Corridor Trip">
      <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Route Line</label>
          <select
            value={routeCode}
            onChange={(e) => setRouteCode(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="RT-108">RT-108 Metro Coastal Express</option>
            <option value="RT-204">RT-204 Airport Link</option>
            <option value="RT-302">RT-302 CBD Feeder</option>
            <option value="RT-415">RT-415 Suburban Ring</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Departure</label>
            <input
              type="text"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              placeholder="e.g. 11:30 AM"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Arrival</label>
            <input
              type="text"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              placeholder="e.g. 12:45 PM"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold uppercase text-slate-500">Vehicle</label>
            <select
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Bus 245">Bus 245</option>
              <option value="Bus 312">Bus 312</option>
              <option value="Bus 118">Bus 118</option>
              <option value="Bus 504">Bus 504</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold uppercase text-slate-500">Scheduled Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none font-mono"
            >
              <option value="TODAY">TODAY</option>
              <option value="TOMORROW">TOMORROW</option>
              <option value="WEEK">WEEK</option>
            </select>
          </div>
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
            leftIcon={Plus}
          >
            Create Schedule
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ScheduleModal;
