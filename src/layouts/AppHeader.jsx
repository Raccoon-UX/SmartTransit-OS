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
        'sticky top-0 z-30 h-16 w-full border-b transition-colors duration-200 text-left',
        'bg-white dark:bg-navy-900 border-[#E5E0D8] dark:border-slate-800',
        className
      )}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Branding & Sidebar Toggle */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-lg text-[#596273] dark:text-slate-300 hover:bg-[#F3F0E9] dark:hover:bg-navy-800"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg text-[#596273] hover:text-[#172033] dark:text-slate-400 dark:hover:text-white hover:bg-[#F3F0E9] dark:hover:bg-navy-800 transition-colors"
            aria-label="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1769D1] flex items-center justify-center text-white font-bold flex-shrink-0">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base tracking-tight text-[#172033] dark:text-white font-sans">
                SmartTransit <span className="text-[#1769D1]">OS</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Input */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              'w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg border text-xs transition-all',
              'bg-[#F7F5F0] dark:bg-navy-950 border-[#E5E0D8] dark:border-slate-800 text-[#596273] dark:text-slate-400',
              'hover:border-[#1769D1] dark:hover:border-slate-700 hover:bg-white dark:hover:bg-navy-900 focus:outline-none'
            )}
          >
            <div className="flex items-center space-x-2 truncate">
              <Search className="w-4 h-4 text-[#596273] flex-shrink-0" />
              <span className="truncate">Search buses, routes, stops...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-navy-800 border border-[#E5E0D8] dark:border-slate-700 text-[10px] font-mono text-[#596273] shadow-sm">
              <Command className="w-3 h-3 inline" />
              <span>K</span>
            </kbd>
          </button>
        </div>

        {/* Right: System Status, Role Switcher, Notifications, Theme & Profile */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="hidden md:block">
            <LiveSystemIndicator />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDemoModalOpen(true)}
            className="hidden xl:inline-flex text-xs text-[#596273] dark:text-slate-300 border border-[#E5E0D8] dark:border-slate-800 rounded-lg"
            leftIcon={Sliders}
          >
            Demo Controls
          </Button>

          <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />
          <NotificationCenter />

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[#596273] hover:text-[#172033] dark:text-slate-400 dark:hover:text-white hover:bg-[#F3F0E9] dark:hover:bg-navy-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#596273]" />}
          </button>

          <ProfileMenu currentRole={currentRole} />
        </div>
      </div>

      <DemoControlModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </header>
  );
}

export default AppHeader;
