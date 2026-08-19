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
    <div className="relative min-h-screen w-full bg-[#F4F7FB] text-[#152238] flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* Subtle Light Transit Background Texture (85% White Overlay) */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: `url(${publicBusBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#F4F7FB]/90 via-[#F4F7FB]/95 to-[#F4F7FB] z-0 pointer-events-none" />

      {/* TOP GOVERNMENT HEADER (Clean White) */}
      <header className="relative z-20 w-full bg-white/95 backdrop-blur-md border-b border-[#DCE4EE] shadow-xs px-6 sm:px-10 py-3.5 flex items-center justify-between">
        {/* Left: SmartTransit Logo + Platform Title */}
        <div className="flex items-center space-x-4">
          <img
            src={logoImg}
            alt="SmartTransit OS Logo"
            className="h-9 sm:h-10 w-auto object-contain shrink-0"
          />
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#152238] font-sans">
              SmartTransit <span className="text-[#0B4AA2]">OS</span>
            </span>
            <span className="hidden sm:inline-block text-[#DCE4EE] text-sm">|</span>
            <span className="hidden sm:inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#0B4AA2] border border-[#DCE4EE] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B4AA2]" />
              <span>Government Transit Infrastructure</span>
            </span>
          </div>
        </div>

        {/* Center / Secondary Official Text (Desktop) */}
        <div className="hidden lg:block text-center text-xs font-sans text-[#5B6B82]">
          <span className="font-semibold text-[#152238]">Government Transit Operations</span> & Municipal Transport Authority
        </div>

        {/* Right: Security Protocol & Navigation */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-xs font-mono">
          <div className="hidden md:flex items-center space-x-2 text-[11px] text-[#5B6B82] bg-[#F8FAFC] border border-[#DCE4EE] px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#138A63] shadow-[0_0_6px_rgba(19,138,99,0.5)] animate-pulse" />
            <span className="font-semibold text-[#152238]">TLS 1.3</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#138A63] font-bold uppercase tracking-wider">Secure Connection</span>
          </div>

          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0B4AA2] hover:text-[#083B82] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span>{t('returnToPublicPortal') || 'Return to Public Portal'}</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT: LARGE CENTERED PREMIUM WHITE CONTAINER (1400–1500px, 75–85% viewport) */}
      <main className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl border border-[#DCE4EE] shadow-xl shadow-slate-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Top Institutional Accent Line */}
          <div className="col-span-1 lg:col-span-12 h-1.5 bg-gradient-to-r from-[#0B4AA2] via-[#0EA5C6] to-[#0B4AA2] w-full" />

          {/* ============================================================ */}
          {/* LEFT PANEL (~45%): SMARTTRANSIT INTRODUCTION (LIGHT THEME)   */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EBF3FC] p-8 sm:p-10 xl:p-12 border-b lg:border-b-0 lg:border-r border-[#DCE4EE] flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-[#0B4AA2] font-mono text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B4AA2]" />
                <span>SMART CITY MOBILITY PLATFORM</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl xl:text-[42px] font-extrabold text-[#152238] tracking-tight leading-[1.14]">
                  Secure access to the intelligent transit network.
                </h1>
                <p className="text-sm sm:text-base text-[#5B6B82] leading-relaxed">
                  Unified identity and role-based access for government transit operations, municipal mobility services and authorized commuters.
                </p>
              </div>

              {/* Premium Information Card */}
              <div className="rounded-2xl bg-white border border-[#DCE4EE] p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#138A63] animate-pulse" />
                    <span className="text-xs font-mono font-bold text-[#138A63] uppercase tracking-wider">
                      SYSTEM STATUS: OPERATIONAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#5B6B82]">GATEWAY ID: ST-AUTH-01</span>
                </div>
                <p className="text-xs font-mono text-[#5B6B82] leading-relaxed">
                  Secure Authentication Channel • TLS 1.3 Protocol • RBAC Clearance Active
                </p>
              </div>

              {/* 3 Compact Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#DCE4EE] text-left space-y-1 shadow-2xs">
                  <div className="flex items-center space-x-1.5 text-[#5B6B82] text-[10px] font-mono font-bold uppercase">
                    <Layers className="w-3 h-3 text-[#0B4AA2]" />
                    <span>NETWORKS</span>
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-[#152238]">24</div>
                  <div className="text-[10px] text-[#5B6B82]">Active Networks</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#DCE4EE] text-left space-y-1 shadow-2xs">
                  <div className="flex items-center space-x-1.5 text-[#5B6B82] text-[10px] font-mono font-bold uppercase">
                    <Users className="w-3 h-3 text-[#138A63]" />
                    <span>ROLES</span>
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-[#152238]">04</div>
                  <div className="text-[10px] text-[#5B6B82]">Authorized Roles</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#DCE4EE] text-left space-y-1 shadow-2xs">
                  <div className="flex items-center space-x-1.5 text-[#5B6B82] text-[10px] font-mono font-bold uppercase">
                    <Activity className="w-3 h-3 text-[#0B4AA2]" />
                    <span>UPTIME</span>
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-[#138A63]">99.9%</div>
                  <div className="text-[10px] text-[#5B6B82]">Service Availability</div>
                </div>
              </div>
            </div>

            {/* Bottom Official Government Branding */}
            <div className="pt-4 border-t border-[#DCE4EE] flex items-center space-x-4">
              <img
                src={msrtcLogo1}
                alt="Maharashtra State Road Transport Corporation Official Emblem"
                className="h-12 sm:h-14 w-auto max-w-[170px] object-contain shrink-0"
              />
              <div className="border-l border-[#DCE4EE] pl-4 leading-tight">
                <span className="text-xs font-bold text-[#152238] block font-sans">
                  Government Transit Operations
                </span>
                <span className="text-[11px] text-[#5B6B82] block font-sans mt-0.5">
                  Municipal Transport Authority • Maharashtra State
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT PANEL (~55%): AUTHENTICATION & QUICK ROLE ACCESS       */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 xl:p-12 space-y-8 text-left">
            {/* Header / Subsystem Masthead */}
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0B4AA2]">
                  AUTHENTICATION SUBSYSTEM
                </span>
                
                {/* Soft Amber Sandbox Disclosure Badge */}
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#B86A00] font-mono text-[11px] font-bold">
                  <Info className="w-3.5 h-3.5 text-[#B86A00]" />
                  <span>DEMO SANDBOX</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#152238] font-sans tracking-tight">
                Sign in to SmartTransit OS
              </h2>
              <p className="text-sm sm:text-base text-[#5B6B82]">
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
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#152238]">
                  {t('officialEmailLabel') || 'OFFICIAL EMAIL / REGISTERED MOBILE'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 pointer-events-none text-[#5B6B82]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="name@smarttransit.city"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className={cn(
                      'w-full h-[54px] sm:h-[58px] text-sm sm:text-base rounded-xl pl-12 pr-4 transition-all duration-150',
                      'bg-white border border-[#D8E0EA] text-[#152238] placeholder:text-[#94A3B8]',
                      'focus:outline-none focus:ring-2 focus:ring-[#0B4AA2] focus:border-[#0B4AA2] shadow-2xs'
                    )}
                    required
                  />
                </div>
              </div>

              {/* Account Password Field */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#152238]">
                  {t('passwordLabel') || 'ACCOUNT PASSWORD'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 pointer-events-none text-[#5B6B82]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      'w-full h-[54px] sm:h-[58px] text-sm sm:text-base rounded-xl pl-12 pr-12 transition-all duration-150',
                      'bg-white border border-[#D8E0EA] text-[#152238] placeholder:text-[#94A3B8]',
                      'focus:outline-none focus:ring-2 focus:ring-[#0B4AA2] focus:border-[#0B4AA2] shadow-2xs'
                    )}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-[#5B6B82] hover:text-[#152238] transition-colors p-1 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Credentials & Forgot Password Controls */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-sans pt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#D8E0EA] bg-white text-[#0B4AA2] focus:ring-[#0B4AA2] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[#5B6B82] font-medium">
                    {t('rememberCredentials') || 'Remember credentials'}
                  </span>
                </label>
                {onNavigateForgotPassword && (
                  <button
                    type="button"
                    onClick={onNavigateForgotPassword}
                    className="text-[#0B4AA2] hover:text-[#083B82] font-semibold hover:underline cursor-pointer"
                  >
                    {t('forgotPassword') || 'Forgot Password?'}
                  </button>
                )}
              </div>

              {/* Primary Large Sign-In CTA Button (54-58px) */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'w-full h-[54px] sm:h-[58px] flex items-center justify-center space-x-2 px-6 rounded-xl font-sans font-bold text-base text-white transition-all duration-200 cursor-pointer shadow-md',
                  'bg-[#0B4AA2] hover:bg-[#083B82] active:bg-[#062c63]',
                  'hover:shadow-lg hover:shadow-[#0B4AA2]/20 hover:-translate-y-0.5 active:translate-y-0',
                  'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0'
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{t('signInBtn') || 'SIGN IN TO AUTHORIZED PORTAL'}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              {/* Visual OR Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-[#DCE4EE] w-full" />
                <span className="bg-white px-3 text-[11px] font-mono font-bold text-[#94A3B8] uppercase tracking-widest shrink-0">
                  OR
                </span>
                <div className="border-t border-[#DCE4EE] w-full" />
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

              {/* Create Commuter Account Action Link */}
              {onNavigateRegister && (
                <div className="text-center text-xs sm:text-sm text-[#5B6B82] pt-2">
                  Don't have an authorized commuter profile?{' '}
                  <button
                    type="button"
                    onClick={onNavigateRegister}
                    className="text-[#0B4AA2] font-bold hover:text-[#083B82] hover:underline cursor-pointer ml-1 inline-flex items-center space-x-1"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>

            {/* QUICK ROLE ACCESS SECTION (2x2 Grid of Large 180-220px Cards) */}
            <div className="pt-6 border-t border-[#DCE4EE] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#B86A00] font-bold block">
                    SANDBOX AUTHORIZATION
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#152238] font-sans">
                    Quick Role Access
                  </h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F1F5F9] text-[#5B6B82] border border-[#DCE4EE]">
                  4 Demo Profiles
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5B6B82]">
                Explore the SmartTransit OS using a pre-configured authorization profile:
              </p>

              {/* 2 x 2 Large Grid Component */}
              <DemoLoginPills onSelectRole={handleDemoSelect} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER (Clean Light) */}
      <footer className="relative z-10 w-full border-t border-[#DCE4EE] bg-white px-6 sm:px-10 py-4 text-center text-xs font-mono text-[#5B6B82]">
        <span>© 2026 SmartTransit OS • Municipal Transport Authority & Maharashtra State Road Transport Corporation. Official Government Digital Service.</span>
      </footer>
    </div>
  );
}

export default LoginPage;



