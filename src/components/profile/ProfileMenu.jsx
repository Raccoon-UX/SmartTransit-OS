import React, { useState } from 'react';
import { User, Settings, Shield, LogOut, ChevronDown, Check, Sliders, Bell, Terminal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Badge } from '../ui/Badge.jsx';
import { cn } from '../../utils/index.js';

export function ProfileMenu({
  className = '',
  onLogoutCallback,
}) {
  const { user, role, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Fallback defaults if accessed during unauthenticated development
  const userName = user?.name || 'Sujal Verma';
  const roleTitle = user?.roleTitle || 'Chief Transit Architect';
  const roleCode = user?.roleCode || (role ? role.toUpperCase() : 'ADMIN');
  const avatarInitials = user?.avatar || userName.split(' ').map((n) => n[0]).join('').slice(0, 2);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    if (onLogoutCallback) {
      onLogoutCallback();
    }
  };

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-2.5 p-1 rounded-xl transition-all',
          'hover:bg-slate-100 dark:hover:bg-navy-850 border border-transparent hover:border-slate-200 dark:hover:border-slate-800',
          'focus:outline-none focus:ring-2 focus:ring-transit-500'
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-transit-500 to-transit-700 text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm">
          {avatarInitials}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-1">
            <span>{userName}</span>
            <ChevronDown className={cn('w-3 h-3 text-slate-400 transition-transform duration-150', isOpen && 'rotate-180')} />
          </div>
          <span className="text-[10px] font-mono text-slate-400 block leading-tight">{roleTitle}</span>
        </div>
      </button>

      {/* Profile Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 text-left space-y-2">
            {/* User Details Banner */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800/80">
              <div className="text-xs font-bold text-slate-900 dark:text-white">{userName}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{user?.email || 'authenticated.session'}</div>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  {roleCode}
                </Badge>
                {user?.assignedUnit && (
                  <span className="text-[9px] font-mono text-slate-400 truncate">
                    {user.assignedUnit}
                  </span>
                )}
              </div>
            </div>

            {/* Menu Links */}
            <div className="py-1 space-y-0.5 text-xs text-slate-700 dark:text-slate-300">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-850 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile & ID</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-850 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Sliders className="w-4 h-4 text-slate-400" />
                <span>Transit Preferences</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-850 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Security & RBAC Keys</span>
              </button>
            </div>

            {/* Centralized Logout Action */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-xs font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileMenu;
