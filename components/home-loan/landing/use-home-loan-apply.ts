'use client';

/**
 * Navigates to the home loan application route from landing-page CTAs.
 */

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { HOME_LOAN_APPLY_PATH } from './constants';

export const useHomeLoanApply = (): { navigateToApply: () => void } => {
  const router = useRouter();

  const navigateToApply = useCallback((): void => {
    router.push(HOME_LOAN_APPLY_PATH);
  }, [router]);

  return { navigateToApply };
};
