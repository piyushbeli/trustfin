/**
 * Personal Loan Documents Required — SEO content page (2026).
 */

import type { Metadata } from 'next';
import RequiredDocumentsPageContent from '@/components/personal-loan/required-documents/required-documents-page-content';
import { PersonalLoanContent } from '@/components/personal-loan/personal-loan-content';
import StickyApplyButton from '@/components/personal-loan/sticky-apply-button';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Documents Required for Personal Loan in India 2026, Complete Checklist',
    description:
      'Complete list of documents required for a personal loan in India 2026. Salaried, self-employed, pensioners, NRIs. Know what each lender needs before you apply.',
    keywords:
      'personal loan documents, document checklist, personal loan documents India, TrustFin, salaried loan documents',
  };
}

const PersonalLoanDocumentsRequiredPage = (): React.ReactNode => {
  return (
    <>
      <RequiredDocumentsPageContent />
      <PersonalLoanContent />
      <StickyApplyButton />
    </>
  );
};

export default PersonalLoanDocumentsRequiredPage;
