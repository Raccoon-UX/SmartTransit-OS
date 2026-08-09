import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowRight, Layout } from 'lucide-react';
import { useTheme } from '../design-system/context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { cn } from '../utils/index.js';
import logoImg from '../assets/logo.png';

export function PublicNavbar({ onOpenDemo, onOpenSignIn, onSwitchToShell }) {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'Live Tracking', href: '#live-tracking' },
    { label: 'Smart Facilities', href: '#smart-facilities' },
    { label: 'Intelligence', href: '#ai-intelligence' },
    { label: 'Technology', href: '#technology' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200 text-left',
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 shadow-subtle border-b border-slate-300 dark:border-slate-800 py-2.5'
          : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3.5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark (Single Horizontal Row, Non-wrapping) */}
        <a href="#" className="flex items-center space-x-2.5 shrink-0 group">
          <img src={logoImg} alt="SmartTransit OS Logo" className="h-9 sm:h-10 w-auto max-w-[130px] object-contain shrink-0" />
          <div className="flex items-center space-x-2 border-l border-slate-300 dark:border-slate-700 pl-3 shrink-0 whitespace-nowrap">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white font-sans shrink-0">
              SmartTransit <span className="text-[#0B3D91] dark:text-sky-400 font-semibold">OS</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shrink-0 whitespace-nowrap">
              GOVT PORTAL
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 font-medium text-xs sm:text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3.5 py-1.5 rounded text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center space-x-3 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none border border-slate-300 dark:border-slate-700"
            aria-label="Toggle Light and Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2 shrink-0">
              <Button
                variant="primary"
                size="sm"
                leftIcon={Layout}
                onClick={onSwitchToShell}
                className="text-xs font-bold"
              >
                Go to Operations Shell ({user.roleTitle})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-xs"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenSignIn}
                className="text-xs font-bold"
              >
                Authorized Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                rightIcon={ArrowRight}
                onClick={onOpenDemo}
                className="text-xs font-bold shadow-subtle"
              >
                Demo Sandbox
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 sm:hidden shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3 text-left">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0B3D91]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            {isAuthenticated ? (
              <Button variant="primary" size="md" fullWidth onClick={onSwitchToShell}>
                Go to Operations Shell
              </Button>
            ) : (
              <>
                <Button variant="primary" size="md" fullWidth onClick={onOpenSignIn}>
                  Authorized Sign In
                </Button>
                <Button variant="outline" size="md" fullWidth onClick={onOpenDemo}>
                  Demo Sandbox
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default PublicNavbar;
