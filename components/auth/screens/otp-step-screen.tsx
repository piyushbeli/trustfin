'use client';

import { useRef } from 'react';
import { OTPInput } from '@/components/auth';
import { scrollFocusedFieldIntoView } from '@/lib/utils/mobile-modal-layout';
import { AuthModalFooter } from '../auth-modal-footer';
import { AuthModalHeader } from '../auth-modal-header';
import { AuthStepTitle } from '../auth-step-title';
import type { OTPStepScreenProps } from '../types';

/**
 * OTP step screen — flat white layout with OTP verification.
 */
export const OTPStepScreen = ({
  otpValue,
  isLoading,
  error,
  phoneNumber,
  onOtpChange,
  onVerify,
  onResend,
  onBack,
  onClose,
}: OTPStepScreenProps): React.ReactNode => {
  const otpFieldRef = useRef<HTMLDivElement>(null);
  const isOtpComplete = otpValue.length === 6;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isOtpComplete && !isLoading) {
      void onVerify();
    }
  };

  const handleOtpFieldFocus = (): void => {
    scrollFocusedFieldIntoView(otpFieldRef.current);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <AuthModalHeader onClose={onClose} />

      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          <AuthStepTitle titleLine1="Let's Verify" titleLine2="your mobile number" />

          <div ref={otpFieldRef} onFocusCapture={handleOtpFieldFocus}>
            <OTPInput
              onChange={onOtpChange}
              onComplete={(otp) => {
                void onVerify(otp);
              }}
              onResend={onResend}
              onChangeNumber={onBack}
              error={error || undefined}
              disabled={isLoading}
              variant="default"
              showResend={true}
              phoneNumber={phoneNumber}
            />
          </div>
        </div>

        <AuthModalFooter
          isContinueDisabled={!isOtpComplete || isLoading}
          isLoading={isLoading}
          loadingLabel="Verifying..."
        />
      </form>
    </div>
  );
};
