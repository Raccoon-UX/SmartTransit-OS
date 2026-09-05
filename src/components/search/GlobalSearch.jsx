import React, { useState, useEffect } from 'react';
import { Search, Bus, Route, MapPin, User, Server, AlertTriangle, ArrowRight, X, Command } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { cn } from '../../utils/index.js';

import { CANONICAL_REGIONAL_BUSES, CANONICAL_REGIONAL_ROUTES, CANONICAL_REGIONAL_STOPS } from '../../data/regionalTransitData.js';

const REGIONAL_SEARCH_DATABASE = [
  ...CANONICAL_REGIONAL_BUSES.map((b) => ({
    id: b.id,
    type: 'BUS',
    title: `${b.operator} ${b.busNumber}`,
    rawNumber: b.busNumber,
    subtitle: `${b.area} • ${b.origin} ➔ ${b.destination} (${b.region})`,
    path: `/passenger/bus/${b.id}`,
    icon: Bus,
    category: 'Vehicles',
    operator: b.operator,
    area: b.area,
    region: b.region,
    origin: b.origin,
    destination: b.destination,
  })),
  ...CANONICAL_REGIONAL_ROUTES.map((r) => ({
    id: r.id,
    type: 'ROUTE',
    title: `Route ${r.routeCode}`,
    subtitle: `${r.origin} ➔ ${r.destination} • ${r.region}`,
    path: `/passenger/route/${r.routeCode}`,
    icon: Route,
    category: 'Routes',
    operator: r.operator,
    region: r.region,
  })),
  ...CANONICAL_REGIONAL_STOPS.map((s) => ({
    id: s.id,
    type: 'STOP',
    title: `${s.name} (${s.code})`,
    subtitle: `Regional Transit Hub • ${s.region} (${s.servingOperators?.join(', ') || 'Regional'})`,
    path: `/passenger/routes`,
    icon: MapPin,
    category: 'Stops',
    region: s.region,
  })),
  { id: 'd-882', type: 'DRIVER', title: 'Senior Pilot Vikram Jadhav (DRV-8820)', subtitle: 'Assigned to BEST A-297 • Shift Active', icon: User, category: 'Personnel', path: '/admin/drivers' },
  { id: 'sys-1', type: 'SYSTEM', title: 'Maharashtra Transit Telemetry Node', subtitle: '99.98% Uptime • 29 Regional Fleet Routes', icon: Server, category: 'Infrastructure', path: '/soc/telemetry' },
];

export function GlobalSearch({ isOpen = false, onClose, onSelect }) {
  const { role } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = REGIONAL_SEARCH_DATABASE.filter((item) => {
    // Role-Based Access Control Filtering
    if (role === 'passenger' && (item.category === 'Personnel' || item.category === 'Infrastructure')) return false;
    if (role === 'driver' && item.category === 'Infrastructure') return false;
    if (role === 'admin' && item.category === 'Infrastructure') return false;

    if (!query) return true;
    const q = query.trim().toLowerCase();
    const cleanQ = q.replace(/[\s\-_]/g, '');
    const cleanTitle = (item.title || '').toLowerCase().replace(/[\s\-_]/g, '');
    const cleanRaw = (item.rawNumber || '').toLowerCase().replace(/[\s\-_]/g, '');

    return (
      item.title.toLowerCase().includes(q) ||
      cleanTitle.includes(cleanQ) ||
      cleanRaw.includes(cleanQ) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.area && item.area.toLowerCase().includes(q)) ||
      (item.region && item.region.toLowerCase().includes(q)) ||
      (item.operator && item.operator.toLowerCase().includes(q)) ||
      (item.origin && item.origin.toLowerCase().includes(q)) ||
      (item.destination && item.destination.toLowerCase().includes(q))
    );
  });


  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Trigger handled externally or toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleItemClick(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleItemClick = (item) => {
    if (onSelect) onSelect(item);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Command Palette Card */}
      <div
        className={cn(
          'relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl z-10 text-left',
          'bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800'
        )}
      >
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-transit-500 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search active buses, routes, bus stops, telemetry nodes..."
            className={cn(
              'w-full text-sm font-medium bg-transparent text-slate-900 dark:text-white',
              'placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none'
            )}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">
              No SmartTransit telemetry records matching "{query}"
            </div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between',
                    isSelected
                      ? 'bg-transit-500 text-white shadow-sm'
                      : 'hover:bg-slate-100 dark:hover:bg-navy-850 text-slate-800 dark:text-slate-200'
                  )}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-navy-800 text-transit-500'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span
                          className={cn(
                            'text-[9px] font-mono px-1.5 py-0.2 rounded uppercase font-semibold',
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400'
                          )}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p
                        className={cn(
                          'text-[11px] truncate mt-0.5',
                          isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                        )}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={cn('w-4 h-4 flex-shrink-0 ml-3 opacity-0', isSelected && 'opacity-100')} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-navy-950/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Navigate: ↑ ↓ • Select: ↵</span>
          <span>SmartTransit OS Mesh Index</span>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearch;
