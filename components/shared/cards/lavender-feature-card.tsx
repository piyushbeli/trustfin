/**
 * LavenderFeatureCard
 * Single lavender callout row (e.g. Digital KYC feature items).
 */

import { JSX } from 'react';
import type { ProseCardItem } from './types';

interface LavenderFeatureCardProps {
  item: ProseCardItem;
}

const LavenderFeatureCard = ({ item }: LavenderFeatureCardProps): JSX.Element => {
  return (
    <div className="space-y-1 rounded-xl bg-brand-50 p-4">
      <p className="text-sm font-semibold text-brand-primary">{item.title}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </div>
  );
};

export default LavenderFeatureCard;
