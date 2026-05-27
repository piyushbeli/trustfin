'use client';

/**
 * HeroCta
 * Primary call-to-action — triggers the apply flow from the loan application store.
 */

import { JSX } from 'react';
import { ActionButton } from '@/components/shared';
import { useLoanApplicationStore } from '@/stores/loan-application-store';
import { HERO_COPY } from '../constants';

const HeroCta = (): JSX.Element => {
  const { triggerApplyFlow, isApplyLoading } = useLoanApplicationStore();

  return (
    <ActionButton
      className="h-14 w-full text-base font-medium bg-brand-primary text-white hover:bg-brand-primary/90 rounded-xl"
      fullWidth
      size="lg"
      onClick={triggerApplyFlow}
      isLoading={isApplyLoading}
    >
      {HERO_COPY.primaryCta}
    </ActionButton>
  );
};

export default HeroCta;
