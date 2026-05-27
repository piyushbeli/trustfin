'use client';

/**
 * Primary CTA for business loan landing sections — navigates to /business-loan/apply.
 */

import { JSX } from 'react';
import { ActionButton } from '@/components/shared';
import { useBusinessLoanApply } from './use-business-loan-apply';
import { BUSINESS_HERO_COPY } from './constants';

interface BusinessApplyButtonProps {
  label?: string;
  className?: string;
  fullWidth?: boolean;
}

const BusinessApplyButton = ({
  label = BUSINESS_HERO_COPY.primaryCta,
  className = 'h-14 w-full rounded-md! text-base font-medium bg-brand-primary text-white hover:bg-brand-primary/90',
  fullWidth = true,
}: BusinessApplyButtonProps): JSX.Element => {
  const { navigateToApply } = useBusinessLoanApply();

  return (
    <ActionButton
      type="button"
      className={className}
      fullWidth={fullWidth}
      size="lg"
      onClick={navigateToApply}
    >
      {label}
    </ActionButton>
  );
};

export default BusinessApplyButton;
