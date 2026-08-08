import React from 'react';
import { Server, Activity } from 'lucide-react';
import { InfrastructureTopology } from '../components/InfrastructureTopology.jsx';

export function InfrastructurePage() {
  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
          <Server className="w-3.5 h-3.5" />
          <span>TOPOLOGY GRAPH</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Infrastructure Topology
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Conceptual packet routing graph from CDN Edge filters to App Cluster and Database nodes.
        </p>
      </div>

      <InfrastructureTopology />
    </div>
  );
}

export default InfrastructurePage;
