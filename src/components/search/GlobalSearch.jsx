import React, { useState, useEffect } from 'react';
import { Search, Bus, Route, MapPin, User, Server, AlertTriangle, ArrowRight, X, Command } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { cn } from '../../utils/index.js';

const MOCK_SEARCH_DATABASE = [
  { id: 'b-245', type: 'BUS', title: 'Bus 245 (NY-TR-8042)', subtitle: 'Route RT-108 • Borivali ⇄ Andheri • ETA 4m', icon: Bus, category: 'Vehicles' },
  { id: 'b-312', type: 'BUS', title: 'Bus 312 (NY-TR-9914)', subtitle: 'Route RT-204 • Airport Express • ETA 11m', icon: Bus, category: 'Vehicles' },
  { id: 'r-108', type: 'ROUTE', title: 'Route RT-108 (Metro Coastal Line)', subtitle: '18 Bus Stops • Active Fleet: 12 Buses', icon: Route, category: 'Routes' },
  { id: 'r-204', type: 'ROUTE', title: 'Route RT-204 (Airport Superfast)', subtitle: '10 Bus Stops • Active Fleet: 8 Buses', icon: Route, category: 'Routes' },
  { id: 's-104', type: 'STOP', title: 'Central Station Terminal Hub (BST-104)', subtitle: 'Digital LED Kiosk • 6 Connecting Routes', icon: MapPin, category: 'Stops' },
  { id: 's-208', type: 'STOP', title: 'Andheri West Metro Exchange (BST-208)', subtitle: 'Digital LED Kiosk • 4 Connecting Routes', icon: MapPin, category: 'Stops' },
  { id: 'd-882', type: 'DRIVER', title: 'Driver DRV-8820 (Vikram Jadhav)', subtitle: 'Assigned to Bus 245 • Shift Active', icon: User, category: 'Personnel' },
  { id: 'sys-1', type: 'SYSTEM', title: 'Core Telemetry Ingestion Node', subtitle: '99.98% Uptime • 14.2k msgs/sec', icon: Server, category: 'Infrastructure' },
];

export function GlobalSearch({ isOpen = false, onClose, onSelect }) {
  const { role } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = MOCK_SEARCH_DATABASE.filter((item) => {
    // Role-Based Access Control Filtering
    if (role === 'passenger' && (item.category === 'Personnel' || item.category === 'Infrastructure')) return false;
    if (role === 'driver' && item.category === 'Infrastructure') return false;
    if (role === 'admin' && item.category === 'Infrastructure') return false;

    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
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
