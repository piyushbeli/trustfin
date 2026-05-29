/**
 * Personal Loan Interest Rates — SEO content page (May 2026).
 */

import type { Metadata } from 'next';
import InterestRatesPageContent from '@/components/personal-loan/interest-rates/interest-rates-page-content';
import { PersonalLoanContent } from '@/components/personal-loan/personal-loan-content';
import StickyApplyButton from '@/components/personal-loan/sticky-apply-button';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Personal Loan Interest Rates May 2026, Compare All Lenders on TrustFin.ai',
    description:
      'Compare personal loan interest rates from 23 lenders on TrustFin.ai. Rates starting from 9.99% p.a. Check lender-wise rates, processing fees, and find the best offer for your profile in seconds.',
    keywords: 'personal loan interest rates, compare lenders, TrustFin, personal loan rates India',
  };
}

const PersonalLoanInterestRatesPage = (): React.ReactNode => {
  return (
    <>
      <InterestRatesPageContent />
      <PersonalLoanContent />
      <StickyApplyButton />
    </>
  );
};

export default PersonalLoanInterestRatesPage;
