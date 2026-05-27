'use client';

/**
 * StepsCta
 * CTA shown at the bottom of the steps timeline. Triggers the apply flow.
 */

import { JSX } from 'react';
import { ActionButton } from '@/components/shared';
import { useLoanApplicationStore } from '@/stores/loan-application-store';

const StepsCta = (): JSX.Element => {
  const { triggerApplyFlow, isApplyLoading } = useLoanApplicationStore();

  return (
    <ActionButton
      className="h-14 w-full text-lg font-medium bg-brand-primary text-white hover:bg-brand-primary/90"
      fullWidth
      size="lg"
      onClick={triggerApplyFlow}
      isLoading={isApplyLoading}
    >
      Start Loan Application
    </ActionButton>
  );
};

export default StepsCta;
