import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en.js';
import { mr } from '../locales/mr.js';

const PublicAccessibilityContext = createContext();

export function PublicAccessibilityProvider({ children }) {
  // Language state ('en' | 'mr')
  const [language, setLanguage] = useState(() => {
    return sessionStorage.getItem('st_language') || 'en';
  });

  // Font Size Scale ('sm' | 'base' | 'lg')
  const [fontScale, setFontScale] = useState(() => {
    return sessionStorage.getItem('st_font_scale') || 'base';
  });

  // High Contrast Mode
  const [highContrast, setHighContrast] = useState(() => {
    return sessionStorage.getItem('st_high_contrast') === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('st_language', language);
  }, [language]);

  useEffect(() => {
    sessionStorage.setItem('st_font_scale', fontScale);
    const root = document.documentElement;
    root.classList.remove('font-scale-sm', 'font-scale-base', 'font-scale-lg');
    root.classList.add(`font-scale-${fontScale}`);
  }, [fontScale]);

  useEffect(() => {
    sessionStorage.setItem('st_high_contrast', highContrast);
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
  }, [highContrast]);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  const handleFontDecrease = () => setFontScale('sm');
  const handleFontReset = () => setFontScale('base');
  const handleFontIncrease = () => setFontScale('lg');

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  // Translation helper getter
  const t = (key) => {
    const dict = language === 'mr' ? mr : en;
    return dict[key] || en[key] || key;
  };

  return (
    <PublicAccessibilityContext.Provider
      value={{
        language,
        toggleLanguage,
        fontScale,
        handleFontDecrease,
        handleFontReset,
        handleFontIncrease,
        highContrast,
        toggleHighContrast,
        t,
      }}
    >
      {children}
    </PublicAccessibilityContext.Provider>
  );
}

export function usePublicAccessibility() {
  const context = useContext(PublicAccessibilityContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      language: 'en',
      toggleLanguage: () => {},
      fontScale: 'base',
      handleFontDecrease: () => {},
      handleFontReset: () => {},
      handleFontIncrease: () => {},
      highContrast: false,
      toggleHighContrast: () => {},
      t: (key) => en[key] || key,
    };
  }
  return context;
}
