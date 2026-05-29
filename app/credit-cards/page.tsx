import type { Metadata } from 'next';
import { Suspense } from 'react';
import CreditCardsPageContent from '@/components/credit-cards/credit-cards-page-content';
import { PageLoader } from '@/components/shared/page-loader';

export const metadata: Metadata = {
  title: 'Best Credit Cards Schemes and Offers | Trustfin',
  description:
    'Explore the best credit card offers from top banks. Compare SBI SimplyCLICK, SimplySAVE, PRIME, ELITE, MILES, PULSE and more. Apply now with Trustfin.',
  keywords: [
    'credit cards',
    'SBI credit card',
    'credit card offers',
    'best credit cards',
    'Trustfin',
  ],
};

const CreditCardsPage = (): React.ReactNode => {
  return (
    <Suspense fallback={<PageLoader />}>
      <CreditCardsPageContent />
    </Suspense>
  );
};

export default CreditCardsPage;
