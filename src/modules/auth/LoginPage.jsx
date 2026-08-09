import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextInput as Input } from '../../components/ui/Input.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { DemoLoginPills } from '../../components/auth/DemoLoginPills.jsx';

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
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 text-left">
      {/* Top Bar Navigation */}
      <div className="max-w-5xl mx-auto w-full mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0B3D91] dark:text-sky-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Portal</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
          <span>Official Portal Security Protocol • TLS 1.3</span>
        </div>
      </div>

      {/* Main Official Government Login Container */}
      <div className="max-w-5xl mx-auto w-full bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-800 shadow-panel overflow-hidden">
        {/* Top 3px Solid Institutional Accent Bar */}
        <div className="h-1.5 bg-[#0B3D91] w-full" />

        {/* Portal Masthead Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-[#0B3D91] flex items-center justify-center text-white font-bold shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white font-sans">
                SmartTransit OS Authorization Portal
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                Government Transit Operations & Municipal Transport Authority
              </p>
            </div>
          </div>
          <div className="hidden sm:block text-right text-xs font-mono text-slate-500">
            <span>Authentication Subsystem</span>
          </div>
        </div>

        {/* Sandbox / Demo Notice Banner */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center space-x-2.5 font-mono">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>DEMO SANDBOX DISCLOSURE:</strong> This environment provides pre-configured role profiles (Commuter, Driver, Administrator, SOC Analyst, AI Engineer) for evaluation purposes.
          </span>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                Sign In to Authorized Account
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Enter your official email or registered mobile number to access your portal.
              </p>
            </div>

            {(localError || authError) && (
              <Alert
                type="critical"
                title="Authentication Error"
                message={localError || authError}
                onClose={() => setLocalError(null)}
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Official Email / Registered Mobile"
                type="text"
                placeholder="name@smarttransit.city"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                leftIcon={Mail}
                required
              />

              <Input
                label="Account Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={Lock}
                required
              />

              <div className="flex items-center justify-between text-xs font-sans">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#0B3D91] focus:ring-[#0B3D91]"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Remember credentials on this terminal</span>
                </label>
                {onNavigateForgotPassword && (
                  <button
                    type="button"
                    onClick={onNavigateForgotPassword}
                    className="text-[#0B3D91] dark:text-sky-400 hover:underline font-semibold"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                className="font-bold py-2.5"
              >
                Sign In to Authorized Portal
              </Button>
            </form>
          </div>

          {/* Right Column: Structured Sandbox Role Profiles List */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/50 p-5 rounded border border-slate-300 dark:border-slate-700 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono border-b border-slate-300 dark:border-slate-700 pb-2">
              Select Demo Role Profile (Instant Access)
            </h3>
            <DemoLoginPills onSelectRole={handleDemoSelect} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
