import React, { useState, useEffect } from 'react';
import { PublicUtilityBar } from './PublicUtilityBar.jsx';
import { PublicBrandHeader } from './PublicBrandHeader.jsx';
import { PublicMainNavigation } from './PublicMainNavigation.jsx';
import { ImportantTicker } from './ImportantTicker.jsx';
import { PublicInfoModal } from './PublicInfoModal.jsx';
import { cn } from '../../utils/index.js';

export function PublicHeader({ onOpenDemo, onOpenSignIn, onSwitchToShell }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenInfoModal = (type) => {
    setInfoModalType(type);
    setInfoModalOpen(true);
  };

  return (
    <>
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

        {/* Level 2: Brand & Identity Header (Collapses smoothly on scroll down) */}
        <div
          className={cn(
            'transition-all duration-300 overflow-hidden',
            isScrolled ? 'max-h-0 opacity-0 py-0 border-none pointer-events-none' : 'max-h-48 opacity-100'
          )}
        >
          <PublicBrandHeader />
        </div>

        {/* Level 3: Main Navigation (Remains Sticky & Docked at Top while scrolling) */}
        <PublicMainNavigation
          onOpenDemo={onOpenDemo}
          onOpenSignIn={onOpenSignIn}
          onSwitchToShell={onSwitchToShell}
          onOpenInfoModal={handleOpenInfoModal}
        />

        {/* Information Marquee Ticker */}
        <ImportantTicker />
      </header>

      {/* Public Awareness Information Modal */}
      <PublicInfoModal
        isOpen={infoModalOpen}
        type={infoModalType}
        onClose={() => setInfoModalOpen(false)}
      />
    </>
  );
}

export default PublicHeader;
