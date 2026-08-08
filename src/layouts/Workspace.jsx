import React from 'react';
import { cn } from '../utils/index.js';

export function Workspace({
  children,
  fluid = false,
  className = '',
}) {
  return (
    <main
      className={cn(
        'flex-1 w-full min-w-0 overflow-y-auto py-6 sm:py-8 transition-colors duration-200 text-left page-transition box-border',
        fluid ? 'px-4 sm:px-6 lg:px-8' : 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      <div className="w-full min-w-0 box-border space-y-6 sm:space-y-8">
        {children}
      </div>
    </main>
  );
}

export default Workspace;
