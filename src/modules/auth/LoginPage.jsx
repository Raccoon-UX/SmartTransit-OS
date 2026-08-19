import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Info,
  ShieldCheck,
  Shield,
  Activity,
  Radio,
  Server,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
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
    <div className="relative min-h-screen w-full text-slate-900 dark:text-white flex flex-col justify-between bg-slate-950 font-sans overflow-x-hidden">
      {/* Full-Screen Background Image with Cinematic Deep Navy Overlay & Ambient Vignette */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${publicBusBg})` }}
      >
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-slate-950/80 pointer-events-none" />
      </div>

      {/* Floating Top Navigation Bar */}
      <header className="relative z-20 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand Identity & Infrastructure Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <img
            src={logoImg}
            alt="SmartTransit OS Logo"
            className="h-8 sm:h-9 w-auto object-contain shrink-0"
          />
          <div className="flex items-center space-x-2.5">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-sans">
              SmartTransit <span className="text-sky-400">OS</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
              Government Transit Infrastructure
            </span>
          </div>
        </div>

        {/* Right: Security Telemetry & Return Link */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="font-bold text-slate-200">TLS 1.3</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">SECURE CONNECTION</span>
          </div>

          <span className="hidden md:inline-block text-slate-700">|</span>

          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-sky-400 hover:text-sky-300 transition-colors duration-150 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span>{t('returnToPublicPortal') || 'Return to Public Portal'}</span>
          </button>
        </div>
      </header>

      {/* Main Full-Screen Split Experience Container */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT SIDE ≈ 42% (lg:col-span-5) — BRAND / SECURITY EXPERIENCE             */}
        {/* ========================================================================= */}
        <section className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 sm:p-8 xl:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section 1: Official Eyebrow & Main Narrative */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-400 block">
                SMARTTRANSIT OS
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                AUTHORIZATION GATEWAY
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl xl:text-[38px] font-black text-white tracking-tight leading-[1.15]">
              Secure access to the intelligent transit network.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-normal">
              Unified identity and role-based access for government transit operations, municipal mobility services and authorized commuters.
            </p>
          </div>

          {/* Section 2: Security Status Channel */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 font-mono">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-emerald-400">SYSTEM OPERATIONAL</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">TLS 1.3 ENCRYPTED</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>SECURE AUTHENTICATION CHANNEL</span>
              <span className="text-slate-500 font-bold">SHA-256 / AES</span>
            </div>
          </div>

          {/* Section 3: Three Subtle Infrastructure Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-left">
              <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">
                ACTIVE NETWORKS
              </span>
              <strong className="text-lg font-bold text-white font-mono mt-0.5 block">24</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-left">
              <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">
                AUTHORIZED ROLES
              </span>
              <strong className="text-lg font-bold text-white font-mono mt-0.5 block">04</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-left">
              <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">
                SYSTEM STATUS
              </span>
              <strong className="text-xs font-bold text-emerald-400 font-mono mt-1.5 block uppercase tracking-wider">
                OPERATIONAL
              </strong>
            </div>
          </div>

          {/* Section 4: Government Transport Authority Seal & Emblem */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-200 block font-sans">
                Government Transit Operations
              </span>
              <span className="text-[11px] text-slate-400 block font-sans">
                Municipal Transport Authority
              </span>
            </div>
            <img
              src={msrtcLogo1}
              alt="MSRTC Official Emblem"
              className="h-10 sm:h-12 w-auto max-w-[140px] object-contain shrink-0 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* RIGHT SIDE ≈ 58% (lg:col-span-7) — AUTHENTICATION EXPERIENCE              */}
        {/* ========================================================================= */}
        <section className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 xl:p-10 space-y-6 relative">
          {/* Top Subtle 3px Institutional Accent Line */}
          <div className="h-1 bg-gradient-to-r from-[#0B3D91] via-sky-500 to-[#0B3D91] w-full rounded-t-3xl absolute top-0 left-0 right-0" />

          {/* Authentication Gateway Header */}
          <div className="space-y-1.5 text-left pt-1">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#0B3D91] dark:text-sky-400 block">
              AUTHENTICATION SUBSYSTEM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              Sign in to SmartTransit OS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
              Use your authorized account to access the transit network.
            </p>
          </div>

          {/* Contextual Sandbox Notice (Small Clean Badge) */}
          <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 text-xs font-mono text-amber-900 dark:text-amber-300 flex items-center space-x-2.5 text-left">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="leading-snug">
              <strong>DEMO SANDBOX:</strong> Pre-configured role profiles available for evaluation.
            </span>
          </div>

          {/* Error Banner */}
          {(localError || authError) && (
            <Alert
              severity="critical"
              title="Authentication Error"
              onClose={() => setLocalError(null)}
            >
              {localError || authError}
            </Alert>
          )}

          {/* Sign-In Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Input 1: Official Email / Mobile */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t('officialEmailLabel') || 'OFFICIAL EMAIL / REGISTERED MOBILE'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="name@smarttransit.city"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  className="w-full h-12 sm:h-13 pl-11 pr-4 rounded-xl text-sm transition-all bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] dark:focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Input 2: Account Password */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t('passwordLabel') || 'ACCOUNT PASSWORD'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 sm:h-13 pl-11 pr-11 rounded-xl text-sm transition-all bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] dark:focus:ring-sky-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs font-sans pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#0B3D91] focus:ring-[#0B3D91] w-4 h-4 cursor-pointer"
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

            {/* Primary Sign-In CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full h-12 sm:h-13 flex items-center justify-center space-x-2 px-6 rounded-xl font-sans font-bold text-sm text-white transition-all duration-200 cursor-pointer shadow-md',
                'bg-gradient-to-r from-[#0B3D91] to-[#1E40AF] hover:from-[#093278] hover:to-[#1a3899] active:from-[#07275f] active:to-[#142d7a]',
                'border border-[#07275f]',
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
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">
                OR
              </span>
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            </div>

            {/* Google Authentication Button */}
            <GoogleAuthButton
              text="continue_with"
              onSuccess={(user) => {
                if (onLoginSuccess) onLoginSuccess(user);
              }}
              onError={(err) => {
                setLocalError(err.message || 'Google authentication was canceled or failed.');
              }}
            />

            {/* Create Account Link */}
            {onNavigateRegister && (
              <div className="text-center text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                New to SmartTransit OS?{' '}
                <button
                  type="button"
                  onClick={onNavigateRegister}
                  className="text-[#0B3D91] dark:text-sky-400 font-bold hover:underline cursor-pointer ml-1 inline-flex items-center space-x-1"
                >
                  <span>Create commuter account &rarr;</span>
                </button>
              </div>
            )}
          </form>

          {/* Quick Role Access Section (2x2 Grid) */}
          <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3.5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-sans">
                    Quick Role Access
                  </h3>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    SANDBOX AUTHORIZATION
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Use a pre-configured role to instantly explore the SmartTransit OS experience.
                </p>
              </div>
            </div>

            {/* 2x2 Grid Component */}
            <DemoLoginPills onSelectRole={handleDemoSelect} isLoading={isLoading} />
          </div>
        </section>
      </main>

      {/* Subtle Footer Strip */}
      <footer className="relative z-20 w-full border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-4 sm:px-8 py-3 text-center text-xs font-mono text-slate-500">
        <span>SmartTransit OS • Municipal Transport Operations Gateway • Official Prototype 2026</span>
      </footer>
    </div>
  );
}

export default LoginPage;


