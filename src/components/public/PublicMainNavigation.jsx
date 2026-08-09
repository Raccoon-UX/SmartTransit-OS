import React, { useState } from 'react';
import { ChevronDown, Layout, ArrowRight, Menu, X } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { cn } from '../../utils/index.js';

export function PublicMainNavigation({ onOpenDemo, onOpenSignIn, onSwitchToShell, onOpenInfoModal }) {
  const { t } = usePublicAccessibility();
  const { user, isAuthenticated, logout } = useAuth();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navStructure = [
    { id: 'home', label: t('navHome'), type: null, href: '#' },
    {
      id: 'about',
      label: t('navAbout'),
      type: 'about',
      href: '#about',
      children: [
        { label: t('navAboutOverview'), type: 'about' },
        { label: t('navAboutVision'), type: 'about' },
        { label: t('navAboutHowItWorks'), type: 'about' },
        { label: t('navAboutBenefits'), type: 'about' },
      ],
    },
    {
      id: 'rti',
      label: t('navRti'),
      type: 'rti',
      href: '#rti',
      children: [
        { label: t('navRtiWhatIs'), type: 'rti' },
        { label: t('navRtiRights'), type: 'rti' },
        { label: t('navRtiOfficer'), type: 'rti' },
        { label: t('navRtiResources'), type: 'rti' },
      ],
    },
    {
      id: 'acts',
      label: t('navActsRules'),
      type: 'acts',
      href: '#acts',
      children: [
        { label: t('navActsMvAct'), type: 'acts' },
        { label: t('navActsRulesSub'), type: 'acts' },
        { label: t('navActsSafety'), type: 'acts' },
        { label: t('navActsAdvisories'), type: 'acts' },
      ],
    },
    { id: 'tenders', label: t('navTenders'), type: 'tenders', href: '#tenders' },
    { id: 'feedback', label: t('navFeedback'), type: 'feedback', href: '#feedback' },
    { id: 'faqs', label: t('navFaqs'), type: 'faqs', href: '#faqs' },
    { id: 'recruitment', label: t('navRecruitment'), type: 'recruitment', href: '#recruitment' },
    { id: 'contact', label: t('navContact'), type: 'contact', href: '#contact' },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileNavOpen(false);
    setActiveDropdown(null);

    if (item.type && onOpenInfoModal) {
      onOpenInfoModal(item.type);
    } else if (item.href && item.href.startsWith('#')) {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-[#14233B] text-white text-xs font-mono border-b border-[#0F172A] shadow-md select-none relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Desktop Main Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 font-bold">
          {navStructure.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = activeDropdown === item.id;

            return (
              <div
                key={item.id}
                className="relative py-3"
                onMouseEnter={() => hasChildren && setActiveDropdown(item.id)}
                onMouseLeave={() => hasChildren && setActiveDropdown(null)}
              >
                <a
                  href={item.href || '#'}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    'px-3 py-1.5 inline-flex items-center space-x-1 transition-colors uppercase tracking-wider text-[11px]',
                    item.id === 'home'
                      ? 'bg-[#B83E12] text-white font-extrabold border-b-2 border-amber-400'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span>{item.label}</span>
                  {hasChildren && <ChevronDown className="w-3 h-3 text-amber-300" />}
                </a>

                {/* Dropdown Menu (Clean White Traditional Menu) */}
                {hasChildren && isOpen && (
                  <div className="absolute top-full left-0 w-60 bg-white text-slate-900 shadow-xl border border-slate-300 rounded-b py-1 z-50 animate-in fade-in duration-150">
                    {item.children.map((child, idx) => (
                      <a
                        key={idx}
                        href="#"
                        onClick={(e) => handleNavClick(e, child)}
                        className="block px-4 py-2 text-xs font-sans text-slate-700 hover:bg-slate-100 hover:text-[#B83E12] font-semibold border-b border-slate-100 last:border-0"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Actions: Auth / Demo Buttons */}
        <div className="hidden sm:flex items-center space-x-3 py-2">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onSwitchToShell}
                className="px-3 py-1.5 rounded bg-[#B83E12] hover:bg-[#A0350E] text-white font-bold font-mono text-xs border border-amber-400 inline-flex items-center space-x-1.5"
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Operations Shell ({user.roleTitle})</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onOpenSignIn}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-600"
              >
                Authorized Sign In
              </button>
              <button
                type="button"
                onClick={onOpenDemo}
                className="px-3 py-1.5 rounded bg-[#B83E12] hover:bg-[#A0350E] text-white font-bold text-xs border border-amber-400 inline-flex items-center space-x-1"
              >
                <span>Demo Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center space-x-2 lg:hidden py-2">
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-1.5 rounded bg-slate-800 text-white border border-slate-700"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileNavOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#14233B] px-4 py-4 space-y-2 text-left">
          {navStructure.map((item) => (
            <div key={item.id} className="space-y-1">
              <a
                href={item.href || '#'}
                onClick={(e) => handleNavClick(e, item)}
                className="block py-1.5 text-xs font-bold text-amber-200 uppercase hover:text-white"
              >
                {item.label}
              </a>
              {item.children && (
                <div className="pl-4 space-y-1 border-l border-slate-700">
                  {item.children.map((child, idx) => (
                    <a
                      key={idx}
                      href="#"
                      onClick={(e) => handleNavClick(e, child)}
                      className="block py-1 text-[11px] text-slate-300 hover:text-white"
                    >
                      • {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onSwitchToShell}
                className="w-full py-2 bg-[#B83E12] text-white font-bold text-xs rounded"
              >
                Go to Operations Shell
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onOpenSignIn}
                  className="w-full py-2 bg-slate-800 text-white font-bold text-xs rounded"
                >
                  Authorized Sign In
                </button>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full py-2 bg-[#B83E12] text-white font-bold text-xs rounded"
                >
                  Demo Sandbox
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default PublicMainNavigation;
