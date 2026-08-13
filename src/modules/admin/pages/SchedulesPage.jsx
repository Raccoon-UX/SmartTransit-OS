import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { scheduleService } from '../../../services/admin/scheduleService.js';
import { ScheduleBoard } from '../components/ScheduleBoard.jsx';
import { ScheduleModal } from '../components/ScheduleModal.jsx';

export function SchedulesPage() {
  const [currentDay, setCurrentDay] = useState('TODAY');
  const [schedules, setSchedules] = useState(() => scheduleService.getSchedules(currentDay));
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSelectDay = (day) => {
    setCurrentDay(day);
    setSchedules(scheduleService.getSchedules(day));
  };

  const handleCancel = (id) => {
    const updated = scheduleService.cancelSchedule(id);
    const safeUpdated = Array.isArray(updated) ? updated : [];
    setSchedules(safeUpdated.filter((s) => s.day === currentDay || currentDay === 'ALL'));
    setToast('Schedule cancelled.'); setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20"><Calendar className="w-3.5 h-3.5" /><span>TIMETABLE OPERATIONS</span></div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">Schedule Dispatcher</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Plan, create, and manage scheduled corridor trips across the transit network.</p>
      </div>
      {toast && <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">✓ {toast}</div>}
      <ScheduleBoard schedules={schedules} onOpenCreateModal={() => setShowCreate(true)} onCancelSchedule={handleCancel} currentDay={currentDay} onSelectDay={handleSelectDay} />
      <ScheduleModal isOpen={showCreate} onClose={() => setShowCreate(false)} onCreated={() => { setSchedules(scheduleService.getSchedules(currentDay)); setToast('Schedule created.'); setTimeout(() => setToast(null), 3000); }} />
    </div>
  );
}
export default SchedulesPage;
