import React, { useState } from 'react';
import { 
  Activity, 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Command, 
  ChevronLeft, 
  ChevronRight,
  Sliders
} from 'lucide-react';
import { useTheme } from '../design-system/context/ThemeContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { RoleSwitcher } from '../components/navigation/RoleSwitcher.jsx';
import { LiveSystemIndicator } from '../components/system/LiveSystemIndicator.jsx';
import { NotificationCenter } from '../components/notifications/NotificationCenter.jsx';
import { ProfileMenu } from '../components/profile/ProfileMenu.jsx';
import { DemoControlModal } from '../components/system/DemoControlModal.jsx';
import { cn } from '../utils/index.js';

export function AppHeader({
  sidebarCollapsed,
  onToggleSidebar,
  onOpenMobileNav,
  onOpenSearch,
  currentRole,
  onRoleChange,
  className = '',
}) {
  const { isDark, toggleTheme } = useTheme();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 h-16 w-full border-b transition-colors duration-200',
        'bg-white/95 dark:bg-navy-900/95 backdrop-blur-md',
        'border-slate-200/90 dark:border-slate-800',
        className
      )}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left Section: Brand & Sidebar Toggle */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 focus:outline-none"
            aria-label="Open Mobile Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors focus:outline-none"
            aria-label="Toggle Sidebar Navigation"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Clean Brand Logo */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-transit-500 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white font-sans">
                SmartTransit <span className="text-transit-500 font-semibold">OS</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center Section: Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              'w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border text-xs transition-all',
              'bg-slate-100/90 dark:bg-navy-950/80 border-slate-200/90 dark:border-slate-800 text-slate-500 dark:text-slate-400',
              'hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-navy-900 focus:outline-none'
            )}
          >
            <div className="flex items-center space-x-2 truncate">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">Search buses, routes, stops...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-400 shadow-sm">
              <Command className="w-3 h-3 inline" />
              <span>K</span>
            </kbd>
          </button>
        </div>

        {/* Right Section: System Indicator, Demo Trigger, Role Switcher, Notifications, Theme & Profile */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Live System Indicator */}
          <div className="hidden md:block">
            <LiveSystemIndicator />
          </div>

          {/* Demo Control Trigger */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDemoModalOpen(true)}
            className="hidden xl:inline-flex text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl"
            leftIcon={Sliders}
          >
            Demo Controls
          </Button>

          {/* Role Switcher */}
          <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />

          {/* Notifications */}
          <NotificationCenter />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Profile Menu */}
          <ProfileMenu currentRole={currentRole} />
        </div>
      </div>

      {/* Demo Control Center Modal */}
      <DemoControlModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </header>
  );
}

export default AppHeader;
