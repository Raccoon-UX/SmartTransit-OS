import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, ArrowRight, Eye, EyeOff, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextInput as Input } from '../../components/ui/Input.jsx';
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
    <div className="relative min-h-screen w-full text-slate-900 dark:text-white flex flex-col justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8 text-left overflow-x-hidden bg-slate-950 font-sans">
      {/* Full-Screen Background Image (PublicBus.webp) with Dark Navy Contrast Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${publicBusBg})` }}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto w-full space-y-3.5">
        {/* Top Slim Security & Navigation Bar */}
        <div className="w-full flex items-center justify-between bg-slate-900/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700/60 text-white shadow-lg">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-sky-400 hover:text-sky-300 transition-colors duration-150 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span>&larr; {t('returnToPublicPortal') || 'Return to Public Portal'}</span>
          </button>

          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="tracking-wide">
              {t('officialSecurityProtocol') || 'Official Portal Security Protocol • TLS 1.3'}
            </span>
          </div>
        </div>

        {/* Main Official Government Authentication Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-950/50 overflow-hidden">
          {/* Top Institutional Accent Line */}
          <div className="h-1 bg-gradient-to-r from-[#0B3D91] via-[#1E40AF] to-[#0B3D91] w-full" />

          {/* Portal Masthead Header */}
          <div className="p-5 sm:p-6 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Left: SmartTransit OS Brand + Masthead Title */}
            <div className="flex items-center space-x-4 shrink-0">
              <img
                src={logoImg}
                alt="SmartTransit OS Logo"
                className="h-11 sm:h-13 w-auto max-w-[160px] object-contain shrink-0"
              />
              <div className="border-l border-slate-300 dark:border-slate-700 pl-4 sm:pl-5 shrink-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight leading-tight">
                  {t('authPortalTitle') || 'SmartTransit OS Authorization Portal'}
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-0.5">
                  {t('authPortalSub') || 'Government Transit Operations & Municipal Transport Authority'}
                </p>
              </div>
            </div>

            {/* Right: Authentication Subsystem Text + MSRTC Emblem */}
            <div className="flex items-center space-x-3.5 shrink-0 self-end md:self-center">
              <div className="text-right shrink-0 leading-tight">
                <span className="block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#0B3D91] dark:text-sky-400">
                  AUTHENTICATION
                </span>
                <span className="block text-xs sm:text-sm font-sans font-extrabold text-slate-800 dark:text-slate-200">
                  Subsystem
                </span>
              </div>
              <span className="text-slate-300 dark:text-slate-700 text-2xl font-light shrink-0 hidden sm:block">
                |
              </span>
              <img
                src={msrtcLogo1}
                alt="MSRTC Official Emblem"
                className="h-12 sm:h-16 w-auto max-w-[200px] object-contain shrink-0"
              />
            </div>
          </div>

          {/* Sandbox Disclosure Banner */}
          <div className="px-5 py-3 bg-amber-500/10 dark:bg-amber-950/30 border-b border-amber-500/20 text-xs font-mono text-amber-900 dark:text-amber-200 flex items-center space-x-2.5">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="leading-snug font-medium">
              {t('demoSandboxNotice') || 'DEMO SANDBOX DISCLOSURE: Pre-configured role profiles provided for evaluation purposes.'}
            </span>
          </div>

          {/* Two-Column Main Content Grid */}
          <div className="p-6 sm:p-8 xl:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
            {/* Left Column: Official Sign-In Card (5/12 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                  {t('signInHeadline') || 'Sign In to Authorized Account'}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={t('officialEmailLabel') || 'OFFICIAL EMAIL / REGISTERED MOBILE'}
                  type="text"
                  placeholder="name@smarttransit.city"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  leftIcon={Mail}
                  required
                />

                <Input
                  label={t('passwordLabel') || 'ACCOUNT PASSWORD'}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={Lock}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  required
                />

                <div className="flex items-center justify-between text-xs font-sans pt-0.5">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#0B3D91] focus:ring-[#0B3D91] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {t('rememberCredentials') || 'Remember credentials'}
                    </span>
                  </label>
                  {onNavigateForgotPassword && (
                    <button
                      type="button"
                      onClick={onNavigateForgotPassword}
                      className="text-[#0B3D91] dark:text-sky-400 hover:text-[#082e6d] dark:hover:text-sky-300 font-semibold hover:underline cursor-pointer"
                    >
                      {t('forgotPassword') || 'Forgot Password?'}
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'w-full flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-sans font-bold text-sm text-white transition-all duration-200 cursor-pointer shadow-md',
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
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Visual OR Divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-slate-200 dark:border-slate-700/80 w-full" />
                  <span className="bg-white dark:bg-slate-900 px-3 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">
                    OR
                  </span>
                  <div className="border-t border-slate-200 dark:border-slate-700/80 w-full" />
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
                  <div className="text-center text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    Don't have an official commuter profile?{' '}
                    <button
                      type="button"
                      onClick={onNavigateRegister}
                      className="text-[#0B3D91] dark:text-sky-400 font-bold hover:underline cursor-pointer ml-1 inline-flex items-center space-x-1"
                    >
                      <span>Create Account</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: Structured Sandbox Role Profiles List (7/12 cols) */}
            <div className="lg:col-span-7 bg-slate-50/70 dark:bg-slate-800/40 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#0B3D91] dark:text-sky-400 shrink-0" />
                  <span>{t('selectDemoProfile') || 'SELECT DEMO ROLE PROFILE (INSTANT ACCESS)'}</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-bold uppercase">
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

