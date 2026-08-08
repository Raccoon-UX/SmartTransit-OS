import React from 'react';
import { Server, Activity, ShieldCheck, ArrowRight, Database, Radio, Globe } from 'lucide-react';
import { MOCK_INFRASTRUCTURE_NODES } from '../../../data/soc/infrastructure.js';
import { cn } from '../../../utils/index.js';

export function InfrastructureTopology({ className = '' }) {
  return (
    <div className={cn('p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-6', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            Simulated Platform Infrastructure Topology
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Conceptual packet routing graph from Edge CDN to App Cluster, Database & Cold Storage.
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-transit-500/10 text-transit-600 dark:text-transit-400 border border-transit-500/20">
          SIMULATED TOPOLOGY
        </span>
      </div>

      {/* Visual Topology Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        {MOCK_INFRASTRUCTURE_NODES.map((node, index) => (
          <div
            key={node.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                STEP 0{index + 1}
              </span>
              <span className="text-[10px] font-bold text-emerald-500">● {node.status}</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{node.label}</h4>
            <span className="text-xs font-bold text-transit-500 block">{node.metric}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfrastructureTopology;
