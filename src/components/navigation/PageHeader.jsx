import React from 'react';
import { Breadcrumbs } from '../ui/Breadcrumbs.jsx';
import { cn } from '../../utils/index.js';

export function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actionSlot,
  tag,
  className = '',
}) {
  return (
    <div className={cn('mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 text-left', className)}>
      {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} className="mb-2" />}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
              {title}
            </h1>
            {tag && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-transit-500/10 text-transit-600 dark:text-transit-400 border border-transit-500/20 uppercase">
                {tag}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
        </div>

        {actionSlot && <div className="flex items-center space-x-3">{actionSlot}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
