import React, { useState, useEffect } from 'react';
import { Sparkles, Filter, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { recommendationService } from '../../../services/ai/recommendationService.js';
import { RecommendationCard } from '../components/RecommendationCard.jsx';
import { cn } from '../../../utils/index.js';

export function RecommendationCenterPage() {
  const [data, setData] = useState({ recommendations: [] });
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'NEW' | 'APPROVED' | 'REJECTED'

  useEffect(() => {
    const unsub = recommendationService.subscribe(setData);
    return () => unsub();
  }, []);

  const handleApprove = (id) => {
    recommendationService.updateStatus(id, 'APPROVED');
  };

  const handleReject = (id) => {
    recommendationService.updateStatus(id, 'REJECTED');
  };

  const filtered = statusFilter === 'ALL' ? data.recommendations : data.recommendations.filter((r) => r.status === statusFilter);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI RECOMMENDATION REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            AI Recommendation Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Consolidated AI recommendations across Passenger, Fleet, Driver, Route, SOC, and Security.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
          {['ALL', 'NEW', 'APPROVED', 'REJECTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-all',
                statusFilter === st ? 'bg-white dark:bg-navy-800 text-transit-500 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Recommendations ({filtered.length})
          </h3>
          <span className="text-xs font-mono text-slate-400">SIMULATED PRIORITY MODEL</span>
        </div>

        <div className="space-y-4">
          {filtered.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendationCenterPage;
