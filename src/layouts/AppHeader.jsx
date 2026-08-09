import React, { useState } from 'react';
import { 
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

import logoImg from '../assets/logo.png';
import msrtcLogo1 from '../assets/msrtc logo1.png';

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
        'sticky top-0 z-30 w-full text-left bg-white dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 shadow-subtle',
        className
      )}
    >
      {/* Top 3px Solid Institutional Accent Line */}
      <div className="h-1 bg-[#B83E12] w-full" />

      <div className="h-16 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 max-w-full">
        {/* Left: Official Masthead Identity (Dual Emblem: logo.png + msrtc logo1.png) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="lg:hidden p-1.5 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden lg:flex p-1.5 rounded text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0"
            aria-label="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Official Dual Emblem Logos (logo.png + msrtc logo1.png) & Title */}
          <div className="flex items-center space-x-2.5 shrink-0 min-w-0">
            <div className="flex items-center space-x-2 shrink-0">
              <img src={logoImg} alt="SmartTransit OS Logo" className="h-8 sm:h-9 w-auto max-w-[110px] object-contain shrink-0" />
              <span className="text-slate-300 dark:text-slate-700 text-sm font-mono">|</span>
              <img src={msrtcLogo1} alt="MSRTC Official Emblem" className="h-7 sm:h-8 w-auto max-w-[100px] object-contain shrink-0" />
            </div>

            <div className="hidden sm:flex items-center space-x-2 border-l border-slate-300 dark:border-slate-700 pl-3 shrink-0 whitespace-nowrap">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white font-sans shrink-0">
                SmartTransit <span className="text-[#B83E12] dark:text-amber-400">OS</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#B83E12] dark:text-amber-400 border border-slate-300 dark:border-slate-700 shrink-0 whitespace-nowrap">
                GOVT PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Trigger (Flat Bordered) */}
        <div className="flex-1 min-w-0 max-w-xs xl:max-w-md mx-1 sm:mx-4">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              'w-full flex items-center justify-between px-3 py-1.5 rounded border text-xs transition-colors',
              'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400',
              'hover:border-[#B83E12] dark:hover:border-amber-400 hover:bg-white dark:hover:bg-slate-900 focus:outline-none'
            )}
          >
            <div className="flex items-center space-x-2 truncate">
              <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span className="truncate">Search buses, routes...</span>
            </div>
            <kbd className="hidden md:inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono text-slate-500 shadow-subtle shrink-0">
              <Command className="w-3 h-3 inline" />
              <span>K</span>
            </kbd>
          </button>
        </div>

        {/* Right: Operational Controls & Status */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div className="hidden xl:block">
            <LiveSystemIndicator />
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={Sliders}
            onClick={() => setDemoModalOpen(true)}
            className="hidden md:inline-flex text-xs font-mono font-bold"
          >
            Sandbox Controls
          </Button>

          <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />

          <NotificationCenter />

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none border border-slate-300 dark:border-slate-700 shrink-0"
            aria-label="Toggle Light and Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <ProfileMenu />
        </div>
      </div>

      {/* Interactive Demo Simulator Modal */}
      <DemoControlModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </header>
  );
}

export default AppHeader;
