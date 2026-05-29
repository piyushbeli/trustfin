/**
 * RateFactorCards
 * Lavender stacked cards for rate-determining factors.
 */

import { JSX } from 'react';
import type { RateFactorItem } from './constants';

interface RateFactorCardsProps {
  items: RateFactorItem[];
}

const RateFactorCards = ({ items }: RateFactorCardsProps): JSX.Element => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl bg-brand-50 p-4 space-y-1">
          <p className="text-sm font-semibold text-brand-primary">{item.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RateFactorCards;
