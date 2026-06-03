'use client';

import Link from 'next/link';
import { ActionButton } from '@/components/shared';
import { BRAND_NAME } from '@/lib/constants/common';
import { cn } from '@/lib/utils';

interface AuthModalFooterProps {
  isContinueDisabled: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
  buttonType?: 'button' | 'submit';
  onContinue?: () => void;
}

/**
 * Pinned auth modal footer with consent checkbox (visual only) and Continue CTA.
 */
export const AuthModalFooter = ({
  isContinueDisabled,
  isLoading = false,
  loadingLabel = 'Continue',
  buttonType = 'submit',
  onContinue,
}: AuthModalFooterProps): React.ReactNode => {
  return (
    <div className="shrink-0 px-6 pb-8 pt-4 bg-white">
      <div className="flex items-start gap-3 mb-5">
        <input
          type="checkbox"
          id="auth-consent"
          defaultChecked
          readOnly
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-brand-primary accent-brand-primary text-brand-primary focus:ring-brand-primary pointer-events-none"
          aria-hidden
        />
        <label htmlFor="auth-consent" className="text-sm text-gray-600 leading-snug">
          By signing up you agree to{' '}
          <Link
            href="/terms-of-service"
            className="text-brand-primary font-semibold hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Term
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy-policy"
            className="text-brand-primary font-semibold hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Policy
          </Link>{' '}
          of {BRAND_NAME}
        </label>
      </div>

      <ActionButton
        type={buttonType}
        fullWidth
        disabled={isContinueDisabled}
        isLoading={isLoading}
        className={cn(
          'rounded-xl py-4 text-base h-auto',
          isContinueDisabled && !isLoading &&
            'disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-100 disabled:hover:bg-gray-200 disabled:shadow-none',
        )}
        onClick={buttonType === 'button' ? onContinue : undefined}
      >
        {isLoading ? loadingLabel : 'Continue'}
      </ActionButton>
    </div>
  );
};
