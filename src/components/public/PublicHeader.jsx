import React, { useState, useEffect } from 'react';
import { PublicUtilityBar } from './PublicUtilityBar.jsx';
import { PublicBrandHeader } from './PublicBrandHeader.jsx';
import { PublicMainNavigation } from './PublicMainNavigation.jsx';
import { ImportantTicker } from './ImportantTicker.jsx';
import { cn } from '../../utils/index.js';

export function PublicHeader({ onOpenDemo, onOpenSignIn, onSwitchToShell }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200 shadow-md font-sans">
      {/* Level 1: Utility Bar (Collapses smoothly on scroll) */}
      <div
        className={cn(
          'transition-all duration-300 overflow-hidden',
          isScrolled ? 'max-h-0 opacity-0 py-0 border-none' : 'max-h-16 opacity-100'
        )}
      >
        <PublicUtilityBar />
      </div>

      {/* Level 2: Brand & Identity Header */}
      <PublicBrandHeader />

      {/* Level 3: Main Navigation */}
      <PublicMainNavigation
        onOpenDemo={onOpenDemo}
        onOpenSignIn={onOpenSignIn}
        onSwitchToShell={onSwitchToShell}
      />

      {/* Information Marquee Ticker */}
      <ImportantTicker />
    </header>
  );
}

export default PublicHeader;
