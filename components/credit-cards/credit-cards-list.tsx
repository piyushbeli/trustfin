'use client';

/**
 * Renders a vertical list of credit card recommendation cards.
 */

import { CREDIT_CARDS } from '@/lib/constants/credit-card-data';
import CreditCardItem from './credit-card-item';

const CreditCardsList = (): React.ReactNode => {
  if (CREDIT_CARDS.length === 0) {
    return (
      <div className="mx-auto flex min-h-[160px] max-w-xl items-center justify-center px-4">
        <p className="text-muted-foreground text-lg">Coming Soon</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      {CREDIT_CARDS.map((card) => (
        <CreditCardItem key={card.title} card={card} />
      ))}
    </div>
  );
};

export default CreditCardsList;
