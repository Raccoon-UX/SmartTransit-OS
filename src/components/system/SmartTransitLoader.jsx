import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/index.js';
import logoImg from '../../assets/logo.png';
import loaderPageBg from '../../assets/loaderPage.jpg';

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
        {/* Prominent Brand Logo Image */}
        <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md w-fit mx-auto border border-white/20 shadow-xl">
          <img src={logoImg} alt="SmartTransit OS Logo" className="mx-auto h-16 sm:h-20 w-auto max-w-[200px] object-contain shrink-0" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            SmartTransit <span className="text-amber-400">OS</span>
          </h1>
          <p className="text-xs font-mono font-bold tracking-wider uppercase text-amber-200/90">
            INITIALIZING TRANSIT NETWORK
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-2 pt-2">
          <div className="h-2 w-full rounded-full bg-slate-800/80 border border-slate-700 overflow-hidden">
            <div
              className="h-full bg-[#B83E12] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-xs font-mono font-bold text-amber-300">{progress}%</div>
        </div>

        {/* Municipal Initialization Checklist with Backdrop Blur */}
        <div className="p-4 rounded bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl text-left space-y-2.5 text-xs font-mono">
          {CHECKLIST_ITEMS.map((item, idx) => {
            const isDone = progress >= item.threshold;
            const isCurrent = !isDone && (idx === 0 || progress >= CHECKLIST_ITEMS[idx - 1].threshold);

            return (
              <div key={idx} className="flex items-center space-x-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <ArrowRight className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <span
                  className={cn(
                    isDone
                      ? 'text-white font-semibold'
                      : isCurrent
                      ? 'text-amber-300 font-bold'
                      : 'text-slate-400'
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
