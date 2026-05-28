'use client';

import { JSX, useMemo, useState } from 'react';
import { PhoneInput, OTPInput } from '@/components/auth';
import { useOtpAuthFlow } from '@/hooks/use-otp-auth-flow';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat-copy';
import { useAuthStore } from '@/stores/auth-store';

type LoginStep = 'phone' | 'otp';

interface AiChatLoginPanelProps {
  pendingFirstMessage: string | null;
}

const AiChatLoginPanel = ({ pendingFirstMessage }: AiChatLoginPanelProps): JSX.Element => {
  const { user, setUser } = useAuthStore();
  const [step, setStep] = useState<LoginStep>('phone');
  const {
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
  } = useOtpAuthFlow({
    initialPhoneNumber: user?.phoneNumber ?? '',
    onAuthenticated: (authenticatedUser, token) => {
      setUser(authenticatedUser, token);
    },
  });

  const helperText = useMemo(() => {
    if (!pendingFirstMessage?.trim()) {
      return AI_CHAT_COPY.loginSubtitle;
    }
    return AI_CHAT_COPY.loginWithPendingMessageSubtitle;
  }, [pendingFirstMessage]);

  const handleSendOtp = async (): Promise<void> => {
    const isOtpSent = await sendOtp();
    if (isOtpSent) {
      setStep('otp');
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-6">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
        <p className="text-base font-semibold text-gray-900">{AI_CHAT_COPY.loginTitle}</p>
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>

        {step === 'phone' ? (
          <div className="mt-5 space-y-4">
            <PhoneInput
              value={phoneNumber}
              onChange={(value) => {
                clearError();
                setPhoneNumber(value);
              }}
              error={error ?? undefined}
            />
            <button
              type="button"
              onClick={() => {
                void handleSendOtp();
              }}
              disabled={!isPhoneValid || isLoading}
              className="wc-hero-cta-gradient w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? AI_CHAT_COPY.loginSendingOtpLabel : AI_CHAT_COPY.loginContinueLabel}
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <OTPInput
              value={otpValue}
              size="compact"
              onChange={(value) => {
                clearError();
                setOtpValue(value);
              }}
              onComplete={(value) => {
                void verifyOtp(value);
              }}
              onResend={() => {
                void resendOtp();
              }}
              onChangeNumber={() => {
                setStep('phone');
                setOtpValue('');
              }}
              error={error ?? undefined}
              disabled={isLoading}
              phoneNumber={phoneNumber}
              className="w-full items-stretch"
            />
            <button
              type="button"
              onClick={() => {
                void verifyOtp();
              }}
              disabled={isLoading || otpValue.length !== 6}
              className="wc-hero-cta-gradient mt-2 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? AI_CHAT_COPY.loginVerifyingLabel : AI_CHAT_COPY.loginVerifyLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiChatLoginPanel;
