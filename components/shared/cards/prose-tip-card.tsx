/**
 * ProseTipCard
 * Plain tip row with purple title — no background fill.
 */

import { JSX } from 'react';
import type { ProseCardItem } from './types';

interface ProseTipCardProps {
  item: ProseCardItem;
}

const ProseTipCard = ({ item }: ProseTipCardProps): JSX.Element => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-brand-primary">{item.title}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </div>
  );
};

export default ProseTipCard;
