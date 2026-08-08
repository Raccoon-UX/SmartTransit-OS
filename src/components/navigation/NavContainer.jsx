import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Reusable Sidebar Navigation Wrapper Frame
 */
export function SidebarShell({
  children,
  headerSlot,
  footerSlot,
  collapsed = false,
  onToggleCollapse,
  className = '',
}) {
  return (
    <aside
      className={cn(
        'h-screen flex flex-col justify-between border-r transition-all duration-300 text-left',
        'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Top Header / Logo Slot */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="overflow-hidden whitespace-nowrap">{headerSlot}</div>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Main Navigation Item Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">{children}</div>

      {/* Footer / Profile / Role Status Slot */}
      {footerSlot && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">{footerSlot}</div>
      )}
    </aside>
  );
}

/**
 * Reusable Sidebar Navigation Item
 */
export function SidebarItem({
  label,
  icon: Icon,
  isActive = false,
  badge,
  onClick,
  collapsed = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center rounded-xl p-2.5 text-xs font-semibold transition-all duration-150 relative group',
        isActive
          ? 'bg-transit-500 text-white shadow-sm'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 hover:text-slate-900 dark:hover:text-white'
      )}
    >
      {Icon && <Icon className={cn('w-4 h-4 flex-shrink-0', collapsed ? 'mx-auto' : 'mr-3')} />}
      {!collapsed && <span className="flex-1 text-left truncate">{label}</span>}
      {!collapsed && badge && (
        <span
          className={cn(
            'text-[10px] font-mono px-1.5 py-0.2 rounded-full',
            isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-navy-700 text-slate-700 dark:text-slate-300'
          )}
        >
          {badge}
        </span>
      )}
      {/* Tooltip on collapsed state */}
      {collapsed && (
        <div className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
          {label}
        </div>
      )}
    </button>
  );
}

export default SidebarShell;
