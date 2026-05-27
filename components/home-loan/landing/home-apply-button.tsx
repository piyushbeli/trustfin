'use client';

/**
 * Primary CTA for home loan landing sections — navigates to /home-loan/apply.
 */

import { JSX } from 'react';
import { ActionButton } from '@/components/shared';
import { useHomeLoanApply } from './use-home-loan-apply';
import { HOME_HERO_COPY } from './constants';

interface HomeApplyButtonProps {
  label?: string;
  className?: string;
  fullWidth?: boolean;
}

const HomeApplyButton = ({
  label = HOME_HERO_COPY.primaryCta,
  className = 'h-14 w-full rounded-md! text-base font-medium bg-brand-primary text-white hover:bg-brand-primary/90',
  fullWidth = true,
}: HomeApplyButtonProps): JSX.Element => {
  const { navigateToApply } = useHomeLoanApply();

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

export default HomeApplyButton;
