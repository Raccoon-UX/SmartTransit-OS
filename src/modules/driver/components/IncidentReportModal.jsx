import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, Send } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { MOCK_INCIDENT_CATEGORIES } from '../../../data/driver/driverIncidents.js';
import { incidentService } from '../../../services/driver/incidentService.js';

export function IncidentReportModal({ isOpen, onClose, onSubmitted }) {
  const [category, setCategory] = useState(MOCK_INCIDENT_CATEGORIES[0].id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('MEDIUM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const result = incidentService.reportIncident({
        category,
        title: title || MOCK_INCIDENT_CATEGORIES.find((c) => c.id === category)?.label,
        description,
        severity,
      });

      setIsSubmitting(false);
      if (onSubmitted) onSubmitted(result);
      onClose();
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Report Operational Issue">
      <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Incident Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
          >
            {MOCK_INCIDENT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Issue Title / Short Summary</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Engine Temperature Light Warning, Highway Roadblock"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Severity Level</label>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            {['LOW', 'MEDIUM', 'HIGH'].map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setSeverity(sev)}
                className={`py-2 rounded-xl border font-bold transition-colors ${
                  severity === sev
                    ? 'bg-transit-500 text-white border-transit-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-bold uppercase text-slate-500">Operational Notes & Details</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Provide additional context for dispatch logs..."
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none resize-none"
          />
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
            rightIcon={Send}
          >
            Submit Incident Report
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default IncidentReportModal;
