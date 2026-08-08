import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Clock } from 'lucide-react';
import { aiActivityService } from '../../../services/ai/aiActivityService.js';
import { AIActivityFeed } from '../components/AIActivityFeed.jsx';

export function AiActivityPage() {
  const [data, setData] = useState({ activityLog: [] });

  useEffect(() => {
    const unsub = aiActivityService.subscribe(setData);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Activity className="w-3.5 h-3.5" />
            <span>AI AUDIT & ACTIVITY STREAM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            AI Activity & Prediction Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Full audit log of AI prediction generations, anomaly detections, and Admin review decisions.
          </p>
        </div>
      </div>

      <AIActivityFeed activities={data.activityLog} />
    </div>
  );
}

export default AiActivityPage;
