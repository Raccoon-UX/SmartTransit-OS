import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/index.js';
import logoImg from '../../assets/logo.png';

const CHECKLIST_ITEMS = [
  { threshold: 25, label: 'Connecting transit network' },
  { threshold: 55, label: 'Syncing fleet telemetry' },
  { threshold: 85, label: 'Loading route intelligence' },
  { threshold: 100, label: 'Preparing workspace' },
];

export function SmartTransitLoader({ onComplete, className = '' }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 12 + 8;
        const next = Math.min(prev + diff, 100);
        return Math.floor(next);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 350);
      }, 250);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, isExiting, onComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden transition-all duration-300',
        'bg-[#F7F5F0] dark:bg-slate-950 text-[#172033] dark:text-white',
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100',
        className
      )}
    >
      <div className="relative z-10 max-w-sm w-full space-y-6 text-center">
        {/* Brand Logo Image */}
        <img src={logoImg} alt="SmartTransit OS Logo" className="mx-auto w-14 h-14 object-contain shrink-0" />

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#172033] dark:text-white font-sans">
            SmartTransit <span className="text-[#0B3D91]">OS</span>
          </h1>
          <p className="text-xs font-mono font-bold tracking-wider uppercase text-[#596273] dark:text-slate-400">
            INITIALIZING TRANSIT NETWORK
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-2 pt-2">
          <div className="h-2 w-full rounded-full bg-[#E5E0D8] dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-[#0B3D91] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-xs font-mono font-bold text-[#0B3D91]">{progress}%</div>
        </div>

        {/* Warm Municipal Initialization Checklist */}
        <div className="p-4 rounded bg-white dark:bg-slate-900 border border-[#E5E0D8] dark:border-slate-800 shadow-subtle text-left space-y-2.5 text-xs font-mono">
          {CHECKLIST_ITEMS.map((item, idx) => {
            const isDone = progress >= item.threshold;
            const isCurrent = !isDone && (idx === 0 || progress >= CHECKLIST_ITEMS[idx - 1].threshold);

            return (
              <div key={idx} className="flex items-center space-x-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                ) : isCurrent ? (
                  <ArrowRight className="w-4 h-4 text-[#0B3D91] animate-pulse shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                )}
                <span
                  className={cn(
                    isDone
                      ? 'text-[#172033] dark:text-white font-semibold'
                      : isCurrent
                      ? 'text-[#0B3D91] font-bold'
                      : 'text-[#596273] dark:text-slate-500'
                  )}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SmartTransitLoader;
