import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Standard Reusable Enterprise Breadcrumb Trail
 */
export function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono', className)}>
      <span className="flex items-center hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
        <Home className="w-3.5 h-3.5" />
      </span>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 flex-shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {item.label}
              </span>
            ) : (
              <span
                onClick={item.onClick}
                className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
