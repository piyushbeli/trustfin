'use client';

/**
 * StepsCta
 * CTA shown at the bottom of the steps timeline. Triggers the apply flow.
 */

import { JSX } from 'react';
import { ActionButton } from '@/components/shared';
import { useLoanApplicationStore } from '@/stores/loan-application-store';

interface StepsCtaProps {
  label?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const StepsCta = ({
  label = 'Start Loan Application',
  onClick,
  isLoading: isLoadingProp,
}: StepsCtaProps): JSX.Element => {
  const { triggerApplyFlow, isApplyLoading } = useLoanApplicationStore();
  const handleClick = onClick ?? triggerApplyFlow;
  const isLoading = isLoadingProp ?? isApplyLoading;

  return (
    <ActionButton
      className="h-14 custom-cta-button text-lg font-medium bg-brand-primary text-white hover:bg-brand-primary/90"
      size="lg"
      onClick={handleClick}
      isLoading={isLoading}
    >
      {label}
    </ActionButton>
  );
};

export default StepsCta;
