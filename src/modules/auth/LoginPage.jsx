import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, ArrowRight, Eye, EyeOff, Info, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { DemoLoginPills } from '../../components/auth/DemoLoginPills.jsx';
import { GoogleAuthButton } from '../../components/auth/GoogleAuthButton.jsx';
import { cn } from '../../utils/index.js';
import logoImg from '../../assets/logo.png';
import msrtcLogo1 from '../../assets/msrtc logo1.png';
import publicBusBg from '../../assets/PublicBus.webp';

export function LoginPage({
  onNavigateRegister,
  onNavigateForgotPassword,
  onNavigateHome,
  onLoginSuccess,
}) {
  const { login, demoLogin, isLoading, authError } = useAuth();
  const { t } = usePublicAccessibility();

  const [emailOrPhone, setEmailOrPhone] = useState('admin@smarttransit.city');
  const [password, setPassword] = useState('TransitPass@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!emailOrPhone.trim()) {
      setLocalError('Please enter your official email address or registered mobile number.');
      return;
    }
    if (!password) {
      setLocalError('Please enter your account password.');
      return;
    }

    try {
      const authenticatedUser = await login({ emailOrPhone, password });
      if (onLoginSuccess) {
        onLoginSuccess(authenticatedUser);
      }
    } catch (err) {
      setLocalError(err.message || 'Unable to sign in. Please verify your credentials.');
    }
  };

  const handleDemoSelect = async (roleKey) => {
    try {
      const authenticatedUser = await demoLogin(roleKey);
      if (onLoginSuccess) {
        onLoginSuccess(authenticatedUser);
      }
    } catch (err) {
      setLocalError(err.message || 'Demo login error');
    }
  };

  return (
    <div className="relative min-h-screen w-full text-slate-900 flex flex-col justify-center py-4 sm:py-8 lg:py-10 px-3 sm:px-6 lg:px-8 text-left overflow-x-hidden bg-slate-950 font-sans select-none box-border">
      {/* Background Image (PublicBus.webp) with Dark Contrast Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transition-transform duration-1000 pointer-events-none"
        style={{ backgroundImage: `url(${publicBusBg})` }}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
      </div>

      {/* Foreground Content Container (90-92vw on desktop, 100% on mobile) */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full space-y-3 sm:space-y-3.5 box-border">
        {/* Top Slim Security & Navigation Bar (Responsive Stacking) */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 sm:px-6 py-2.5 rounded-xl border border-slate-700/60 text-white shadow-lg box-border">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-sky-400 hover:text-sky-300 transition-colors duration-150 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5 shrink-0" />
            <span>&larr; {t('returnToPublicPortal') || 'Return to Public Portal'}</span>
          </button>

          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse shrink-0" />
            <span className="tracking-wide">
              {t('officialSecurityProtocol') || 'Official Portal Security Protocol • TLS 1.3'}
            </span>
          </div>
        </div>

        {/* Main Official Government Authentication Container (WHITE) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-950/50 overflow-hidden box-border">
          {/* Top Institutional Accent Line */}
          <div className="h-1 bg-gradient-to-r from-[#0B3D91] via-[#1E40AF] to-[#0B3D91] w-full" />

          {/* Portal Masthead Header (Mobile Responsive Layout) */}
          <div className="p-4 sm:p-6 bg-slate-50/90 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 box-border">
            {/* Left: SmartTransit OS Brand + Masthead Title */}
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 w-full md:w-auto">
              <img
                src={logoImg}
                alt="SmartTransit OS Logo"
                className="h-9 sm:h-12 md:h-13 w-auto max-w-[120px] sm:max-w-[160px] object-contain shrink-0"
              />
              <div className="border-l border-slate-300 pl-3 sm:pl-5 min-w-0 flex-1">
                <h1 className="text-base sm:text-xl md:text-2xl font-extrabold text-slate-900 font-sans tracking-tight leading-tight">
                  {t('authPortalTitle') || 'SmartTransit OS Authorization Portal'}
                </h1>
                <p className="text-[11px] sm:text-sm text-slate-600 font-sans mt-0.5 leading-tight">
                  {t('authPortalSub') || 'Government Transit Operations & Municipal Transport Authority'}
                </p>
              </div>
            </div>

            {/* Right: Authentication Subsystem Text + MSRTC Emblem */}
            <div className="flex items-center justify-between md:justify-end space-x-3.5 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
              <div className="text-left md:text-right shrink-0 leading-tight">
                <span className="block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#0B3D91]">
                  AUTHENTICATION
                </span>
                <span className="block text-xs sm:text-sm font-sans font-extrabold text-slate-800">
                  Subsystem
                </span>
              </div>
              <span className="text-slate-300 text-2xl font-light shrink-0 hidden sm:block">
                |
              </span>
              <img
                src={msrtcLogo1}
                alt="MSRTC Official Emblem"
                className="h-9 sm:h-13 md:h-16 w-auto max-w-[140px] sm:max-w-[200px] object-contain shrink-0"
              />
            </div>
          </div>

          {/* Full-Width Sandbox Disclosure Banner */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-500/10 border-b border-amber-500/20 text-xs font-mono text-amber-900 flex items-center space-x-2.5 box-border break-words">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="leading-snug font-medium">
              {t('demoSandboxNotice') || 'DEMO SANDBOX DISCLOSURE: Pre-configured role profiles provided for evaluation purposes.'}
            </span>
          </div>

          {/* 50 / 50 Equal Visual Weight Two-Column Main Content Grid (Stacks cleanly to 1-column on mobile) */}
          <div className="p-4 sm:p-8 xl:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 xl:gap-10 items-start box-border">
            
            {/* ============================================================ */}
            {/* LEFT COLUMN (~50% Desktop, 100% Mobile): SIGN-IN FORM        */}
            {/* ============================================================ */}
            <div className="space-y-4 sm:space-y-5 w-full min-w-0">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  {t('signInHeadline') || 'Sign In to Authorized Account'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('signInDesc') || 'Enter your official email or registered mobile number to access your portal.'}
                </p>
              </div>

              {(localError || authError) && (
                <Alert
                  severity="critical"
                  title="Authentication Error"
                  onClose={() => setLocalError(null)}
                >
                  {localError || authError}
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 w-full">
                {/* Official Email / Registered Mobile Field */}
                <div className="space-y-1.5 text-left w-full">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                    {t('officialEmailLabel') || 'OFFICIAL EMAIL / REGISTERED MOBILE'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center w-full">
                    <div className="absolute left-3.5 pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="name@smarttransit.city"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className={cn(
                        'w-full h-[50px] sm:h-[54px] text-base rounded-xl pl-11 pr-4 transition-all duration-150 box-border',
                        'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400',
                        'focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] shadow-2xs'
                      )}
                      required
                    />
                  </div>
                </div>

                {/* Account Password Field */}
                <div className="space-y-1.5 text-left w-full">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                    {t('passwordLabel') || 'ACCOUNT PASSWORD'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center w-full">
                    <div className="absolute left-3.5 pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        'w-full h-[50px] sm:h-[54px] text-base rounded-xl pl-11 pr-11 transition-all duration-150 box-border',
                        'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400',
                        'focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] shadow-2xs'
                      )}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors p-2 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Credentials & Forgot Password Controls */}
                <div className="flex items-center justify-between text-xs sm:text-sm font-sans pt-0.5">
                  <label className="flex items-center space-x-2 cursor-pointer select-none py-1">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#0B3D91] focus:ring-[#0B3D91] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-slate-700 font-medium">
                      {t('rememberCredentials') || 'Remember credentials'}
                    </span>
                  </label>
                  {onNavigateForgotPassword && (
                    <button
                      type="button"
                      onClick={onNavigateForgotPassword}
                      className="text-[#0B3D91] hover:text-[#082e6d] font-semibold hover:underline cursor-pointer py-1"
                    >
                      {t('forgotPassword') || 'Forgot Password?'}
                    </button>
                  )}
                </div>

                {/* Primary Large Sign-In CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'w-full h-[50px] sm:h-[54px] min-h-[44px] flex items-center justify-center space-x-2 px-5 rounded-xl font-sans font-bold text-sm sm:text-base text-white transition-all duration-200 cursor-pointer shadow-md box-border',
                    'bg-[#0B3D91] hover:bg-[#082e6d] active:bg-[#06214f] border border-[#07275f]',
                    'hover:shadow-lg hover:shadow-[#0B3D91]/25 hover:-translate-y-0.5 active:translate-y-0',
                    'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0'
                  )}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t('signInBtn') || 'Sign In to Authorized Portal'}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>

                {/* Visual OR Divider */}
                <div className="relative flex items-center justify-center my-3 sm:my-4">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest shrink-0">
                    OR
                  </span>
                  <div className="border-t border-slate-200 w-full" />
                </div>

                {/* Google Sign-In Button */}
                <GoogleAuthButton
                  text="signin_with"
                  onSuccess={(user) => {
                    if (onLoginSuccess) onLoginSuccess(user);
                  }}
                  onError={(err) => {
                    setLocalError(err.message || 'Google sign-in was canceled or failed.');
                  }}
                />

                {onNavigateRegister && (
                  <div className="text-center text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
                    Don't have an official commuter profile?{' '}
                    <button
                      type="button"
                      onClick={onNavigateRegister}
                      className="text-[#0B3D91] font-bold hover:underline cursor-pointer ml-1 inline-flex items-center space-x-1 py-1"
                    >
                      <span>Create Account</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN (~50% Desktop, 100% Mobile): DEMO ROLE PROFILES */}
            {/* ============================================================ */}
            <div className="bg-slate-50/70 p-4 sm:p-6 rounded-2xl border border-slate-200/90 space-y-3.5 sm:space-y-4 w-full min-w-0 box-border">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#0B3D91] shrink-0" />
                  <span className="truncate">{t('selectDemoProfile') || 'SELECT DEMO ROLE PROFILE (INSTANT ACCESS)'}</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 font-bold uppercase shrink-0">
                  ACTIVE
                </span>
              </div>
              <DemoLoginPills onSelectRole={handleDemoSelect} isLoading={isLoading} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;




