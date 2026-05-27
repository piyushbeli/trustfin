'use client';

/**
 * Credit cards page content: header, card list, and FAQ section.
 * Renders static credit card offers with external application links.
 */

import { FaqSection } from '@/components/shared';
import CreditCardsList from './credit-cards-list';
import CreditCardsRecommendedHeader from './credit-cards-recommended-header';

const CreditCardsPageContent = (): React.ReactNode => {
  return (
    <div className="min-h-screen bg-white">
      <div className="pb-8 sm:pb-10">
        <CreditCardsRecommendedHeader />
        <section className="mb-12 sm:mb-16" aria-label="Credit card offers">
          <CreditCardsList />
        </section>
        <FaqSection />
      </div>
    </div>
  );
};

export default CreditCardsPageContent;
