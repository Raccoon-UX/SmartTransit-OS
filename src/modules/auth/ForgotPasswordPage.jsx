import React, { useState } from 'react';
import { Activity, Mail, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextInput as Input } from '../../components/ui/Input.jsx';
import { Alert } from '../../components/ui/Alert.jsx';

export function ForgotPasswordPage({ onNavigateLogin, onOtpRequested }) {
  const { requestPasswordReset, isLoading, authError } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('passenger@smarttransit.city');
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!emailOrPhone.trim()) {
      setLocalError('Please enter your email address or mobile phone number.');
      return;
    }

    try {
      const response = await requestPasswordReset(emailOrPhone);
      if (onOtpRequested) {
        onOtpRequested({ emailOrPhone, demoOtp: response.demoOtp });
      }
    } catch (err) {
      setLocalError(err.message || 'Failed to request reset OTP.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto w-full bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl text-left space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-transit-500 to-transit-700 flex items-center justify-center text-white shadow-glow-sm">
              <KeyRound className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-sans">
              SmartTransit <span className="text-transit-500">OS</span>
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight pt-2">
            Recover Account Password
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your registered email address or mobile phone to receive a 6-digit verification PIN.
          </p>
        </div>

        {/* Error Banner */}
        {(localError || authError) && (
          <Alert variant="danger" title="Recovery Request Error">
            {localError || authError}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email or Mobile Number"
            type="text"
            placeholder="e.g. passenger@smarttransit.city"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            leftIcon={Mail}
            required
          />

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Demo Mode Notice: A simulated 6-digit code (<strong>123456</strong>) will be issued.
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={ArrowRight}
            className="shadow-glow"
          >
            Send Verification Code
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
          Remembered your password?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="text-transit-500 hover:text-transit-600 font-bold ml-1"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
