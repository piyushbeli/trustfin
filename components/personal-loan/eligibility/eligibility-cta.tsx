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

const EligibilityCta = (): JSX.Element => {
  const { triggerApplyFlow, isApplyLoading } = useLoanApplicationStore();

  return (
    <SectionWrapper>
      <ActionButton
        className="h-12 custom-cta-button bg-brand-primary text-base font-medium text-white hover:bg-brand-primary/90"
        size="lg"
        onClick={triggerApplyFlow}
        isLoading={isApplyLoading}
      >
        Check If you are eligible
      </ActionButton>
    </SectionWrapper>
  );
};

export default EligibilityCta;
