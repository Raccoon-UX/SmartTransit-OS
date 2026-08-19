import React, { useState, useRef, useEffect } from 'react';
import { Activity, Wifi, ShieldCheck, ChevronDown, RefreshCw } from 'lucide-react';
import { StatusBadge } from '../ui/Badge.jsx';
import { cn } from '../../utils/index.js';

export function LiveSystemIndicator({
  status = 'LIVE', // 'LIVE' | 'DEGRADED' | 'OFFLINE'
  latency = '24ms',
  uptime = '99.98%',
  cluster = 'US-East-Mesh-1',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (indicatorRef.current && !indicatorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const getStatusColor = () => {
    switch (status) {
      case 'DEGRADED':
        return {
          dot: 'bg-amber-500',
          badge: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
          text: 'DEGRADED',
        };
      case 'OFFLINE':
        return {
          dot: 'bg-rose-500',
          badge: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30',
          text: 'OFFLINE',
        };
      default:
        return {
          dot: 'bg-emerald-500 telemetry-live',
          badge: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
          text: 'LIVE SYSTEM',
        };
    }
  };

  const config = getStatusColor();

  return (
    <div ref={indicatorRef} className={cn('relative select-none', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer select-none',
          'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700',
          'hover:border-[#0B3D91] dark:hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]/30',
          isOpen && 'ring-2 ring-[#0B3D91]/30 border-[#0B3D91]'
        )}
        aria-expanded={isOpen}
      >
        <span className={cn('w-2 h-2 rounded-full', config.dot)} />
        <span className="text-slate-850 dark:text-slate-100">{config.text}</span>
        <ChevronDown className={cn('w-3 h-3 text-slate-400 transition-transform duration-150', isOpen && 'rotate-180')} />
      </button>

      {/* Popover health details */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-72 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-[100] text-left space-y-3',
            'transition-all duration-150 ease-out animate-in fade-in slide-in-from-top-1'
          )}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#0B3D91] dark:text-sky-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
                Telemetry Mesh
              </span>
            </div>
            <StatusBadge status={status} size="sm" />
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Gateway Latency:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">{latency}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Cluster Uptime:</span>
              <strong className="text-slate-900 dark:text-white">{uptime}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Active Cluster:</span>
              <strong className="text-slate-700 dark:text-slate-300">{cluster}</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Telemetry ping: 2s ago</span>
            <RefreshCw className="w-3 h-3 animate-spin text-[#0B3D91] dark:text-sky-400" />
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveSystemIndicator;
