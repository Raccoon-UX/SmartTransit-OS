import React from 'react';
import { ShieldAlert, ArrowLeft, ArrowRight, Layout, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { ROLE_METADATA } from '../../services/auth/authTypes.js';

export function UnauthorizedPage({ onNavigateBack, onNavigateDashboard }) {
  const { user, role, logout } = useAuth();
  const roleMeta = ROLE_METADATA[role] || ROLE_METADATA.passenger;

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto w-full bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-2xl text-center space-y-6">
        {/* Shield Alert Icon */}
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 mx-auto flex items-center justify-center shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-500 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            HTTP 403 • FORBIDDEN
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight pt-2">
            Access Restricted
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            You don't have permission to access this area. This route is guarded by SmartTransit OS Role-Based Access Control policies.
          </p>
        </div>

        {/* Current Role Context Card */}
        {user && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-left text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current User:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{user.name}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Assigned Role:</span>
              <span className="text-transit-500 font-bold uppercase">{roleMeta.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="text-slate-400">{user.department || 'Urban Mobility'}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            leftIcon={ArrowLeft}
            onClick={onNavigateBack}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>

          <Button
            variant="primary"
            size="md"
            rightIcon={ArrowRight}
            onClick={onNavigateDashboard}
            className="w-full sm:w-auto shadow-glow"
          >
            Go to Authorized Dashboard
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-400">
          Client-side RBAC in this prototype demonstrates UI and access-flow behavior.
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
