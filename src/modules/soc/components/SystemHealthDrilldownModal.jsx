import React from 'react';
import { Cpu, Activity, AlertTriangle, ShieldCheck, Server, Database, Radio, X, ArrowUpRight } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal.jsx';
import { Button } from '../../../components/ui/Button.jsx';

export function SystemHealthDrilldownModal({ isOpen, onClose, subsystem }) {
  if (!subsystem) return null;

  const getSubsystemTelemetry = (name) => {
    switch (name) {
      case 'API Gateway':
        return {
          availability: '99.98%',
          latency: '24ms → 31ms → 28ms',
          rps: '1,284 req/sec',
          errorRate: '0.12%',
          status: 'HEALTHY',
          subsystemId: 'gw-core-01',
          nodes: ['api-gw-us-east-1a', 'api-gw-us-east-1b'],
        };
      case 'GPS Ingestion':
        return {
          availability: '99.95%',
          latency: '12ms → 14ms → 15ms',
          rps: '8,450 msgs/sec',
          errorRate: '0.04%',
          status: 'HEALTHY',
          subsystemId: 'gps-ingest-mesh',
          nodes: ['gps-node-01', 'gps-node-02', 'gps-node-03'],
        };
      case 'Database':
        return {
          availability: '99.99%',
          latency: '4ms → 6ms → 5ms',
          rps: '3,200 qps',
          errorRate: '0.00%',
          status: 'HEALTHY',
          subsystemId: 'pg-ha-cluster',
          nodes: ['pg-primary-01', 'pg-replica-01'],
        };
      case 'Redis Cache':
        return {
          availability: '99.99%',
          latency: '1ms → 2ms → 1ms',
          rps: '12,100 ops/sec',
          errorRate: '0.00%',
          status: 'HEALTHY',
          subsystemId: 'redis-cluster-v6',
          nodes: ['redis-shard-01', 'redis-shard-02'],
        };
      default:
        return {
          availability: '99.92%',
          latency: '45ms → 52ms → 48ms',
          rps: '420 inf/sec',
          errorRate: '0.08%',
          status: 'HEALTHY',
          subsystemId: 'ai-engine-v2',
          nodes: ['ai-worker-01', 'ai-worker-02'],
        };
    }
  };

  const telemetry = getSubsystemTelemetry(subsystem.name || subsystem);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`SUBSYSTEM TELEMETRY: ${subsystem.name || subsystem}`} size="md">
      <div className="space-y-5 text-left font-mono text-xs">
        {/* Header Summary Pill */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-transit-500/20 text-transit-400 border border-transit-500/30">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">{subsystem.name || subsystem}</h4>
              <p className="text-[11px] text-slate-400">ID: {telemetry.subsystemId}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
            <span>{telemetry.status}</span>
          </span>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">System Latency</span>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">{telemetry.latency}</div>
            <span className="text-[10px] text-emerald-500 block">Within SLO bounds</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Throughput</span>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">{telemetry.rps}</div>
            <span className="text-[10px] text-transit-500 block">Peak capacity: 85%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Error Rate (5xx)</span>
            <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{telemetry.errorRate}</div>
            <span className="text-[10px] text-slate-400 block">Target: &lt;0.50%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Availability SLO</span>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">{telemetry.availability}</div>
            <span className="text-[10px] text-emerald-500 block">99.9% Monthly Target</span>
          </div>
        </div>

        {/* Nodes List */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active Ingestion Nodes</span>
          <div className="space-y-1">
            {telemetry.nodes.map((node, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs px-2.5 py-1 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-bold">{node}</span>
                <span className="text-[10px] text-emerald-400 font-bold">ONLINE</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            Close Drilldown
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SystemHealthDrilldownModal;
