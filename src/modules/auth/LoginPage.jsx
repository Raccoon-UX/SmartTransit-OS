import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, ArrowRight, Eye, EyeOff, Info, ShieldCheck, Activity, Layers, Users, CheckCircle2 } from 'lucide-react';
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
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* Cinematic Full-Screen Transit Background with Deep Navy Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${publicBusBg})` }}
      >
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-[#07132b]/90 to-slate-950/80" />
        {/* Subtle geometric grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>

      {/* TOP FLOATING NAVIGATION BAR */}
      <header className="relative z-20 w-full border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: SmartTransit Logo + Platform Status */}
        <div className="flex items-center space-x-3.5">
          <img
            src={logoImg}
            alt="SmartTransit OS Logo"
            className="h-8 sm:h-9 w-auto object-contain shrink-0"
          />
          <div className="flex items-center space-x-2.5">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-sans">
              SmartTransit <span className="text-sky-400">OS</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600 text-xs">|</span>
            <span className="hidden sm:inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Government Transit Infrastructure</span>
            </span>
          </div>
        </div>

        {/* Right: Security Protocol Indicator + Return Link */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-xs font-mono">
          <div className="hidden md:flex items-center space-x-2 text-[11px] text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="font-semibold">TLS 1.3</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">SECURE CONNECTION</span>
          </div>

          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span>{t('returnToPublicPortal') || 'Return to Public Portal'}</span>
          </button>
        </div>
      </header>

      {/* MAIN HERO GATEWAY VIEW: 2 DISTINCT VISUAL ZONES */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* ============================================================ */}
          {/* LEFT SIDE (~42%): BRAND & SMART TRANSIT SECURITY EXPERIENCE  */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-[11px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>AUTHORIZATION GATEWAY</span>
            </div>

            {/* Cinematic Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                Secure access to the intelligent transit network.
              </h1>
              <p className="text-sm sm:text-base text-slate-300/80 leading-relaxed max-w-lg">
                Unified identity and role-based access for government transit operations, municipal mobility services and authorized commuters.
              </p>
            </div>

            {/* Security Status Block */}
            <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-4 sm:p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    SYSTEM OPERATIONAL
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">GATEWAY ID: ST-MSRTC-AUTH-01</span>
              </div>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                SECURE AUTHENTICATION CHANNEL • ENCRYPTED SESSION TOKENS • TLS 1.3 ENFORCED
              </p>
            </div>

            {/* Subtle Infrastructure Live Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left space-y-1">
                <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] font-mono font-bold uppercase">
                  <Layers className="w-3 h-3 text-sky-400" />
                  <span>NETWORKS</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-white">24</div>
                <div className="text-[10px] text-slate-400">Active Corridors</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left space-y-1">
                <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] font-mono font-bold uppercase">
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span>ROLES</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-white">04</div>
                <div className="text-[10px] text-slate-400">RBAC Clearance</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left space-y-1">
                <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] font-mono font-bold uppercase">
                  <Activity className="w-3 h-3 text-sky-400" />
                  <span>STATUS</span>
                </div>
                <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 pt-0.5">ACTIVE</div>
                <div className="text-[10px] text-slate-400">High Availability</div>
              </div>
            </div>

            {/* Bottom Government & MSRTC Branding */}
            <div className="pt-2 flex items-center space-x-3.5 opacity-90">
              <img
                src={msrtcLogo1}
                alt="Maharashtra State Road Transport Corporation Official Logo"
                className="h-10 sm:h-12 w-auto max-w-[170px] object-contain shrink-0"
              />
              <div className="border-l border-slate-700/80 pl-3 leading-tight">
                <span className="text-[11px] font-bold text-slate-200 block font-sans">
                  Government Transit Operations
                </span>
                <span className="text-[10px] text-slate-400 block font-sans">
                  Municipal Transport Authority • Maharashtra State
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE (~58%): AUTHENTICATION & QUICK ROLE ACCESS SURFACE */}
          {/* ============================================================ */}
          <div className="lg:col-span-7">
            <div className="w-full rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 xl:p-9 shadow-2xl shadow-slate-950/80 space-y-6 text-left relative overflow-hidden">
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-[#0B3D91] to-sky-500" />

              {/* Authentication Subsystem Masthead */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400">
                    AUTHENTICATION SUBSYSTEM
                  </span>
                  
                  {/* Contextual Amber Sandbox Notice */}
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                    <Info className="w-3 h-3 text-amber-400" />
                    <span>DEMO SANDBOX ACTIVE</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
                  Sign in to SmartTransit OS
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Use your authorized account to access the transit network.
                </p>
              </div>

              {/* Error Alert Display */}
              {(localError || authError) && (
                <Alert
                  severity="critical"
                  title="Authentication Error"
                  onClose={() => setLocalError(null)}
                >
                  {localError || authError}
                </Alert>
              )}

              {/* Standard Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Official Email / Registered Mobile Field */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                    {t('officialEmailLabel') || 'OFFICIAL EMAIL / REGISTERED MOBILE'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="name@smarttransit.city"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className={cn(
                        'w-full text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all duration-150',
                        'bg-slate-950/80 border border-slate-700/90 text-white placeholder:text-slate-500',
                        'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
                      )}
                      required
                    />
                  </div>
                </div>

                {/* Account Password Field */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                    {t('passwordLabel') || 'ACCOUNT PASSWORD'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        'w-full text-sm rounded-xl pl-11 pr-11 py-3.5 transition-all duration-150',
                        'bg-slate-950/80 border border-slate-700/90 text-white placeholder:text-slate-500',
                        'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
                      )}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-200 transition-colors p-1 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Credentials & Forgot Password Controls */}
                <div className="flex items-center justify-between text-xs font-sans pt-0.5">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-[#0B3D91] focus:ring-sky-500 w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-slate-300 font-medium">
                      {t('rememberCredentials') || 'Remember credentials'}
                    </span>
                  </label>
                  {onNavigateForgotPassword && (
                    <button
                      type="button"
                      onClick={onNavigateForgotPassword}
                      className="text-sky-400 hover:text-sky-300 font-semibold hover:underline cursor-pointer"
                    >
                      {t('forgotPassword') || 'Forgot Password?'}
                    </button>
                  )}
                </div>

                {/* Primary Large Sign-In CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'w-full flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl font-sans font-bold text-sm text-white transition-all duration-200 cursor-pointer shadow-lg',
                    'bg-gradient-to-r from-[#0B3D91] via-[#155dfc] to-[#0B3D91] hover:from-[#093278] hover:to-[#093278] border border-sky-400/30',
                    'hover:shadow-sky-500/25 hover:-translate-y-0.5 active:translate-y-0',
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
                  <div className="border-t border-slate-800 w-full" />
                  <span className="bg-slate-900 px-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest shrink-0">
                    OR
                  </span>
                  <div className="border-t border-slate-800 w-full" />
                </div>

                {/* Google Sign-In Gateway Button */}
                <GoogleAuthButton
                  text="continue_with"
                  onSuccess={(user) => {
                    if (onLoginSuccess) onLoginSuccess(user);
                  }}
                  onError={(err) => {
                    setLocalError(err.message || 'Google sign-in was canceled or failed.');
                  }}
                />

                {/* Create Commuter Account Link */}
                {onNavigateRegister && (
                  <div className="text-center text-xs text-slate-400 pt-1">
                    New to SmartTransit OS?{' '}
                    <button
                      type="button"
                      onClick={onNavigateRegister}
                      className="text-sky-400 font-bold hover:text-sky-300 hover:underline cursor-pointer ml-1 inline-flex items-center space-x-1"
                    >
                      <span>Create commuter account</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </form>

              {/* QUICK ROLE ACCESS (SANDBOX AUTHORIZATION 2x2 GRID) */}
              <div className="pt-5 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      SANDBOX AUTHORIZATION
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                      Quick Role Access
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    4 Demo Profiles
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Use a pre-configured role to instantly explore the SmartTransit OS experience:
                </p>

                {/* 2 x 2 Grid Component */}
                <DemoLoginPills onSelectRole={handleDemoSelect} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SLIM FOOTER BAR */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/80 px-4 sm:px-8 py-3 text-center text-[11px] font-mono text-slate-400">
        <span>© 2026 SmartTransit OS • Municipal Transport Authority & Maharashtra State Road Transport Corporation. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default LoginPage;


