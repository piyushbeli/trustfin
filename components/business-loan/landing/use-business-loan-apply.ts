'use client';

/**
 * Navigates to the business loan application route from landing-page CTAs.
 */

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BUSINESS_LOAN_APPLY_PATH } from './constants';

export const useBusinessLoanApply = (): { navigateToApply: () => void } => {
  const router = useRouter();

  const navigateToApply = useCallback((): void => {
    router.push(BUSINESS_LOAN_APPLY_PATH);
  }, [router]);

  return { navigateToApply };
};
