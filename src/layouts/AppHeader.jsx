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
import { usePublicAccessibility } from '../context/PublicAccessibilityContext.jsx';
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
  const { language, toggleLanguage, t } = usePublicAccessibility();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full max-w-full text-left bg-white dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 shadow-subtle box-border',
        className
      )}
    >
      {/* Top 3px Solid Institutional Accent Line */}
      <div className="h-1 bg-[#B83E12] w-full" />

      {/* Main Header Row — Dynamic Fluid Fit for All Screen Resolutions */}
      <div className="relative h-14 sm:h-16 px-2 sm:px-4 flex items-center justify-between gap-1.5 sm:gap-2 w-full max-w-full box-border">
        
        {/* Left: Brand Identity & Toggle */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="lg:hidden p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0 cursor-pointer"
            aria-label="Open Navigation"
          >
            <Menu className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0 cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>

          {/* Dual Emblem Logos */}
          <div className="flex items-center space-x-1.5 shrink-0 min-w-0">
            <img
              src={logoImg}
              alt="SmartTransit OS Logo"
              className="h-7 sm:h-8 md:h-9 w-auto max-w-[85px] sm:max-w-[110px] object-contain shrink-0"
            />
            <span className="text-slate-300 dark:text-slate-700 text-sm font-mono hidden xl:inline">|</span>
            <img
              src={msrtcLogo1}
              alt="MSRTC Official Emblem"
              className="hidden xl:block h-7 sm:h-8 md:h-9 w-auto max-w-[110px] sm:max-w-[140px] object-contain shrink-0"
            />
          </div>

          {/* Vertically Stacked Title (Visible on extra-wide screens) */}
          <div className="hidden 2xl:flex flex-col justify-center border-l border-slate-300 dark:border-slate-700 pl-2 shrink-0 leading-tight">
            <span className="font-extrabold text-xs tracking-tight text-slate-900 dark:text-white font-sans shrink-0">
              SmartTransit <span className="text-[#B83E12] dark:text-amber-400">OS</span>
            </span>
            <span className="text-[8px] font-mono font-extrabold tracking-widest px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[#B83E12] dark:text-amber-400 border border-slate-300 dark:border-slate-700 w-fit shrink-0 mt-0.5">
              GOVT PORTAL
            </span>
          </div>
        </div>

        {/* Center: Search Bar Trigger */}
        <div className="hidden md:block flex-1 min-w-[110px] max-w-[170px] lg:max-w-[220px] xl:max-w-[280px] mx-1 sm:mx-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              'w-full flex items-center justify-between px-2.5 py-1 rounded-lg border text-xs font-sans transition-all shadow-2xs cursor-pointer',
              'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
              'hover:border-[#B83E12] dark:hover:border-amber-400 hover:bg-white dark:hover:bg-slate-900 focus:outline-none'
            )}
          >
            <div className="flex items-center space-x-1.5 truncate">
              <Search className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 flex-shrink-0" />
              <span className="truncate text-[11px] font-medium">{t('menuBusSearch')}</span>
            </div>
            <kbd className="hidden xl:inline-flex items-center space-x-0.5 px-1 py-0.2 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[9px] font-mono text-slate-400 shadow-2xs shrink-0">
              <Command className="w-2.5 h-2.5 inline" />
              <span>K</span>
            </kbd>
          </button>
        </div>

        {/* Right: Operational Controls & Dropdowns */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
          {/* Live Telemetry Popover Indicator */}
          <div className="hidden 2xl:block">
            <LiveSystemIndicator />
          </div>

          {/* Sandbox Controls Button */}
          <button
            type="button"
            onClick={() => setDemoModalOpen(true)}
            className="hidden lg:flex items-center space-x-1 px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-[#B83E12] dark:hover:border-amber-400 text-left transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
            <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">
              Controls
            </span>
          </button>

          {/* Language Switcher (EN | मराठी) */}
          <div className="flex items-center space-x-0.5 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px] shrink-0">
            <button
              type="button"
              onClick={() => toggleLanguage('en')}
              className={cn(
                'px-1.5 py-0.5 rounded font-bold transition-colors leading-none cursor-pointer',
                language === 'en'
                  ? 'bg-[#B83E12] text-white shadow-2xs font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              )}
            >
              EN
            </button>
            <span className="text-slate-300 dark:text-slate-600 text-[9px]">|</span>
            <button
              type="button"
              onClick={() => toggleLanguage('mr')}
              className={cn(
                'px-1.5 py-0.5 rounded font-bold transition-colors font-sans leading-none cursor-pointer',
                language === 'mr'
                  ? 'bg-[#B83E12] text-white shadow-2xs font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              )}
            >
              मराठी
            </button>
          </div>

          {/* Interactive Role Switcher Dropdown (4 Options) */}
          <div className="hidden sm:block">
            <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />
          </div>

          {/* Notification Center */}
          <NotificationCenter />

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none border border-slate-300 dark:border-slate-700 shrink-0 cursor-pointer"
            aria-label="Toggle Light and Dark Mode"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>

          {/* Profile Menu Dropdown */}
          <ProfileMenu />
        </div>
      </div>

      {/* Interactive Demo Simulator Modal */}
      <DemoControlModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </header>
  );
}

export default AppHeader;
