import React from 'react';
import { PhoneCall, Eye, Globe, Radio, Tv } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { CONTACT_CONFIG } from '../../config/contact.js';
import { cn } from '../../utils/index.js';

export function PublicUtilityBar() {
  const {
    language,
    toggleLanguage,
    handleFontDecrease,
    handleFontReset,
    handleFontIncrease,
    highContrast,
    toggleHighContrast,
    t,
  } = usePublicAccessibility();

  return (
    <div className="bg-[#B83E12] text-white text-xs font-mono border-b border-[#9E2F0A] py-1.5 px-4 sm:px-6 select-none leading-none overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex flex-nowrap items-center justify-between gap-4 whitespace-nowrap min-w-max">
        {/* Left Side: Welcome & Helplines (Single Horizontal Line, Perfect Equal Alignment) */}
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

        {/* Right Side: Language, Text Resize, High Contrast, Socials (Single Horizontal Line, Equal Alignment) */}
        <div className="flex flex-nowrap items-center space-x-3 sm:space-x-4 ml-auto text-xs leading-none shrink-0">
          {/* Skip to Main Content */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:px-2 focus:py-1 focus:bg-amber-400 focus:text-slate-900 focus:rounded font-bold"
          >
            {t('skipToMain')}
          </a>

          {/* Official Media Portals */}
          <div className="hidden xl:flex items-center space-x-3 text-amber-200 shrink-0">
            <a href={CONTACT_CONFIG.SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noreferrer" title="Official Portal" className="hover:text-white flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-xs">Portal</span>
            </a>
            <a href={CONTACT_CONFIG.SOCIAL_LINKS.TWITTER} target="_blank" rel="noreferrer" title="Public Broadcast" className="hover:text-white flex items-center space-x-1">
              <Radio className="w-3.5 h-3.5" />
              <span className="text-xs">Broadcast</span>
            </a>
            <a href={CONTACT_CONFIG.SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noreferrer" title="Media & TV" className="hover:text-white flex items-center space-x-1">
              <Tv className="w-3.5 h-3.5" />
              <span className="text-xs">Media</span>
            </a>
          </div>

          <span className="hidden xl:inline text-[#E87A50] shrink-0 font-light">|</span>

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

          <span className="text-[#E87A50] shrink-0 font-light">|</span>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={toggleHighContrast}
            className={cn(
              'px-2 py-1 rounded border text-xs font-bold transition-colors flex items-center space-x-1 shrink-0 leading-none',
              highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'border-amber-300/40 text-amber-100 hover:bg-white/10'
            )}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3.5 h-3.5 inline" />
            <span>{t('highContrast')}</span>
          </button>

          <span className="text-[#E87A50] shrink-0 font-light">|</span>

          {/* Language Switcher (English | मराठी) */}
          <div className="flex items-center space-x-1 font-bold text-xs shrink-0">
            <button
              type="button"
              onClick={() => toggleLanguage('en')}
              className={cn(
                'px-2 py-1 rounded text-xs transition-colors leading-none',
                language === 'en' ? 'bg-white text-[#B83E12] font-black' : 'text-amber-100 hover:text-white'
              )}
            >
              English
            </button>
            <span className="text-[#E87A50] shrink-0">|</span>
            <button
              type="button"
              onClick={() => toggleLanguage('mr')}
              className={cn(
                'px-2 py-1 rounded text-xs transition-colors font-sans leading-none',
                language === 'mr' ? 'bg-white text-[#B83E12] font-black' : 'text-amber-100 hover:text-white'
              )}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicUtilityBar;
