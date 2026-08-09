import React, { useState } from 'react';
import { AlertCircle, Volume2, Pause, Play } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { cn } from '../../utils/index.js';

export function ImportantTicker() {
  const { t } = usePublicAccessibility();
  const [isPaused, setIsPaused] = useState(false);

  const messages = [
    t('tickerMsg1'),
    t('tickerMsg2'),
    t('tickerMsg3'),
    t('tickerMsg4'),
    t('tickerMsg5'),
  ];

  return (
    <div className="bg-[#7A1C0D] text-white text-xs font-mono border-b border-[#5A1409] flex items-center select-none overflow-hidden relative z-30 shadow-inner">
      {/* Left Badge: IMPORTANT INFORMATION */}
      <div className="bg-[#B83E12] px-3 sm:px-4 py-2 font-black text-[11px] uppercase tracking-wider text-amber-200 flex items-center space-x-1.5 shrink-0 z-10 border-r border-[#9E2F0A]">
        <AlertCircle className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
        <span className="whitespace-nowrap">{t('tickerLabel')}</span>
      </div>

      {/* Marquee Continuous Scrolling Container */}
      <div
        className="flex-1 overflow-hidden relative py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={cn(
            'whitespace-nowrap inline-block animate-marquee',
            isPaused && 'animation-paused'
          )}
        >
          {messages.map((msg, idx) => (
            <span key={idx} className="inline-flex items-center space-x-2 mx-6 text-slate-100 text-[11px]">
              <span className="text-amber-400 font-bold">●</span>
              <span>{msg}</span>
            </span>
          ))}

          {/* Repeat for seamless infinite marquee loop */}
          {messages.map((msg, idx) => (
            <span key={`repeat-${idx}`} className="inline-flex items-center space-x-2 mx-6 text-slate-100 text-[11px]">
              <span className="text-amber-400 font-bold">●</span>
              <span>{msg}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Pause/Play Controls */}
      <button
        type="button"
        onClick={() => setIsPaused(!isPaused)}
        className="px-2 py-2 bg-[#5A1409] hover:bg-[#4A1007] text-amber-200 shrink-0 text-[10px] font-bold border-l border-[#4A1007]"
        title={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
      >
        {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
      </button>
    </div>
  );
}

export default ImportantTicker;
