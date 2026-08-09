import React from 'react';
import { Eye } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { cn } from '../../utils/index.js';

import logoImg from '../../assets/logo.png';
import msrtcLogo1 from '../../assets/msrtc logo1.png';

import bestLogo from '../../assets/BEST Bus_logo.png';
import msrtcLogo from '../../assets/msrtc logo.png';
import tmtLogo from '../../assets/TMT_logo.png';

export function PublicBrandHeader() {
  const {
    language,
    toggleLanguage,
    highContrast,
    toggleHighContrast,
    t,
  } = usePublicAccessibility();

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-[#DDD8CE] dark:border-slate-800 py-2 sm:py-3 px-6 sm:px-10 lg:px-12 text-left select-none font-sans leading-none w-full">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Left Side: Dual Emblem Logos (Larger Images to fill row nicely) */}
        <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
          <img
            src={logoImg}
            alt="SmartTransit OS Logo"
            className="h-15 sm:h-19 w-auto max-w-[220px] object-contain shrink-0"
          />
          <span className="text-slate-300 dark:text-slate-700 text-2xl font-mono shrink-0">|</span>
          <img
            src={msrtcLogo1}
            alt="MSRTC Official Emblem"
            className="h-20 sm:h-26 w-auto max-w-[420px] object-contain shrink-0"
          />
        </div>

        {/* Right Side: Transit Network Partners + Stacked High Contrast & English/Marathi (Equal Spacing) */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 sm:gap-6 shrink-0">
          {/* Transit Network Partners Logo Box (Larger Emblems) */}
          <div className="flex items-center space-x-3.5 bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs">
            <div className="text-right pr-1">
              <span className="block text-[11px] font-mono font-bold uppercase text-slate-700 dark:text-slate-200 tracking-wider leading-none">
                {t('transitPartners')}
              </span>
              <span className="block text-[10px] text-slate-400 font-sans mt-0.5 leading-none">Connected Network</span>
            </div>
            <span className="text-slate-300 dark:text-slate-600 text-sm">|</span>
            <img
              src={bestLogo}
              alt="BEST Undertaking Logo"
              title="BEST Undertaking"
              className="h-11 sm:h-13 w-auto object-contain shrink-0 px-0.5"
            />
            <span className="text-slate-300 dark:text-slate-600 text-sm">|</span>
            <img
              src={msrtcLogo}
              alt="MSRTC Corporation Logo"
              title="MSRTC Transport Corporation"
              className="h-11 sm:h-13 w-auto object-contain shrink-0 px-0.5"
            />
            <span className="text-slate-300 dark:text-slate-600 text-sm">|</span>
            <img
              src={tmtLogo}
              alt="TMT Transport Logo"
              title="Thane Municipal Transport (TMT)"
              className="h-11 sm:h-13 w-auto object-contain shrink-0 px-0.5"
            />
          </div>

          <span className="hidden sm:inline text-slate-300 dark:text-slate-700 text-2xl font-mono shrink-0">|</span>

          {/* STACKED ACCESSIBILITY & LANGUAGE CONTROLS */}
          <div className="flex flex-col items-stretch justify-center space-y-2 shrink-0">
            {/* High Contrast Toggle Button */}
            <button
              type="button"
              onClick={toggleHighContrast}
              className={cn(
                'px-4 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2 shrink-0 shadow-xs leading-none w-full text-center',
                highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                  : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
              title="Toggle High Contrast Mode"
            >
              <Eye className="w-4 h-4 text-[#B83E12] dark:text-amber-400 inline shrink-0" />
              <span>{t('highContrast')}</span>
            </button>

            {/* Language Switcher (English | मराठी) */}
            <div className="flex items-center justify-between space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0 font-mono text-xs w-full">
              <button
                type="button"
                onClick={() => toggleLanguage('en')}
                className={cn(
                  'flex-1 px-3 py-1 rounded-lg text-xs font-bold transition-colors leading-none text-center',
                  language === 'en'
                    ? 'bg-[#B83E12] text-white shadow-xs font-black'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                English
              </button>
              <span className="text-slate-300 dark:text-slate-600 text-xs">|</span>
              <button
                type="button"
                onClick={() => toggleLanguage('mr')}
                className={cn(
                  'flex-1 px-3 py-1 rounded-lg text-xs font-bold transition-colors font-sans leading-none text-center',
                  language === 'mr'
                    ? 'bg-[#B83E12] text-white shadow-xs font-black'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicBrandHeader;
