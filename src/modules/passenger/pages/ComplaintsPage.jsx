import React, { useState, useEffect } from 'react';
import { FileText, PlusCircle, Filter, Clock, CheckCircle2, AlertTriangle, Search, ChevronRight, Bus, Route, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { passengerComplaintService } from '../../../services/passenger/passengerComplaintService.js';
import { journeyService } from '../../../services/passenger/journeyService.js';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { ComplaintDetailModal } from '../components/ComplaintDetailModal.jsx';
import { ReportIssueModal } from '../components/ReportIssueModal.jsx';
import { cn } from '../../../utils/index.js';

export function ComplaintsPage({ onNavigate }) {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'new'
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState(journeyService.getActiveTrip());

  useEffect(() => {
    passengerComplaintService.getComplaints(user?.id).then(setComplaints);
    const unsubscribe = passengerComplaintService.subscribe(setComplaints);
    const unsubscribeTrip = journeyService.subscribeActiveTrip(setActiveTrip);
    return () => {
      unsubscribe();
      unsubscribeTrip();
    };
  }, [user]);

  const filteredComplaints = complaints.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSubject = c.subject?.toLowerCase().includes(q);
      const matchId = c.id?.toLowerCase().includes(q);
      const matchCategory = c.category?.toLowerCase().includes(q);
      const matchVehicle = c.vehicle?.toLowerCase().includes(q);
      return matchSubject || matchId || matchCategory || matchVehicle;
    }
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <FileText className="w-3.5 h-3.5" />
            <span>MUNICIPAL COMMUTER GRIEVANCE DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Passenger Complaints & Issue Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Log verified service disruptions, driver conduct, or vehicle issues directly to operations dispatch.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            size="md"
            leftIcon={PlusCircle}
            onClick={() => setIsReportModalOpen(true)}
            className="bg-transit-600 hover:bg-transit-700 text-white font-bold shadow-md"
          >
            Report New Issue
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search complaints by ID (e.g. ST-1024), subject, or vehicle..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-transit-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'SUBMITTED', 'UNDER_REVIEW', 'INVESTIGATING', 'RESOLVED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer',
                statusFilter === st
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              )}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-3">
        {filteredComplaints.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No complaints found"
            description="You have not submitted any complaints matching this filter. If you encounter service delays or vehicle issues, report them immediately."
            actionLabel="Report an Issue"
            onAction={() => setIsReportModalOpen(true)}
          />
        ) : (
          filteredComplaints.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedComplaint(c)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-transit-500/50 dark:hover:border-transit-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-extrabold text-xs text-transit-600 dark:text-transit-400 bg-transit-500/10 px-2 py-0.5 rounded-md border border-transit-500/20">
                    {c.id}
                  </span>
                  <span className="text-xs font-bold font-sans text-slate-700 dark:text-slate-300">
                    {c.category}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    {new Date(c.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <StatusBadge status={c.status} label={c.status} size="sm" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans">
                  {c.subject}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans line-clamp-2">
                  {c.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-1 text-xs font-mono text-slate-400 gap-2">
                <div className="flex items-center space-x-3">
                  {c.vehicle && (
                    <span className="flex items-center space-x-1">
                      <Bus className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.vehicle}</span>
                    </span>
                  )}
                  {c.route && (
                    <span className="flex items-center space-x-1">
                      <Route className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.route}</span>
                    </span>
                  )}
                </div>

                <span className="text-transit-600 dark:text-transit-400 font-bold flex items-center space-x-0.5 text-xs group-hover:translate-x-1 transition-transform">
                  <span>View Timeline</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <ComplaintDetailModal
        complaint={selectedComplaint}
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />

      {/* New Issue Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        activeTrip={activeTrip}
        user={user}
        onComplaintSubmitted={(complaint) => {
          setSelectedComplaint(complaint);
        }}
      />
    </div>
  );
}

export default ComplaintsPage;
