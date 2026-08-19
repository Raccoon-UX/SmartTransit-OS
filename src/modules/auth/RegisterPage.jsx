import React, { useState } from 'react';
import { Activity, Lock, Mail, User, Phone, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextInput as Input } from '../../components/ui/Input.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { PasswordStrength } from '../../components/auth/PasswordStrength.jsx';
import { GoogleAuthButton } from '../../components/auth/GoogleAuthButton.jsx';
import { cn } from '../../utils/index.js';
import publicBusBg from '../../assets/PublicBus.webp';

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
      const newUser = await register({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });
      if (onRegisterSuccess) {
        onRegisterSuccess(newUser);
      }
    } catch (err) {
      setLocalError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen w-full text-slate-900 dark:text-white flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background Image PublicBus.webp */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${publicBusBg})` }}
      >
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 max-w-xl mx-auto w-full mb-4 flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-3 rounded-lg border border-slate-700/60 text-white">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portal</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 font-bold">
          <span>Registration Protocol</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-xl mx-auto w-full bg-white dark:bg-navy-900 rounded-xl border border-slate-300 dark:border-navy-700 shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
            Create Authorized Commuter Profile
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Register for a single sign-on citizen mobility account.
          </p>
        </div>

        {(localError || authError) && (
          <Alert
            severity="critical"
            title="Registration Error"
            onClose={() => setLocalError(null)}
          >
            {localError || authError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Legal Name"
            type="text"
            placeholder="First and Last Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={User}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="commuter@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={Mail}
              required
            />
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={Phone}
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Account Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={Lock}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />
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

          <div className="flex items-start space-x-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400">
              I accept the SmartTransit OS Terms of Service and Privacy Policy.
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            className="font-bold py-2.5"
          >
            Complete Registration
          </Button>

          {/* Visual OR Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
            <span className="bg-white dark:bg-navy-900 px-3 text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0">
              OR
            </span>
            <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
          </div>

          {/* Google Sign-Up Button */}
          <GoogleAuthButton
            text="signup_with"
            onSuccess={(user) => {
              if (onRegisterSuccess) onRegisterSuccess(user);
            }}
            onError={(err) => {
              setLocalError(err.message || 'Google registration was canceled or failed.');
            }}
          />
        </form>

        <div className="text-center text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-navy-800 pt-4">
          Already have an authorized profile?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="text-sky-600 dark:text-sky-400 font-semibold hover:underline"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
