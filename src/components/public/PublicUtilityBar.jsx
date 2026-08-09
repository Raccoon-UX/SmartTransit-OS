import React from 'react';
import { PhoneCall, Eye, Globe, Share2, Radio, Tv } from 'lucide-react';
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
    <div className="bg-[#B83E12] text-white text-[11px] font-mono border-b border-[#9E2F0A] py-1 px-4 sm:px-6 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left Side: Welcome & Helplines */}
        <div className="flex flex-wrap items-center space-x-3 sm:space-x-4">
          <span className="hidden md:inline font-bold text-amber-200">
            {t('welcomeText')}
          </span>
          <span className="hidden md:inline text-[#E87A50]">|</span>

          {/* Helpline 1: Public */}
          <div className="flex items-center space-x-1 text-white">
            <PhoneCall className="w-3 h-3 text-amber-300 shrink-0" />
            <span className="text-[10px] text-amber-100 hidden sm:inline">{t('publicHelplineLabel')}</span>
            <strong className="font-bold tracking-wider">{CONTACT_CONFIG.PUBLIC_HELPLINE}</strong>
          </div>

          <span className="text-[#E87A50] hidden sm:inline">|</span>

          {/* Helpline 2: Student */}
          <div className="hidden lg:flex items-center space-x-1 text-white">
            <span className="text-[10px] text-amber-100">{t('studentHelplineLabel')}</span>
            <strong className="font-bold tracking-wider">{CONTACT_CONFIG.STUDENT_HELPLINE}</strong>
          </div>
        </div>

        {/* Right Side: Language, Text Resize, High Contrast, Socials */}
        <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
          {/* Skip to Main Content */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:px-2 focus:py-0.5 focus:bg-amber-400 focus:text-slate-900 focus:rounded font-bold"
          >
            {t('skipToMain')}
          </a>

          {/* Social Icons */}
          <div className="hidden xl:flex items-center space-x-2.5 text-amber-200">
            <a href={CONTACT_CONFIG.SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noreferrer" title="Official Portal" className="hover:text-white flex items-center space-x-0.5">
              <Globe className="w-3 h-3" />
              <span className="text-[10px]">Portal</span>
            </a>
            <a href={CONTACT_CONFIG.SOCIAL_LINKS.TWITTER} target="_blank" rel="noreferrer" title="Public Broadcast" className="hover:text-white flex items-center space-x-0.5">
              <Radio className="w-3 h-3" />
              <span className="text-[10px]">Broadcast</span>
            </a>
            <a href={CONTACT_CONFIG.SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noreferrer" title="Media & TV" className="hover:text-white flex items-center space-x-0.5">
              <Tv className="w-3 h-3" />
              <span className="text-[10px]">Media</span>
            </a>
          </div>

          <span className="hidden xl:inline text-[#E87A50]">|</span>

          {/* Text Resize Controls (A- / A / A+) */}
          <div className="flex items-center space-x-1 font-bold">
            <span className="text-[10px] text-amber-100 hidden sm:inline mr-1">{t('textResize')}</span>
            <button
              type="button"
              onClick={handleFontDecrease}
              className="px-1.5 py-0.2 rounded hover:bg-black/20 text-amber-100 hover:text-white transition-colors"
              title="Decrease Font Size"
            >
              A−
            </button>
            <button
              type="button"
              onClick={handleFontReset}
              className="px-1.5 py-0.2 rounded hover:bg-black/20 text-amber-100 hover:text-white transition-colors"
              title="Reset Font Size"
            >
              A
            </button>
            <button
              type="button"
              onClick={handleFontIncrease}
              className="px-1.5 py-0.2 rounded hover:bg-black/20 text-amber-100 hover:text-white transition-colors"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <span className="text-[#E87A50]">|</span>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={toggleHighContrast}
            className={cn(
              'px-1.5 py-0.5 rounded border text-[10px] font-bold transition-colors flex items-center space-x-1',
              highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'border-amber-300/40 text-amber-100 hover:bg-white/10'
            )}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3 h-3 inline" />
            <span className="hidden sm:inline">{t('highContrast')}</span>
          </button>

          <span className="text-[#E87A50]">|</span>

          {/* Language Switcher (English | मराठी) */}
          <div className="flex items-center space-x-1 font-bold">
            <button
              type="button"
              onClick={() => toggleLanguage('en')}
              className={cn(
                'px-1.5 py-0.5 rounded text-[11px] transition-colors',
                language === 'en' ? 'bg-white text-[#B83E12] font-black' : 'text-amber-100 hover:text-white'
              )}
            >
              English
            </button>
            <span className="text-[#E87A50]">|</span>
            <button
              type="button"
              onClick={() => toggleLanguage('mr')}
              className={cn(
                'px-1.5 py-0.5 rounded text-[11px] transition-colors font-sans',
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
