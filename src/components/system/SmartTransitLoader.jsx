import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/index.js';
import logoImg from '../../assets/logo.png';
import loaderPageBg from '../../assets/loaderPage.png';

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
        'bg-slate-950 bg-cover bg-center bg-no-repeat text-white',
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100',
        className
      )}
      style={{ backgroundImage: `url(${loaderPageBg})` }}
    >
      {/* Dark Backdrop Overlay Layer for High Contrast */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" />

      <div className="relative z-10 max-w-sm w-full space-y-6 text-center">
        {/* Prominent Brand Logo Image in High-Contrast Crisp White Card Container */}
        <div className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-white shadow-2xl border border-slate-200 ring-4 ring-white/20">
          <img src={logoImg} alt="SmartTransit OS Logo" className="h-14 sm:h-16 w-auto max-w-[200px] object-contain drop-shadow-xs" />
        </div>

        {/* Header Title */}
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">
            SmartTransit OS
          </h2>
          <p className="text-xs text-slate-300 font-mono">
            Government Transit Operations System
          </p>
        </div>

        {/* Central Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-bold">System Initialization</span>
            <span className="text-amber-400 font-bold">{progress}%</span>
          </div>

          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-[#B83E12] via-amber-500 to-amber-400 rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Milestone Checklist Items */}
        <div className="space-y-2 pt-2 text-left bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 backdrop-blur-xs">
          {CHECKLIST_ITEMS.map((item) => {
            const isDone = progress >= item.threshold;
            return (
              <div key={item.label} className="flex items-center space-x-2.5 text-xs font-mono">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <span className={cn('transition-colors', isDone ? 'text-slate-200 font-bold' : 'text-slate-500')}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action prompt if completed */}
        {progress >= 100 && (
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400 animate-pulse pt-2">
            <span>Ready. Launching System...</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SmartTransitLoader;
