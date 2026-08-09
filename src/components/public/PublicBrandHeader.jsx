import React from 'react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';

import logoImg from '../../assets/logo.png';
import msrtcLogo1 from '../../assets/msrtc logo1.png';

import bestLogo from '../../assets/BEST Bus_logo.png';
import msrtcLogo from '../../assets/msrtc logo.png';
import tmtLogo from '../../assets/TMT_logo.png';

export function PublicBrandHeader() {
  const { t } = usePublicAccessibility();

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-[#DDD8CE] dark:border-slate-800 py-3 px-4 sm:px-6 text-left select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Web App Logo + MSRTC Logo 1 + Title & Subtitle */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {/* Dual Emblem Logos: SmartTransit OS logo + MSRTC Logo 1 */}
          <div className="flex items-center space-x-2 shrink-0">
            <img
              src={logoImg}
              alt="SmartTransit OS Logo"
              className="h-10 sm:h-12 w-auto max-w-[130px] object-contain shrink-0"
            />
            <span className="text-slate-300 dark:text-slate-700 text-lg font-mono">|</span>
            <img
              src={msrtcLogo1}
              alt="MSRTC Official Emblem"
              className="h-9 sm:h-11 w-auto max-w-[120px] object-contain shrink-0"
            />
          </div>

          {/* Title & Subtitle */}
          <div className="border-l border-slate-300 dark:border-slate-700 pl-3 sm:pl-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight leading-none">
                {t('platformTitle')}
              </h1>
              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#B83E12] dark:text-sky-400 border border-slate-300 dark:border-slate-700 whitespace-nowrap">
                GOVT PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-0.5 leading-tight">
              {t('platformSubtitle')}
            </p>
          </div>
        </div>

        {/* Right Side: Transit Network Partners Logos */}
        <div className="hidden lg:flex items-center space-x-3 shrink-0 border-l border-slate-200 dark:border-slate-800 pl-4">
          <div className="text-right">
            <span className="block text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
              {t('transitPartners')}
            </span>
            <span className="block text-[9px] text-slate-400 font-sans">Connected Transport Network</span>
          </div>

          <div className="flex items-center space-x-2.5 bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded border border-slate-200 dark:border-slate-700">
            <img
              src={bestLogo}
              alt="BEST Undertaking Logo"
              title="BEST Undertaking"
              className="h-8 w-auto object-contain shrink-0 px-1"
            />
            <span className="text-slate-300 dark:text-slate-600 text-xs">|</span>
            <img
              src={msrtcLogo}
              alt="MSRTC Corporation Logo"
              title="MSRTC Transport Corporation"
              className="h-8 w-auto object-contain shrink-0 px-1"
            />
            <span className="text-slate-300 dark:text-slate-600 text-xs">|</span>
            <img
              src={tmtLogo}
              alt="TMT Transport Logo"
              title="Thane Municipal Transport (TMT)"
              className="h-8 w-auto object-contain shrink-0 px-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicBrandHeader;
