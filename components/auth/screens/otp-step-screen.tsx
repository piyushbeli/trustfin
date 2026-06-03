'use client';

import { OTPInput } from '@/components/auth';
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
  const isOtpComplete = otpValue.length === 6;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isOtpComplete && !isLoading) {
      void onVerify();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <AuthModalHeader onClose={onClose} />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 min-h-0"
      >
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          <AuthStepTitle
            titleLine1="Let's Verify"
            titleLine2="your mobile number"
          />

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

        <AuthModalFooter
          isContinueDisabled={!isOtpComplete || isLoading}
          isLoading={isLoading}
          loadingLabel="Verifying..."
        />
      </form>
    </div>
  );
};
