import React, { useState } from 'react';
import { Activity, Lock, Mail, User, Phone, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextInput as Input } from '../../components/ui/Input.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { PasswordStrength } from '../../components/auth/PasswordStrength.jsx';
import { cn } from '../../utils/index.js';

export function RegisterPage({ onNavigateLogin, onNavigateHome, onRegisterSuccess }) {
  const { register, isLoading, authError } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!fullName.trim()) {
      setLocalError('Please enter your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setLocalError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setLocalError('Please enter your mobile phone number.');
      return;
    }
    if (password.length < 8) {
      setLocalError('Password must contain at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match. Please verify your entries.');
      return;
    }
    if (!acceptTerms) {
      setLocalError('Please accept the SmartTransit OS Terms of Service.');
      return;
    }

    try {
      const newUser = await register({ fullName, email, phone, password });
      if (onRegisterSuccess) {
        onRegisterSuccess(newUser);
      }
    } catch (err) {
      setLocalError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="max-w-xl mx-auto w-full mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Website</span>
        </button>

        <span className="text-xs font-mono text-transit-500 font-bold">
          Passenger Registration
        </span>
      </div>

      <div className="max-w-xl mx-auto w-full bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl text-left space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-transit-500 to-transit-700 flex items-center justify-center text-white shadow-glow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-sans">
              SmartTransit <span className="text-transit-500">OS</span>
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight pt-2">
            Create a Passenger Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign up to track live city buses, save favorite routes, plan multi-hop journeys, and receive delay alerts.
          </p>
        </div>

        {/* Security / Role Notice */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-slate-900 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Role-Based Access Notice</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Public registration creates a <strong>Passenger</strong> profile. Driver and Administrator accounts are provisioned directly by the Municipal Transport Authority.
          </p>
        </div>

        {/* Error Banner */}
        {(localError || authError) && (
          <Alert variant="danger" title="Registration Error">
            {localError || authError}
          </Alert>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Legal Name"
            type="text"
            placeholder="e.g. Aarav Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={User}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="aarav@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={Mail}
              required
            />

            <Input
              label="Mobile Number"
              type="tel"
              placeholder="+91 98200 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={Phone}
              required
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Create Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
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
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Reusable Password Strength Indicator */}
            <PasswordStrength password={password} />
          </div>

          <Input
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={Lock}
            required
          />

          {/* Terms Acceptance */}
          <div className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 rounded text-transit-500 focus:ring-transit-500"
            />
            <label htmlFor="terms" className="cursor-pointer leading-relaxed">
              I agree to the SmartTransit OS{' '}
              <a href="#" className="text-transit-500 underline font-semibold">
                Terms of Service
              </a>{' '}
              and Privacy Policy for smart urban mobility.
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={ArrowRight}
            className="mt-4 shadow-glow"
          >
            Create Passenger Account
          </Button>
        </form>

        {/* Existing User Login Link */}
        <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="text-transit-500 hover:text-transit-600 font-bold ml-1"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
