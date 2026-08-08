import React, { useState } from 'react';
import { Activity, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft, Bus, User, Terminal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextInput as Input } from '../../components/ui/Input.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { DemoLoginPills } from '../../components/auth/DemoLoginPills.jsx';
import { cn } from '../../utils/index.js';

export function LoginPage({
  onNavigateRegister,
  onNavigateForgotPassword,
  onNavigateHome,
  onLoginSuccess,
}) {
  const { login, demoLogin, isLoading, authError } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState('admin@smarttransit.city');
  const [password, setPassword] = useState('TransitPass@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!emailOrPhone.trim()) {
      setLocalError('Please enter your email address or mobile number.');
      return;
    }
    if (!password) {
      setLocalError('Please enter your password.');
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
    <div className="min-h-screen w-full bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Bar with Back to Landing */}
      <div className="max-w-6xl mx-auto w-full mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Website</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
          <span>Security Protocol v1.0 • TLS 1.3</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Col: Credentials Form (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl text-left space-y-6">
          {/* Header & Wordmark */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-transit-500 to-transit-700 flex items-center justify-center text-white shadow-glow-sm">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-sans">
                SmartTransit <span className="text-transit-500">OS</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight pt-2">
              Sign In to Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Access real-time bus tracking, driver trip telemetry, municipal dispatch, or the SOC operations wall.
            </p>
          </div>

          {/* Error Banner */}
          {(localError || authError) && (
            <Alert variant="danger" title="Authentication Error">
              {localError || authError}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address or Mobile Number"
              type="text"
              placeholder="e.g. admin@smarttransit.city"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              leftIcon={Mail}
              autoComplete="username"
              required
            />

            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={onNavigateForgotPassword}
                  className="text-xs text-transit-500 hover:text-transit-600 font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={cn(
                    'w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2',
                    'bg-white dark:bg-navy-950 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 focus:ring-transit-500'
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-transit-500 focus:ring-transit-500"
                />
                <span>Remember this workstation</span>
              </label>

              <span className="font-mono text-[10px] text-slate-400">Protected by RBAC Gate</span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={ArrowRight}
              className="mt-2 shadow-glow"
            >
              Sign In to SmartTransit
            </Button>
          </form>

          {/* Demo Account Access Selector */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <DemoLoginPills onSelectDemo={handleDemoSelect} isLoading={isLoading} />
          </div>

          {/* Register Prompt */}
          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            New commuter in the city?{' '}
            <button
              type="button"
              onClick={onNavigateRegister}
              className="text-transit-500 hover:text-transit-600 font-bold ml-1"
            >
              Create a Passenger Account
            </button>
          </div>
        </div>

        {/* Right Col: Smart City Visual & Security Banner (5 cols on desktop) */}
        <div className="hidden lg:flex lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 p-8 text-left flex-col justify-between text-white relative overflow-hidden shadow-xl">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-transit-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-transit-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Trust Access Layer</span>
            </div>

            <h3 className="text-2xl font-bold font-sans leading-snug">
              Unified Authentication Across 4 Transit Roles.
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Granular role-based authorization dynamically routes passengers to live route maps, drivers to vehicle cockpits, authorities to municipal dispatch, and IT engineers to the SOC.
            </p>
          </div>

          {/* Security Features List */}
          <div className="space-y-3 pt-6 border-t border-slate-800 relative z-10 text-xs font-mono text-slate-300">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span>Telemetry Ingestion</span>
              <span className="text-emerald-400 font-bold">Encrypted WSS</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span>Session Persistence</span>
              <span className="text-transit-400 font-bold">24-Hour Auth Token</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span>Authorization Gate</span>
              <span className="text-amber-400 font-bold">RBAC Matrix Enforced</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono pt-4 relative z-10">
            © 2026 SmartTransit OS • Prototype Environment
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
