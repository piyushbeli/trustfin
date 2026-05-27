'use client';

import { JSX } from 'react';
import EligibilityCta from '@/components/personal-loan/eligibility/eligibility-cta';
import { useBusinessLoanApply } from './use-business-loan-apply';

/** Eligibility section CTA — navigates to business loan application */
const BusinessEligibilityCta = (): JSX.Element => {
  const { navigateToApply } = useBusinessLoanApply();

  return (
    <EligibilityCta
      label="Check If You're Eligible"
      onClick={navigateToApply}
      isLoading={false}
    />
  );
};

export default BusinessEligibilityCta;
