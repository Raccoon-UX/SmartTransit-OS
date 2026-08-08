import React, { useState, useEffect } from 'react';
import { Server, Activity } from 'lucide-react';
import { serverService } from '../../../services/soc/serverService.js';
import { ServerHealthCard } from '../components/ServerHealthCard.jsx';

export function ServersPage() {
  const [servers] = useState(() => serverService.getServerNodes());

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold mb-1 border border-cyan-500/20">
          <Server className="w-3.5 h-3.5" />
          <span>CLUSTER NODES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Application Server Cluster
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          CPU, RAM, Network throughput, and connection load across cluster nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {servers.map((node) => (
          <ServerHealthCard key={node.id} server={node} />
        ))}
      </div>
    </div>
  );
}

export default ServersPage;
