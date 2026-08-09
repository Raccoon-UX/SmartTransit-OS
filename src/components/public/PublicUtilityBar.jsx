import React from 'react';
import { PhoneCall, Globe, Radio, Tv } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { CONTACT_CONFIG } from '../../config/contact.js';

export function PublicUtilityBar() {
  const {
    handleFontDecrease,
    handleFontReset,
    handleFontIncrease,
    t,
  } = usePublicAccessibility();

  return (
    <div className="bg-[#B83E12] text-white text-xs font-mono border-b border-[#9E2F0A] py-1.5 px-4 sm:px-6 select-none leading-none overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex flex-nowrap items-center justify-between gap-4 whitespace-nowrap min-w-max">
        {/* Left Side: Welcome & Helplines (Equal Alignment) */}
        <div className="flex flex-nowrap items-center space-x-3 text-xs leading-none shrink-0">
          <span className="font-bold text-amber-200 shrink-0">
            {t('welcomeText')}
          </span>
          <span className="text-[#E87A50] shrink-0 font-light">|</span>

          {/* Helpline 1: Public */}
          <div className="flex items-center space-x-1.5 text-white shrink-0">
            <PhoneCall className="w-3.5 h-3.5 text-amber-300 shrink-0 inline-block align-middle" />
            <span className="text-amber-100 text-xs shrink-0">{t('publicHelplineLabel')}</span>
            <strong className="font-bold tracking-wider text-xs shrink-0 text-white">{CONTACT_CONFIG.PUBLIC_HELPLINE}</strong>
          </div>

          <span className="text-[#E87A50] shrink-0 font-light">|</span>

          {/* Helpline 2: Student */}
          <div className="flex items-center space-x-1.5 text-white shrink-0">
            <span className="text-amber-100 text-xs shrink-0">{t('studentHelplineLabel')}</span>
            <strong className="font-bold tracking-wider text-xs shrink-0 text-white">{CONTACT_CONFIG.STUDENT_HELPLINE}</strong>
          </div>
        </div>

        {/* Right Side: Media Links & Text Resize Controls (Equal Alignment, Exact Official Links) */}
        <div className="flex flex-nowrap items-center space-x-4 ml-auto text-xs leading-none shrink-0">
          {/* Skip to Main Content */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:px-2 focus:py-1 focus:bg-amber-400 focus:text-slate-900 focus:rounded font-bold"
          >
            {t('skipToMain')}
          </a>

          {/* Official Media Portals */}
          <div className="flex items-center space-x-3 text-amber-200 shrink-0">
            <a
              href={CONTACT_CONFIG.SOCIAL_LINKS.PORTAL}
              target="_blank"
              rel="noreferrer"
              title="Official MSRTC Portal"
              className="hover:text-white flex items-center space-x-1 font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs">Portal</span>
            </a>

            <a
              href={CONTACT_CONFIG.SOCIAL_LINKS.BROADCAST}
              target="_blank"
              rel="noreferrer"
              title="Ministry of Information & Broadcasting"
              className="hover:text-white flex items-center space-x-1 font-bold"
            >
              <Radio className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs">Broadcast</span>
            </a>

            <a
              href={CONTACT_CONFIG.SOCIAL_LINKS.MEDIA}
              target="_blank"
              rel="noreferrer"
              title="Official Media Stream"
              className="hover:text-white flex items-center space-x-1 font-bold"
            >
              <Tv className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs">Media</span>
            </a>
          </div>

          <span className="text-[#E87A50] shrink-0 font-light">|</span>

          {/* Text Resize Controls (A- / A / A+) */}
          <div className="flex items-center space-x-1 font-bold text-xs shrink-0">
            <span className="text-amber-100 text-xs mr-1 shrink-0">{t('textResize')}</span>
            <button
              type="button"
              onClick={handleFontDecrease}
              className="px-2 py-0.5 rounded hover:bg-black/20 text-amber-100 hover:text-white transition-colors font-bold text-xs"
              title="Decrease Font Size"
            >
              A−
            </button>
            <button
              type="button"
              onClick={handleFontReset}
              className="px-2 py-0.5 rounded hover:bg-black/20 text-amber-100 hover:text-white transition-colors font-bold text-xs"
              title="Reset Font Size"
            >
              A
            </button>
            <button
              type="button"
              onClick={handleFontIncrease}
              className="px-2 py-0.5 rounded hover:bg-black/20 text-amber-100 hover:text-white transition-colors font-bold text-xs"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicUtilityBar;
