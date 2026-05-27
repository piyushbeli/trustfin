'use client';

import { JSX } from 'react';
import EligibilityCta from '@/components/personal-loan/eligibility/eligibility-cta';
import { useHomeLoanApply } from './use-home-loan-apply';
import { HOME_HERO_COPY } from './constants';

/** Eligibility section CTA — navigates to home loan application */
const HomeEligibilityCta = (): JSX.Element => {
  const { navigateToApply } = useHomeLoanApply();

  return (
    <EligibilityCta
      label={HOME_HERO_COPY.primaryCta}
      onClick={navigateToApply}
      isLoading={false}
    />
  );
};

export default HomeEligibilityCta;
