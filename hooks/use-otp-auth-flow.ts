'use client';

import { useEffect, useRef, useState } from 'react';
import { authService } from '@/lib/api';
import { completeAppLogin } from '@/lib/auth/complete-app-login';

interface AuthenticatedUser {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
}

interface UseOtpAuthFlowOptions {
  initialPhoneNumber?: string;
  onAuthenticated: (user: AuthenticatedUser, token: string) => void;
}

interface UseOtpAuthFlowResult {
  phoneNumber: string;
  otpValue: string;
  isLoading: boolean;
  error: string | null;
  isPhoneValid: boolean;
  setPhoneNumber: (value: string) => void;
  setOtpValue: (value: string) => void;
  clearError: () => void;
  sendOtp: (phoneOverride?: string) => Promise<boolean>;
  verifyOtp: (otpOverride?: string, phoneOverride?: string) => Promise<boolean>;
  resendOtp: () => Promise<boolean>;
}

export const useOtpAuthFlow = ({
  initialPhoneNumber = '',
  onAuthenticated,
}: UseOtpAuthFlowOptions): UseOtpAuthFlowResult => {
  const [phoneNumber, setPhoneNumberState] = useState(initialPhoneNumber);
  const [otpValue, setOtpValueState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isVerifyingOtpRef = useRef<boolean>(false);

  useEffect(() => {
    setPhoneNumberState(initialPhoneNumber.trim());
  }, [initialPhoneNumber]);

  const isPhoneValid = phoneNumber.length === 10 && /^[6-9]/.test(phoneNumber) && /^\d{10}$/.test(phoneNumber);

  const setPhoneNumber = (value: string): void => {
    setPhoneNumberState(value.trim());
  };

  const setOtpValue = (value: string): void => {
    setOtpValueState(value.trim());
  };

  const clearError = (): void => {
    setError(null);
  };

  const sendOtp = async (phoneOverride?: string): Promise<boolean> => {
    const resolvedPhoneNumber = (phoneOverride ?? phoneNumber).trim();
    const isResolvedPhoneValid =
      resolvedPhoneNumber.length === 10 &&
      /^[6-9]/.test(resolvedPhoneNumber) &&
      /^\d{10}$/.test(resolvedPhoneNumber);

    if (!isResolvedPhoneValid || isLoading) {
      return false;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await authService.sendOtp(resolvedPhoneNumber);
      if (result.success) {
        setPhoneNumberState(resolvedPhoneNumber);
        return true;
      }
      setError(result.error || 'Failed to send OTP. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otpOverride?: string, phoneOverride?: string): Promise<boolean> => {
    const otpToVerify = (otpOverride ?? otpValue).trim();
    const resolvedPhoneNumber = (phoneOverride ?? phoneNumber).trim();
    if (otpToVerify.length !== 6 || isLoading || isVerifyingOtpRef.current) {
      return false;
    }

    isVerifyingOtpRef.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const result = await authService.verifyOtp(resolvedPhoneNumber, otpToVerify);
      if (result.success && result.data) {
        const token = result.data.token;
        const userId = result.data.user.id;

        // Single source of truth for how we sync cookies + Zustand auth state.
        completeAppLogin({
          token,
          mobile: resolvedPhoneNumber,
          userId,
        });

        // Notify caller (e.g. auth modal) after login state is updated.
        // Strip optional fields so we don't set `name` on the client.
        onAuthenticated(
          {
            id: userId,
            phoneNumber: resolvedPhoneNumber,
          },
          token,
        );
        setOtpValueState('');
        return true;
      }

      setError(result.error || 'Invalid OTP. Please try again.');
      return false;
    } finally {
      isVerifyingOtpRef.current = false;
      setIsLoading(false);
    }
  };

  const resendOtp = async (): Promise<boolean> => {
    if (isLoading || !isPhoneValid) {
      return false;
    }

    setError(null);
    setOtpValueState('');
    setIsLoading(true);
    try {
      const result = await authService.resendOtp(phoneNumber);
      if (!result.success) {
        setError(result.error || 'Failed to resend OTP. Please try again.');
        return false;
      }
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    phoneNumber,
    otpValue,
    isLoading,
    error,
    isPhoneValid,
    setPhoneNumber,
    setOtpValue,
    clearError,
    sendOtp,
    verifyOtp,
    resendOtp,
  };
};
