'use client';

/**
 * Primary CTA for gold loan landing sections — navigates to /gold-loan/apply.
 */

import { JSX } from 'react';
import { ActionButton } from '@/components/shared';
import { useGoldLoanApply } from './use-gold-loan-apply';
import { GOLD_HERO_COPY } from './constants';

interface GoldApplyButtonProps {
  label?: string;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const GoldApplyButton = ({
  label = GOLD_HERO_COPY.primaryCta,
  className = 'h-14 w-full rounded-md! text-base font-medium bg-brand-primary text-white hover:bg-brand-primary/90',
  fullWidth = true,
  onClick,
}: GoldApplyButtonProps): JSX.Element => {
  const { navigateToApply } = useGoldLoanApply();

  const handleClick = (): void => {
    if (onClick) {
      onClick();
      return;
    }
    navigateToApply();
  };

  return (
    <ActionButton
      type="button"
      className={className}
      fullWidth={fullWidth}
      size="lg"
      onClick={handleClick}
    >
      {label}
    </ActionButton>
  );
};

export default GoldApplyButton;
