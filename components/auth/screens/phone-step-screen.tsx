'use client';

import { PhoneInput } from '@/components/auth';
import { AuthModalFooter } from '../auth-modal-footer';
import { AuthModalHeader } from '../auth-modal-header';
import { AuthStepTitle } from '../auth-step-title';
import type { PhoneStepScreenProps } from '../types';

/**
 * Phone step screen — flat white layout with phone input and OTP request.
 */
export const PhoneStepScreen = ({
  phoneNumber,
  isPhoneValid,
  isLoading,
  error,
  onPhoneChange,
  onContinue,
  onClose,
}: PhoneStepScreenProps): React.ReactNode => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isPhoneValid && !isLoading) {
      onContinue();
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
            titleLine1="Login or"
            titleLine2="Register to get started"
            subtitle="Access all offers & get latest personalized updates"
          />

          <div>
            <label htmlFor="phone-number" className="block text-xs font-semibold tracking-wider text-gray-500 mb-1">
              PHONE NUMBER
            </label>
            <PhoneInput
              id="phone-number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onPhoneChange}
              placeholder=""
              error={error || undefined}
            />
          </div>
        </div>

        <AuthModalFooter
          isContinueDisabled={!isPhoneValid || isLoading}
          isLoading={isLoading}
          loadingLabel="Sending OTP..."
        />
      </form>
    </div>
  );
};
