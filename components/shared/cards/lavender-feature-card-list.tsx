/**
 * LavenderFeatureCardList
 * Stacked lavender cards with optional intro paragraph.
 */

import { JSX } from 'react';
import LavenderFeatureCard from './lavender-feature-card';
import type { ProseCardItem } from './types';

interface LavenderFeatureCardListProps {
  items: readonly ProseCardItem[];
  intro?: string;
}

const LavenderFeatureCardList = ({
  items,
  intro,
}: LavenderFeatureCardListProps): JSX.Element => {
  return (
    <div className="space-y-4">
      {intro && (
        <p className="text-sm leading-relaxed text-gray-600">{intro}</p>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <LavenderFeatureCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LavenderFeatureCardList;
