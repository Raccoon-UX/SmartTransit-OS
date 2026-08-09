import React from 'react';
import { Server, Activity, Database, HardDrive, ShieldCheck, Wifi, Cpu, Terminal, ArrowRight } from 'lucide-react';
import { Sparkline } from '../../../components/dataviz/Sparkline.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function SocTelemetryWall({ onExploreSoc, className = '' }) {
  const socNodes = [
    { label: 'Cluster Server Health', value: '99.98%', sub: 'High Availability', status: 'ONLINE', icon: Cpu },
    { label: 'API Response Latency', value: '41 ms', sub: 'Sub-50ms Gateway', status: 'LIVE', icon: Activity },
    { label: 'Connected Active Users', value: '8,451', sub: 'Peak Commuter Mesh', status: 'ACTIVE', icon: Wifi },
    { label: 'GPS Ingestion Rate', value: '9,842/s', sub: 'Zero Packet Loss', status: 'LIVE', icon: Server },
    { label: 'Database & Redis Cluster', value: 'HEALTHY', sub: 'Sub-5ms Memory Cache', status: 'ONLINE', icon: Database },
    { label: 'Automated Snapshots', value: 'COMPLETED', sub: 'Multi-Region Backup', status: 'RESOLVED', icon: HardDrive },
    { label: 'Security & Access Audits', value: 'NORMAL', sub: 'Zero Critical Incidents', status: 'RESOLVED', icon: ShieldCheck },
    { label: 'Core Platform Engine', value: 'LIVE', sub: 'Real-Time Telemetry', status: 'LIVE', icon: Terminal },
  ];

  return (
    <div
      className={cn(
        'p-5 rounded bg-[#0F172A] border border-slate-700 text-left text-white space-y-4 shadow-subtle',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2 py-0.5 rounded bg-slate-800 text-emerald-400 text-xs font-mono font-bold border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 telemetry-live" />
            <span>SOC COMMAND TELEMETRY NOC</span>
          </div>
          <h3 className="text-base font-bold font-sans mt-1">Municipal System Operations Center</h3>
        </div>

        {onExploreSoc && (
          <Button variant="primary" size="sm" rightIcon={ArrowRight} onClick={onExploreSoc}>
            Operations Wall
          </Button>
        )}
      </div>

      {/* 8-Tile Telemetry Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {socNodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded bg-slate-800 text-sky-400">
                  <Icon className="w-4 h-4" />
                </div>
                <StatusBadge status={node.status} size="sm" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">{node.label}</span>
                <div className="text-base font-bold font-mono text-white tracking-tight mt-0.5">
                  {node.value}
                </div>
                <span className="text-[10px] text-slate-400 font-mono block">{node.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Ingestion Wave Graph */}
      <div className="p-3 rounded bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="space-y-0.5">
          <div className="text-[10px] text-slate-400 uppercase font-bold">
            Simulated Global Ingestion Throughput (30s Window)
          </div>
          <div className="text-xs font-bold text-emerald-400">
            Peak: 14,280 msgs/s • Mean: 9,842 msgs/s • Latency: 41ms
          </div>
        </div>

        <div className="w-full sm:w-56 h-8">
          <Sparkline data={[8200, 9100, 8900, 11400, 12800, 14280, 13900, 14100]} color="#34d399" height={32} width={220} />
        </div>
      </div>
    </div>
  );
}

export default SocTelemetryWall;
