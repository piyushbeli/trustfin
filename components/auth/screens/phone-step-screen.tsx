'use client';

import { useRef } from 'react';
import { PhoneInput } from '@/components/auth';
import { scrollFocusedFieldIntoView } from '@/lib/utils/mobile-modal-layout';
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
  const phoneFieldRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isPhoneValid && !isLoading) {
      onContinue();
    }
  };

  const handlePhoneInputFocus = (): void => {
    scrollFocusedFieldIntoView(phoneFieldRef.current);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <AuthModalHeader onClose={onClose} />

      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          <AuthStepTitle
            titleLine1="Login or"
            titleLine2="Register to get started"
            subtitle="Access all offers & get latest personalized updates"
          />

          <div ref={phoneFieldRef}>
            <label
              htmlFor="phone-number"
              className="mb-1 block text-xs font-semibold tracking-wider text-gray-500"
            >
              PHONE NUMBER
            </label>
            <PhoneInput
              id="phone-number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onPhoneChange}
              placeholder=""
              error={error || undefined}
              onInputFocus={handlePhoneInputFocus}
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
