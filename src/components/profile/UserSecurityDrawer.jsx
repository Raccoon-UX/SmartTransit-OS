import React from 'react';
import { Shield, Key, Lock, CheckCircle2, AlertTriangle, ShieldCheck, Database, Server, Cpu } from 'lucide-react';
import { Drawer } from '../ui/Drawer.jsx';
import { ROLE_METADATA } from '../../services/auth/authTypes.js';
import { Badge } from '../ui/Badge.jsx';

export function UserSecurityDrawer({ isOpen, onClose, user, role = 'admin' }) {
  const effectiveRole = user?.role || role || 'admin';
  const roleMeta = ROLE_METADATA[effectiveRole] || ROLE_METADATA.admin;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Security & RBAC Keys"
      subtitle="Role-based authorization matrix & security parameters"
      width="max-w-md"
    >
      <div className="space-y-6 text-left font-sans text-xs">
        
        {/* Prototype Security Disclaimer Alert */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono text-[11px] flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Prototype Security Information:</strong> No real credentials, JWT secrets, passwords, or private API keys are displayed.
          </div>
        </div>

        {/* 1. SECURITY & ACCESS OVERVIEW */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span>SECURITY & AUTHORIZATION SCOPE</span>
          </h4>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 font-mono text-[11px]">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Authentication State</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                Authenticated
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Auth Method</span>
              <span className="text-slate-900 dark:text-white font-bold">Prototype JWT Session</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Active Role ID</span>
              <Badge variant="primary" size="sm">
                {effectiveRole}
              </Badge>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">RBAC Policy Matrix</span>
              <span className="text-slate-900 dark:text-white font-bold">{roleMeta.name} Policy</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase">Access Scope</span>
              <span className="text-slate-900 dark:text-white font-bold">Operational Transit Control</span>
            </div>
          </div>
        </div>

        {/* 2. RBAC PERMISSIONS MATRIX */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
            <Key className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span>ROLE PERMISSIONS MATRIX</span>
          </h4>

          <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 font-mono text-[11px]">
            {/* Allowed Capabilities */}
            <div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block mb-1.5">
                ✓ Authorized Module Access
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  'Fleet Roster',
                  'Driver Management',
                  'Route Network',
                  'Bus Stop Kiosks',
                  'Schedule Dispatch',
                  'Dispatch Control',
                  'Service Advisories',
                  'Fleet Analytics',
                  'Operational Reports',
                  'AI Recommendations',
                ].map((cap) => (
                  <div key={cap} className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-200 bg-emerald-500/5 p-1.5 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Restricted Infrastructure Features */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block mb-1.5">
                🔒 Restricted Administrative System Areas
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  'System Infrastructure',
                  'Database Admin',
                  'Disaster Backups',
                  'Security Audit Logs',
                  'AI Engine Tuning',
                  'SOC Infrastructure',
                ].map((area) => (
                  <div key={area} className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-900/50 p-1.5 rounded-lg border border-slate-300/60 dark:border-slate-700/60">
                    <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. SESSION SECURITY PARAMETERS */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span>SESSION SECURITY PARAMETERS</span>
          </h4>

          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 font-mono text-[11px]">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Session Status</span>
              <span className="text-slate-900 dark:text-white font-bold">Active</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Session Timeout</span>
              <span className="text-slate-900 dark:text-white font-bold">30 Minutes</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Security Level</span>
              <span className="text-slate-900 dark:text-white font-bold">Operational L2</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">API Keys</span>
              <span className="text-slate-900 dark:text-white font-bold">Protected (Hashed & Signed)</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase">RBAC Enforcement</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Enabled</span>
            </div>
          </div>
        </div>

      </div>
    </Drawer>
  );
}

export default UserSecurityDrawer;
