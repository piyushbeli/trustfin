'use client';

/**
 * Navigates to the gold loan application route from landing-page CTAs.
 */

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GOLD_LOAN_APPLY_PATH } from './constants';

export const useGoldLoanApply = (): { navigateToApply: () => void } => {
  const router = useRouter();

  const navigateToApply = useCallback((): void => {
    router.push(GOLD_LOAN_APPLY_PATH);
  }, [router]);

  return { navigateToApply };
};
