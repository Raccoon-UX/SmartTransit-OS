import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { sessionService } from '../../../services/soc/sessionService.js';
import { SessionMetricCard } from '../components/SessionMetricCard.jsx';

export function SessionsPage() {
  const [sessionData] = useState(() => sessionService.getUserSessions());

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
          <Users className="w-3.5 h-3.5" />
          <span>SESSION CAPACITY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Active User Sessions & Headroom
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Active session breakdown across Passengers, Drivers, Transport Admins, and System Admins.
        </p>
      </div>

      <SessionMetricCard sessionData={sessionData} />
    </div>
  );
}

export default SessionsPage;
