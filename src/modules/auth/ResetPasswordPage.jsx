import React, { useState } from 'react';
import { Activity, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextInput as Input } from '../../components/ui/Input.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { PasswordStrength } from '../../components/auth/PasswordStrength.jsx';
import { cn } from '../../utils/index.js';

export function ResetPasswordPage({ onResetSuccess, onNavigateLogin }) {
  const { resetPassword, isLoading, authError } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (newPassword.length < 8) {
      setLocalError('Password must contain at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match. Please verify your new password.');
      return;
    }

    try {
      await resetPassword({ newPassword });
      setIsSuccess(true);
      setTimeout(() => {
        if (onResetSuccess) onResetSuccess();
      }, 1200);
    } catch (err) {
      setLocalError(err.message || 'Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto w-full bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl text-left space-y-6">
        {/* Header */}
        <div className="space-y-2 text-left">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-transit-500 to-transit-700 flex items-center justify-center text-white shadow-glow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-sans">
              SmartTransit <span className="text-transit-500">OS</span>
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight pt-2">
            Create New Password
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Set a strong, secure passphrase for your SmartTransit OS profile.
          </p>
        </div>

        {/* Error / Success Feedback */}
        {localError && <Alert variant="danger">{localError}</Alert>}
        {isSuccess && (
          <Alert variant="success" title="Password Updated">
            Your password has been changed successfully. Redirecting to login...
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Component */}
            <PasswordStrength password={newPassword} />
          </div>

          <Input
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={Lock}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={ArrowRight}
            className="mt-2 shadow-glow"
          >
            Update Password & Sign In
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
          Cancel and return to{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="text-transit-500 hover:text-transit-600 font-bold ml-1"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
