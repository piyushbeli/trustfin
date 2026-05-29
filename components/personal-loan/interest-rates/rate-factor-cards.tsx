/**
 * RateFactorCards
 * Lavender stacked cards for rate-determining factors.
 */

import { JSX } from 'react';
import { LavenderFeatureCard } from '@/components/shared';
import type { RateFactorItem } from './constants';

interface RateFactorCardsProps {
  items: RateFactorItem[];
}

const RateFactorCards = ({ items }: RateFactorCardsProps): JSX.Element => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <LavenderFeatureCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default RateFactorCards;
