import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { cn } from '../../utils/index.js';

export function OtpVerificationPage({
  targetEmail = 'passenger@smarttransit.city',
  onVerifySuccess,
  onNavigateLogin,
}) {
  const { verifyOtp, requestPasswordReset, isLoading, authError } = useAuth();

  const [otpValues, setOtpValues] = useState(['1', '2', '3', '4', '5', '6']);
  const [countdown, setCountdown] = useState(60);
  const [localError, setLocalError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otpValues];
    next[index] = value.slice(-1);
    setOtpValues(next);

    // Auto-focus next input if available
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResend = async () => {
    setCountdown(60);
    setLocalError(null);
    try {
      await requestPasswordReset(targetEmail);
    } catch (err) {
      setLocalError('Failed to resend verification code.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    const fullCode = otpValues.join('');

    if (fullCode.length < 6) {
      setLocalError('Please enter all 6 digits of the verification code.');
      return;
    }

    try {
      await verifyOtp(fullCode);
      setIsSuccess(true);
      setTimeout(() => {
        if (onVerifySuccess) onVerifySuccess();
      }, 800);
    } catch (err) {
      setLocalError(err.message || 'Invalid verification PIN code.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto w-full bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl text-left space-y-6">
        {/* Header */}
        <div className="space-y-2 text-left">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-transit-500 to-transit-700 flex items-center justify-center text-white shadow-glow-sm">
              <KeyRound className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-sans">
              SmartTransit <span className="text-transit-500">OS</span>
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight pt-2">
            Verify 6-Digit PIN
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A temporary verification code has been dispatched to <strong>{targetEmail}</strong>.
          </p>
        </div>

        {/* Error / Success Feedback */}
        {localError && <Alert variant="danger">{localError}</Alert>}
        {isSuccess && (
          <Alert variant="success" title="Verification Confirmed">
            PIN verified successfully. Redirecting to password reset...
          </Alert>
        )}

        {/* 6-Digit OTP Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            {otpValues.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={cn(
                  'w-12 h-14 text-center text-xl font-mono font-bold rounded-2xl border transition-all focus:outline-none focus:ring-2',
                  'bg-slate-50 dark:bg-navy-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-transit-500'
                )}
                autoFocus={idx === 0}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              Demo Code: <strong className="text-transit-500">123456</strong>
            </span>

            {countdown > 0 ? (
              <span className="text-slate-400">Resend in {countdown}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-transit-500 hover:text-transit-600 font-bold flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend Code</span>
              </button>
            )}
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
            Confirm & Proceed
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

export default OtpVerificationPage;
