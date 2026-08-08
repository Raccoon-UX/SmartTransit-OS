import React from 'react';
import { PublicNavbar } from './PublicNavbar.jsx';
import { PublicFooter } from './PublicFooter.jsx';
import { cn } from '../utils/index.js';

export function PublicLayout({
  children,
  onOpenDemo,
  onOpenSignIn,
  onSwitchToShell,
  className = '',
}) {
  return (
    <div className={cn('min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200', className)}>
      <PublicNavbar
        onOpenDemo={onOpenDemo}
        onOpenSignIn={onOpenSignIn}
        onSwitchToShell={onSwitchToShell}
      />
      <main className="flex-1 w-full">{children}</main>
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
