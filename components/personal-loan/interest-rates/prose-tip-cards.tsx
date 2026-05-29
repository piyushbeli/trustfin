/**
 * ProseTipCards
 * Lavender cards for numbered tips (e.g. how to get the lowest rate).
 */

import { JSX } from 'react';
import type { ProseTipItem } from './constants';
import { cn } from '@/lib/utils';

interface ProseTipCardsProps {
  items: ProseTipItem[];
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const ProseTipCards = ({ items, className, titleClassName, descriptionClassName }: ProseTipCardsProps): JSX.Element => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className={className}>
          <p className={cn("text-sm font-semibold custom-text-black", titleClassName)}  >{item.title}</p>
          <p className={cn("text-sm leading-relaxed text-muted-foreground", descriptionClassName)}>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProseTipCards;
