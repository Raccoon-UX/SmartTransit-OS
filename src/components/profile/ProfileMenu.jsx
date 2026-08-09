import React, { useState } from 'react';
import { User, Settings, Shield, LogOut, ChevronDown, Check, Sliders, Bell, Terminal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Badge } from '../ui/Badge.jsx';
import { UserAvatar } from '../ui/UserAvatar.jsx';
import { UserProfileDrawer } from './UserProfileDrawer.jsx';
import { UserPreferencesDrawer } from './UserPreferencesDrawer.jsx';
import { UserSecurityDrawer } from './UserSecurityDrawer.jsx';
import { cn } from '../../utils/index.js';

export function ProfileMenu({
  className = '',
  onLogoutCallback,
}) {
  const { user, role, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null); // 'profile' | 'preferences' | 'security' | null

  // Fallback defaults if accessed during unauthenticated development
  const userName = user?.name || 'Priya Nambiar';
  const roleTitle = user?.roleTitle || 'Chief Dispatch Officer';
  const roleCode = user?.roleCode || (role ? role.toUpperCase() : 'ADMIN');

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    if (onLogoutCallback) {
      onLogoutCallback();
    }
  };

  const handleOpenDrawer = (drawerType) => {
    setIsOpen(false);
    setActiveDrawer(drawerType);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Profile Trigger Button in Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="User Profile and Security Menu"
        className={cn(
          'flex items-center space-x-2.5 p-1 sm:px-2 rounded-xl transition-all cursor-pointer select-none',
          'hover:bg-slate-100 dark:hover:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-xs',
          'focus:outline-none focus:ring-2 focus:ring-[#B83E12] dark:focus:ring-amber-400'
        )}
      >
        <UserAvatar name={userName} role={role} size="sm" status="online" />
        
        <div className="hidden md:block text-left">
          <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-1">
            <span>{userName}</span>
            <ChevronDown className={cn('w-3 h-3 text-slate-400 transition-transform duration-150', isOpen && 'rotate-180')} />
          </div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block leading-tight">{roleTitle}</span>
        </div>
      </button>

      {/* Profile Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 text-left space-y-2 select-none">
            {/* User Details Banner */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-2.5">
                <UserAvatar name={userName} role={role} size="md" status="online" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{userName}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">{user?.email || 'admin@smarttransit.city'}</div>
                </div>
              </div>
              
              <div className="mt-2.5 flex items-center gap-2">
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

            {/* Menu Links with Real Functional Drawers */}
            <div className="py-1 space-y-0.5 text-xs text-slate-700 dark:text-slate-300">
              <button
                type="button"
                onClick={() => handleOpenDrawer('profile')}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-850 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left font-medium"
              >
                <User className="w-4 h-4 text-[#B83E12] dark:text-amber-400 shrink-0" />
                <span>My Profile & ID</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleOpenDrawer('preferences')}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-850 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left font-medium"
              >
                <Sliders className="w-4 h-4 text-[#B83E12] dark:text-amber-400 shrink-0" />
                <span>Transit Preferences</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleOpenDrawer('security')}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-850 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left font-medium"
              >
                <Shield className="w-4 h-4 text-[#B83E12] dark:text-amber-400 shrink-0" />
                <span>Security & RBAC Keys</span>
              </button>
            </div>

            {/* Centralized Sign Out Action */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-xs font-semibold cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* 3 Interactive Drawers */}
      <UserProfileDrawer
        isOpen={activeDrawer === 'profile'}
        onClose={() => setActiveDrawer(null)}
        user={user}
        role={role}
      />

      <UserPreferencesDrawer
        isOpen={activeDrawer === 'preferences'}
        onClose={() => setActiveDrawer(null)}
      />

      <UserSecurityDrawer
        isOpen={activeDrawer === 'security'}
        onClose={() => setActiveDrawer(null)}
        user={user}
        role={role}
      />
    </div>
  );
}

export default ProfileMenu;
