'use client';

/**
 * InterestRatesCta
 * Full-width primary CTA for the PL interest rates page — triggers the standard apply flow.
 */

import { JSX } from 'react';
import { ActionButton } from '@/components/shared';
import { useLoanApplicationStore } from '@/stores/loan-application-store';

interface InterestRatesCtaProps {
  label: string;
  className?: string;
  /** When set, scrolls to the element id instead of opening the apply flow */
  scrollToId?: string;
}

const InterestRatesCta = ({
  label,
  className,
  scrollToId,
}: InterestRatesCtaProps): JSX.Element => {
  const { triggerApplyFlow, isApplyLoading } = useLoanApplicationStore();

  const handleClick = (): void => {
    if (scrollToId) {
      document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    triggerApplyFlow();
  };

  return (
    <ActionButton
      type="button"
      fullWidth
      size="lg"
      isLoading={scrollToId ? false : isApplyLoading}
      onClick={handleClick}
      className={className ?? 'h-12 custom-cta-button bg-brand-primary text-base font-medium text-white hover:bg-brand-primary/90'}
    >
      {label}
    </ActionButton>
  );
};

export default InterestRatesCta;
