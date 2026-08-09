import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Command, 
  ChevronLeft, 
  ChevronRight,
  Sliders,
  Globe
} from 'lucide-react';
import { useTheme } from '../design-system/context/ThemeContext.jsx';
import { usePublicAccessibility } from '../context/PublicAccessibilityContext.jsx';
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
  const { language, toggleLanguage, t } = usePublicAccessibility();
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

      <div className="h-18 sm:h-20 px-3 sm:px-6 flex items-center justify-between gap-3 max-w-full">
        {/* Left: Official Masthead Identity (Larger Dual Emblems + Stacked Title) */}
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

          {/* Larger Dual Emblem Logos (logo.png + msrtc logo1.png) & Stacked Title */}
          <div className="flex items-center space-x-3 shrink-0 min-w-0">
            <div className="flex items-center space-x-2.5 shrink-0">
              <img src={logoImg} alt="SmartTransit OS Logo" className="h-10 sm:h-12 w-auto max-w-[140px] object-contain shrink-0" />
              <span className="text-slate-300 dark:text-slate-700 text-lg font-mono">|</span>
              <img src={msrtcLogo1} alt="MSRTC Official Emblem" className="h-9 sm:h-11 w-auto max-w-[130px] object-contain shrink-0" />
            </div>

            {/* Vertically Stacked Title (SmartTransit OS on Top, GOVT PORTAL on Bottom) */}
            <div className="hidden sm:flex flex-col justify-center border-l border-slate-300 dark:border-slate-700 pl-3 shrink-0 leading-tight">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white font-sans shrink-0">
                SmartTransit <span className="text-[#B83E12] dark:text-amber-400">OS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-extrabold tracking-widest px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[#B83E12] dark:text-amber-400 border border-slate-300 dark:border-slate-700 w-fit shrink-0 mt-0.5">
                GOVT PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar Trigger (Clearly Visible & Well-Proportioned) */}
        <div className="flex-1 min-w-[180px] max-w-xs sm:max-w-sm lg:max-w-md mx-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              'w-full flex items-center justify-between px-3.5 py-2 rounded-lg border text-xs font-sans transition-all shadow-xs',
              'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
              'hover:border-[#B83E12] dark:hover:border-amber-400 hover:bg-white dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#B83E12]'
            )}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <Search className="w-4 h-4 text-[#B83E12] dark:text-amber-400 flex-shrink-0" />
              <span className="truncate font-medium">{t('menuBusSearch')}</span>
            </div>
            <kbd className="hidden md:inline-flex items-center space-x-0.5 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono text-slate-500 shadow-subtle shrink-0">
              <Command className="w-3 h-3 inline" />
              <span>K</span>
            </kbd>
          </button>
        </div>

        {/* Right: Operational Controls & Language Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          <div className="hidden 2xl:block">
            <LiveSystemIndicator />
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={Sliders}
            onClick={() => setDemoModalOpen(true)}
            className="hidden xl:inline-flex text-xs font-mono font-bold"
          >
            Sandbox Controls
          </Button>

          {/* Global Language Switcher (English | मराठी) */}
          <div className="flex items-center space-x-0.5 p-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xs shrink-0">
            <button
              type="button"
              onClick={() => toggleLanguage('en')}
              className={cn(
                'px-2 py-0.5 rounded text-[11px] font-bold transition-colors leading-none',
                language === 'en'
                  ? 'bg-[#B83E12] text-white shadow-xs font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              EN
            </button>
            <span className="text-slate-300 dark:text-slate-600 text-[10px]">|</span>
            <button
              type="button"
              onClick={() => toggleLanguage('mr')}
              className={cn(
                'px-2 py-0.5 rounded text-[11px] font-bold transition-colors font-sans leading-none',
                language === 'mr'
                  ? 'bg-[#B83E12] text-white shadow-xs font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              मराठी
            </button>
          </div>

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
