import React, { useState } from 'react';
import { Bell, Send, FileText } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { alertService } from '../../../services/admin/alertService.js';

export function AlertComposerModal({ isOpen, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('warning');
  const [type, setType] = useState('DISRUPTION');
  const [affectedRoute, setAffectedRoute] = useState('RT-108');
  const [affectedStop, setAffectedStop] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const result = alertService.createAlert({ title, message, severity, type, affectedRoute, affectedStop: affectedStop || 'All Stops', status });
      setIsSubmitting(false);
      if (onCreated) onCreated(result);
      setTitle(''); setMessage(''); setAffectedStop('');
      onClose();
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compose Transit Alert">
      <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono">
          ⚠️ Prototype notification — not connected to production public-alert infrastructure.
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Alert Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Highway Lane Closure on Western Expressway" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none" required />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Alert Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Describe the disruption or advisory..." className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold uppercase text-slate-500">Severity</label>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none">
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger / Critical</option>
              <option value="success">Service Update</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold uppercase text-slate-500">Alert Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none">
              <option value="DISRUPTION">Route Disruption</option>
              <option value="WEATHER">Weather Advisory</option>
              <option value="FREQUENCY">Frequency Update</option>
              <option value="MAINTENANCE">Maintenance Notice</option>
              <option value="EMERGENCY">Emergency Alert</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold uppercase text-slate-500">Affected Route</label>
            <select value={affectedRoute} onChange={(e) => setAffectedRoute(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none">
              <option value="RT-108">RT-108 Metro Coastal Express</option>
              <option value="RT-204">RT-204 Airport Link</option>
              <option value="RT-302">RT-302 CBD Feeder</option>
              <option value="RT-415">RT-415 Suburban Ring</option>
              <option value="ALL">All Routes (Network-Wide)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold uppercase text-slate-500">Initial Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none">
              <option value="DRAFT">Save as Draft</option>
              <option value="ACTIVE">Publish Immediately</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} leftIcon={Send}>
            {status === 'DRAFT' ? 'Save Draft' : 'Publish Alert'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AlertComposerModal;
