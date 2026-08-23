import React from 'react';
import { X, FileText, CheckCircle2, Clock, ShieldCheck, Bus, Route, AlertTriangle, ArrowRight, User } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function ComplaintDetailModal({ complaint, isOpen, onClose }) {
  if (!isOpen || !complaint) return null;

  const getStatusVariant = (st) => {
    switch (st) {
      case 'RESOLVED':
      case 'CLOSED':
        return 'success';
      case 'INVESTIGATING':
        return 'accent';
      case 'UNDER_REVIEW':
        return 'warning';
      case 'SUBMITTED':
      default:
        return 'primary';
    }
  };

  const timeline = complaint.timeline || [
    {
      status: complaint.status || 'SUBMITTED',
      timestamp: complaint.createdAt || new Date().toISOString(),
      message: 'Complaint submitted by passenger.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm text-left">
      <div className="relative max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-5 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                Complaint Reference: <strong className="text-slate-900 dark:text-white font-mono">{complaint.id}</strong>
              </span>
              <StatusBadge status={complaint.status} label={complaint.status} size="sm" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white font-sans">
              {complaint.subject}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Category</span>
              <strong className="text-slate-900 dark:text-white block truncate">{complaint.category}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Vehicle</span>
              <strong className="text-slate-900 dark:text-white block truncate">{complaint.vehicle || 'Not Attached'}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Route</span>
              <strong className="text-slate-900 dark:text-white block truncate">{complaint.route || 'General Transit'}</strong>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Complaint Statement
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-sans">
              {complaint.description}
            </div>
          </div>

          {/* Resolution Note if available */}
          {complaint.resolutionNote && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 space-y-1 text-xs font-sans">
              <div className="flex items-center space-x-1.5 font-bold font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>OFFICIAL RESOLUTION NOTE</span>
              </div>
              <p className="text-xs leading-relaxed">{complaint.resolutionNote}</p>
            </div>
          )}

          {/* Status Timeline */}
          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Status Progression Timeline
            </span>

            <div className="space-y-3 pl-2 border-l-2 border-slate-200 dark:border-slate-700">
              {timeline.map((step, idx) => (
                <div key={idx} className="relative pl-4 space-y-0.5 text-xs">
                  <span className="absolute -left-[9px] top-1 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900" />
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 dark:text-white font-mono font-bold">
                      {step.status}
                    </strong>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(step.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">{step.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
