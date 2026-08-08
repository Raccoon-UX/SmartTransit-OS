import React from 'react';
import { Clock, CheckCircle2, ShieldAlert, Cpu, Sparkles, ArrowDown, Activity, UserCheck } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function IncidentTimeline({ timeline = [], className = '' }) {
  const defaultLifecycle = [
    { stage: 'DETECTED', title: 'Telemetry Anomaly Detected', timestamp: '14:02:11', status: 'COMPLETED', icon: ShieldAlert, subsystem: 'API Gateway', color: 'text-rose-400 bg-rose-500/20 border-rose-500/30' },
    { stage: 'ANALYZING', title: 'Automated Diagnostic Assessment', timestamp: '14:02:13', status: 'COMPLETED', icon: Activity, subsystem: 'Telemetry Processor', color: 'text-amber-400 bg-amber-500/20 border-amber-500/30' },
    { stage: 'AI ROOT CAUSE', title: 'AI Root Cause Inferred', timestamp: '14:02:18', status: 'COMPLETED', icon: Sparkles, subsystem: 'AI Inference Layer', detail: 'CPU saturation likelihood: 91% due to sudden API worker load spike.', color: 'text-purple-400 bg-purple-500/20 border-purple-500/30' },
    { stage: 'RECOMMENDATION', title: 'Prescriptive Action Proposed', timestamp: '14:02:22', status: 'COMPLETED', icon: Cpu, subsystem: 'SOC Auto-Scaler', detail: 'Scale API worker cluster +3 pods & enable rate-limiting.', color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30' },
    { stage: 'RESOLVED', title: 'Mitigation Executed & Verified', timestamp: '14:04:32', status: 'COMPLETED', icon: CheckCircle2, subsystem: 'SRE NOC Operations', detail: 'Cluster scaled cleanly. Latency normalized to 24ms.', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' },
  ];

  return (
    <div className={cn('p-5 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-5 font-mono text-xs', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
          Incident Response Lifecycle Pipeline
        </h4>
        <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
          ● REAL-TIME STAGE VISUALIZER
        </span>
      </div>

      {/* Visual Workflow Steps Timeline */}
      <div className="space-y-4 relative">
        {defaultLifecycle.map((node, idx) => {
          const NodeIcon = node.icon;
          const isLast = idx === defaultLifecycle.length - 1;

          return (
            <div key={idx} className="relative flex items-start space-x-3.5 group">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
              )}

              {/* Node Icon */}
              <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border z-10', node.color)}>
                <NodeIcon className="w-4 h-4" />
              </div>

              {/* Stage Content Card */}
              <div className="flex-1 p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                      {node.stage}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-sans">{node.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">{node.timestamp}</span>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Subsystem: <span className="text-slate-700 dark:text-slate-200 font-semibold">{node.subsystem}</span>
                </div>

                {node.detail && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-sans pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    {node.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Raw Audit Event Log Stream */}
      {timeline.length > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Recorded Audit Events</span>
          <div className="space-y-1.5">
            {timeline.map((step, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-[11px] px-3 py-1.5 rounded-xl bg-slate-100/60 dark:bg-navy-950/60 border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 font-bold shrink-0">{step.timestamp}</span>
                <span className="text-slate-700 dark:text-slate-300 font-sans">{step.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IncidentTimeline;
