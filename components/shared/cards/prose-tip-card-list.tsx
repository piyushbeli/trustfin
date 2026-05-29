/**
 * ProseTipCardList
 * Vertical list of plain purple-title tip rows.
 */

import { JSX } from 'react';
import ProseTipCard from './prose-tip-card';
import type { ProseCardItem } from './types';

interface ProseTipCardListProps {
  items: readonly ProseCardItem[];
}

const ProseTipCardList = ({ items }: ProseTipCardListProps): JSX.Element => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ProseTipCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProseTipCardList;
