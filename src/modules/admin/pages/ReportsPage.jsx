import React, { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { reportService } from '../../../services/admin/reportService.js';
import { Button } from '../../../components/ui/Button.jsx';

export function ReportsPage() {
  const [reports] = useState(reportService.getReports());
  const [toast, setToast] = useState(null);

  const handleExportCsv = (report) => {
    const csvData = reportService.simulateExportCsv(report.id);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${report.id}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast(`Downloaded CSV for ${report.title}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-1 border border-emerald-500/20">
          <FileText className="w-3.5 h-3.5" />
          <span>AUDIT & COMPLIANCE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Operational Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Generate, review, and export municipal transit performance and safety audit reports.
        </p>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">
          ✓ {toast}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-transit-500/10 text-transit-600 dark:text-transit-400 font-mono font-bold text-xs">
                {rep.category}
              </span>
              <span className="text-[10px] font-mono text-slate-400">{rep.dateGenerated}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">{rep.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 leading-relaxed">
                {rep.summary}
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                leftIcon={Eye}
                onClick={() => {
                  setToast(`Viewing ${rep.title}`);
                  setTimeout(() => setToast(null), 2500);
                }}
              >
                View Summary
              </Button>

              <Button
                variant="primary"
                size="sm"
                leftIcon={Download}
                onClick={() => handleExportCsv(rep)}
              >
                Export CSV
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsPage;
