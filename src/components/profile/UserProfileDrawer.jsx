import React from 'react';
import { User, ShieldCheck, Mail, Building, MapPin, Key, Clock, Award, CheckCircle2, Laptop } from 'lucide-react';
import { Drawer } from '../ui/Drawer.jsx';
import { UserAvatar } from '../ui/UserAvatar.jsx';
import { Badge } from '../ui/Badge.jsx';
import { ROLE_METADATA } from '../../services/auth/authTypes.js';

export function UserProfileDrawer({ isOpen, onClose, user, role = 'admin' }) {
  const effectiveRole = user?.role || role || 'admin';
  const roleMeta = ROLE_METADATA[effectiveRole] || ROLE_METADATA.admin;

  const userName = user?.name || 'Priya Nambiar';
  const userEmail = user?.email || 'admin@smarttransit.city';
  const roleTitle = user?.roleTitle || roleMeta.title;
  const department = user?.department || 'Municipal Transport Authority';
  const employeeId = user?.id || 'TRN-ADM-001';
  const assignedUnit = user?.assignedUnit || 'Metropolitan Fleet Command';

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="My Profile & ID"
      subtitle="Account identity & operational workspace credentials"
      width="max-w-md"
    >
      <div className="space-y-6 text-left font-sans text-xs">
        {/* User Identity Header Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-950 text-white border border-slate-800 shadow-lg flex items-center space-x-4">
          <UserAvatar name={userName} role={effectiveRole} size="lg" status="online" />
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="text-base font-extrabold truncate">{userName}</h3>
            <p className="text-xs text-amber-400 font-mono font-bold truncate">{roleTitle}</p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="primary" size="sm">
                {roleMeta.code || effectiveRole.toUpperCase()}
              </Badge>
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 inline" />
                <span>Active Session</span>
              </span>
            </div>
          </div>
        </div>

        {/* 1. IDENTITY SECTION */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span>IDENTITY & EMPLOYEE CREDENTIALS</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 font-mono text-[11px]">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Full Name</span>
              <strong className="text-slate-900 dark:text-white font-bold">{userName}</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Role Title</span>
              <strong className="text-[#B83E12] dark:text-amber-400 font-bold">{roleTitle}</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Role ID</span>
              <strong className="text-slate-900 dark:text-white font-bold">{effectiveRole}</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Employee / Operator ID</span>
              <strong className="text-slate-900 dark:text-white font-bold">{employeeId}</strong>
            </div>

            <div className="col-span-2">
              <span className="text-[10px] text-slate-500 uppercase block">Department</span>
              <strong className="text-slate-900 dark:text-white font-bold">{department}</strong>
            </div>

            <div className="col-span-2">
              <span className="text-[10px] text-slate-500 uppercase block">Organization</span>
              <strong className="text-slate-900 dark:text-white font-bold">SmartTransit OS — Municipal Transport Authority</strong>
            </div>
          </div>
        </div>

        {/* 2. ACCOUNT & WORKSPACE SECTION */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
            <Laptop className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span>ACCOUNT & WORKSPACE DETAILS</span>
          </h4>

          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 font-mono text-[11px]">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Email Address</span>
              <span className="text-slate-900 dark:text-white font-bold">{userEmail}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Account Status</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                Active (Verified)
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Assigned Unit</span>
              <span className="text-slate-900 dark:text-white font-bold">{assignedUnit}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 uppercase">Last Authenticated</span>
              <span className="text-slate-900 dark:text-white font-bold">Today, 13:52 IST</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase">Session Token</span>
              <span className="text-slate-900 dark:text-white font-bold">Authenticated JWT Session</span>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default UserProfileDrawer;
