'use client';

/**
 * EligibilityCta
 * Primary CTA sitting directly below the eligibility list. Triggers the
 * same apply flow as the hero and steps CTAs so a user who has just
 * scanned the eligibility rules can immediately start an application.
 */

import { JSX } from 'react';
import { ActionButton, SectionWrapper } from '@/components/shared';
import { useLoanApplicationStore } from '@/stores/loan-application-store';

interface EligibilityCtaProps {
  label?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const EligibilityCta = ({
  label = 'Check If you are eligible',
  onClick,
  isLoading: isLoadingProp,
}: EligibilityCtaProps): JSX.Element => {
  const { triggerApplyFlow, isApplyLoading } = useLoanApplicationStore();
  const handleClick = onClick ?? triggerApplyFlow;
  const isLoading = isLoadingProp ?? isApplyLoading;

  return (
    <SectionWrapper className="flex justify-center">
      <ActionButton
        className="h-12 custom-cta-button bg-brand-primary text-base font-medium text-white hover:bg-brand-primary/90"
        size="lg"
        onClick={handleClick}
        isLoading={isLoading}
      >
        {label}
      </ActionButton>
    </SectionWrapper>
  );
};

export default EligibilityCta;
