import { useCallback, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useLoading } from '@/hooks/use-loading';
import { useOtpAuthFlow } from '@/hooks/use-otp-auth-flow';

/**
 * Return type for useAuthHandlers hook
 */
interface UseAuthHandlersReturn {
  phoneNumber: string;
  otpValue: string;
  isPhoneValid: boolean;
  isLoading: boolean;
  error: string | null;
  handlePhoneChange: (value: string, isValid: boolean) => void;
  handleSendOtp: () => Promise<void>;
  handleOtpChange: (otp: string) => void;
  handleVerifyOtp: (otpOverride?: string) => Promise<void>;
  handleResendOtp: () => Promise<void>;
  setOtpValue: (value: string) => void;
}

/**
 * Custom hook for handling authentication business logic
 * Encapsulates phone validation, OTP sending, verification, and resend logic
 * 
 * @returns Handler functions and state for authentication flow
 */
export const useAuthHandlers = (): UseAuthHandlersReturn => {
  const {
    phoneNumber: storePhoneNumber,
    isModalOpen,
    currentStep,
    shouldAutoSendOtp,
    setStep,
    setPhoneNumber: setStorePhoneNumber,
    setUser,
    clearShouldAutoSendOtp,
    setError,
  } = useAuthStore();
  const { showLoading, hideLoading } = useLoading();
  const {
    phoneNumber,
    otpValue,
    isPhoneValid,
    isLoading,
    error,
    setPhoneNumber,
    setOtpValue,
    clearError,
    sendOtp,
    verifyOtp,
    resendOtp,
  } = useOtpAuthFlow({
    initialPhoneNumber: storePhoneNumber,
    onAuthenticated: (user, token) => {
      setUser(user, token);
    },
  });

  /**
   * Upswing / OTP-first entry: modal opens on OTP with phone pre-filled; we must still
   * call sendOtp (same as tapping Continue on the phone step). Clears shouldAutoSendOtp
   * synchronously before the async send so Strict Mode does not double-send.
   */
  useEffect(() => {
    if (!isModalOpen || !shouldAutoSendOtp || currentStep !== 'otp') {
      return;
    }

    const trimmed = phoneNumber.trim();
    const isValidForOtp =
      trimmed.length === 10 && /^[6-9]/.test(trimmed) && /^\d{10}$/.test(trimmed);
    if (!isValidForOtp) {
      clearShouldAutoSendOtp();
      setError('Enter a valid 10-digit mobile number starting with 6–9.');
      return;
    }

    clearShouldAutoSendOtp();

    clearError();
    showLoading('Sending OTP...', 'We are verifying your phone number.');
    void (async () => {
      try {
        setPhoneNumber(trimmed);
        setStorePhoneNumber(trimmed);
        const isOtpSent = await sendOtp();
        if (!isOtpSent) {
          setError('Failed to send OTP. Please try again.');
        }
      } finally {
        hideLoading();
      }
    })();
  }, [
    isModalOpen,
    shouldAutoSendOtp,
    currentStep,
    phoneNumber,
    clearShouldAutoSendOtp,
    clearError,
    sendOtp,
    setPhoneNumber,
    setStorePhoneNumber,
    setError,
    showLoading,
    hideLoading,
  ]);

  /** Handle phone number change */
  const handlePhoneChange = useCallback(
    (value: string, _isValid: boolean): void => {
      setPhoneNumber(value);
      setStorePhoneNumber(value);
      clearError();
    },
    [clearError, setPhoneNumber, setStorePhoneNumber]
  );

  /** Handle continue button click - send OTP */
  const handleSendOtp = async (): Promise<void> => {
    if (!isPhoneValid || isLoading) {
      return;
    }
    clearError();
    showLoading('Sending OTP...', 'We are verifying your phone number.');
    try {
      const isOtpSent = await sendOtp();
      if (isOtpSent) {
        setStep('otp');
      }
    } finally {
      hideLoading();
    }
  };

  /** Handle OTP change */
  const handleOtpChange = (otp: string): void => {
    setOtpValue(otp);
    clearError();
  };

  /** Handle OTP verification */
  const handleVerifyOtp = async (otpOverride?: string): Promise<void> => {
    if (isLoading) return;
    clearError();
    try {
      showLoading('Please wait...', "We're preparing your WeCredit experience.");
      await verifyOtp(otpOverride ?? otpValue);
    } finally {
      hideLoading();
    }
  };

  /** Handle OTP resend */
  const handleResendOtp = async (): Promise<void> => {
    clearError();
    showLoading('Resending OTP...', 'Please wait a moment.');
    try {
      await resendOtp();
    } finally {
      hideLoading();
    }
  };

  return {
    phoneNumber,
    otpValue,
    isPhoneValid,
    isLoading,
    error,
    handlePhoneChange,
    handleSendOtp,
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
    setOtpValue,
  };
};
