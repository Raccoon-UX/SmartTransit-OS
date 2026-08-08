import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Pause, RotateCcw, AlertTriangle, Users, Bus, Cpu, X, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal.jsx';
import { Button } from '../ui/Button.jsx';
import { aiEngine } from '../../services/ai/aiEngine.js';
import { simulationLifecycle } from '../../services/simulations/simulationLifecycle.js';

export function DemoControlModal({ isOpen, onClose }) {
  const [activeScenario, setActiveScenario] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const unsub = simulationLifecycle.subscribe((state) => {
      setIsRunning(state.status === 'RUNNING');
    });
    return () => unsub();
  }, []);

  const triggerScenario = (name, actionFn, msg) => {
    setActiveScenario(name);
    actionFn();
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg('');
    }, 4000);
  };

  const handleToggleSimulation = () => {
    if (isRunning) {
      simulationLifecycle.pauseAll();
      setNotificationMsg('Simulation paused globally across all portals.');
    } else {
      simulationLifecycle.resumeAll();
      setNotificationMsg('Simulation resumed.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="SMARTTRANSIT OS DEMO CONTROL" size="md">
      <div className="space-y-5 text-left">
        {/* Status Pill & Helper */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                🟣 DEMO ENVIRONMENT
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono text-slate-400">
                Status: <strong className={isRunning ? 'text-emerald-400' : 'text-amber-400'}>{isRunning ? 'RUNNING' : 'PAUSED'}</strong>
              </span>
              <button
                type="button"
                onClick={handleToggleSimulation}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono inline-flex items-center space-x-1 border border-slate-700"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isRunning ? 'Pause' : 'Resume'}</span>
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Simulation telemetry is active across Passenger, Driver, Transport Admin, SOC, and AI modules. Select a scenario below to visually propagate state changes across the system.
          </p>
        </div>

        {notificationMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center space-x-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
        )}

        {/* Scenario Controls */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
            Available Live Scenarios
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                triggerScenario(
                  'crowd',
                  () => aiEngine.triggerCrowdSurge(),
                  'Crowd Surge active: Occupancy surge propagated to Passenger & Driver view.'
                )
              }
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeScenario === 'crowd'
                  ? 'bg-purple-500/20 border-purple-500 text-white shadow-glow-sm'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-purple-500/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Simulate Crowd Surge</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Spikes passenger demand to 94% on RT-108, triggering AI warning banner.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                triggerScenario(
                  'delay',
                  () => aiEngine.triggerDelay(),
                  'Bus Delay active: +12 min ETA delay on Bus 245 propagated to Admin & Live Map.'
                )
              }
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeScenario === 'delay'
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-glow-sm'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Bus className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Simulate Bus Delay</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Injects +12 min traffic delay on Bus 245 at Magathane Junction.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                triggerScenario(
                  'gps',
                  () => aiEngine.triggerGpsAnomaly(),
                  'GPS Anomaly active: Anomaly detected on Bus 118, logged in SOC.'
                )
              }
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeScenario === 'gps'
                  ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-glow-sm'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Simulate GPS Anomaly</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Forces 3-min telemetry update gap on Bus 118 near BKC underpass.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                triggerScenario(
                  'api',
                  () => aiEngine.triggerApiDegradation(),
                  'API Degradation active: P95 latency elevated to 142ms in SOC.'
                )
              }
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeScenario === 'api'
                  ? 'bg-rose-500/20 border-rose-500 text-white shadow-glow-sm'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-rose-500/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Cpu className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Simulate API Degradation</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Elevates API Gateway P95 latency to 142ms, generating SOC incident.
              </p>
            </button>
          </div>
        </div>

        {/* Reset Simulation Button */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400 font-mono">
            Simulation data is generated for demonstration purposes.
          </span>
          <Button
            variant="outline"
            size="sm"
            leftIcon={RotateCcw}
            onClick={() => {
              aiEngine.resetSimulation();
              simulationLifecycle.resetAll();
              setActiveScenario(null);
              setNotificationMsg('Simulation state reset to baseline.');
            }}
          >
            Reset Simulation
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DemoControlModal;
