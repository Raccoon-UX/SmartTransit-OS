import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, Radio, Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../design-system/context/ThemeContext.jsx';
import { cn } from '../../utils/index.js';

const BOOT_STAGES = [
  { threshold: 20, label: 'Initializing transit network', check: 'Loading transit network' },
  { threshold: 40, label: 'Connecting telemetry', check: 'Connecting telemetry mesh' },
  { threshold: 60, label: 'Synchronizing fleet data', check: 'Synchronizing live fleet' },
  { threshold: 80, label: 'Initializing AI intelligence', check: 'Initializing AI intelligence' },
  { threshold: 95, label: 'Establishing secure services', check: 'Verifying RBAC & security' },
  { threshold: 100, label: 'Network ready', check: 'SmartTransit OS Ready' },
];

export function SmartTransitLoader({ onComplete, className = '' }) {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(BOOT_STAGES[0]);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 8 + 6;
        const next = Math.min(prev + diff, 100);
        return Math.floor(next);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stage = BOOT_STAGES.find((s) => progress <= s.threshold) || BOOT_STAGES[BOOT_STAGES.length - 1];
    setCurrentStage(stage);

    if (progress >= 100 && !isExiting) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }, 300);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, isExiting, onComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden transition-all duration-400',
        'bg-[#F7F9FC] dark:bg-slate-950 text-slate-900 dark:text-white',
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100',
        className
      )}
    >
      {/* Background City Network Telemetry Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-40 dark:opacity-15 pointer-events-none stroke-slate-300/60 dark:stroke-slate-500/30">
        <defs>
          <pattern id="loader-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#loader-grid)" />
      </svg>

      {/* Subtle Radial Telemetry Ambient Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-transit-500/10 blur-3xl pointer-events-none animate-pulse" />

      {/* Centered Boot Container */}
      <div className="relative z-10 max-w-sm w-full space-y-6 text-center">
        {/* Logo & Pulse Marker */}
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-transit-500/20 dark:bg-transit-500/30 animate-ping opacity-40" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-transit-500 via-transit-600 to-indigo-600 flex items-center justify-center shadow-xl border border-transit-400/40 relative z-10">
            <Activity className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            SmartTransit <span className="text-transit-500 font-semibold">OS</span>
          </h1>
          <p className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
            INTELLIGENT TRANSIT OPERATING SYSTEM
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-700 dark:text-slate-300 font-bold uppercase text-[11px]">
              {currentStage.label}...
            </span>
            <span className="text-transit-600 dark:text-transit-400 font-extrabold">{progress}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-transit-500 to-cyan-500 rounded-full transition-all duration-200 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Overlay */}
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Checklist Telemetry Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 text-left font-mono text-xs space-y-2.5 shadow-xl dark:shadow-2xl">
          <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mb-1">
            System Initialization Checklist
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center space-x-2.5">
              {progress >= 20 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-transit-500/10 text-transit-500 border border-transit-500/30 flex items-center justify-center font-bold text-[9px] shrink-0">●</span>
              )}
              <span className={progress >= 20 ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-400 dark:text-slate-500'}>
                Loading transit network
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              {progress >= 40 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : progress >= 20 ? (
                <span className="w-4 h-4 rounded-full bg-transit-500 telemetry-live shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0" />
              )}
              <span className={progress >= 40 ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-400 dark:text-slate-500'}>
                Connecting telemetry mesh
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              {progress >= 60 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : progress >= 40 ? (
                <span className="w-4 h-4 rounded-full bg-transit-500 telemetry-live shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0" />
              )}
              <span className={progress >= 60 ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-400 dark:text-slate-500'}>
                Synchronizing live fleet
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              {progress >= 80 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : progress >= 60 ? (
                <span className="w-4 h-4 rounded-full bg-purple-500 animate-pulse shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0" />
              )}
              <span className={progress >= 80 ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-400 dark:text-slate-500'}>
                Initializing AI intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
          Prototype initialization • Municipal Smart City Infrastructure
        </div>
      </div>
    </div>
  );
}

export default SmartTransitLoader;
