/**
 * ProseTipCards
 * Lavender cards for numbered tips (e.g. how to get the lowest rate).
 */

import { JSX } from 'react';
import type { ProseTipItem } from './constants';

interface ProseTipCardsProps {
  items: ProseTipItem[];
}

const ProseTipCards = ({ items }: ProseTipCardsProps): JSX.Element => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="">
          <p className="text-sm font-semibold custom-text-black">{item.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProseTipCards;
