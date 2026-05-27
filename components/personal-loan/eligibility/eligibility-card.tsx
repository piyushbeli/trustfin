/**
 * EligibilityCard
 * Single criterion row with an icon and label/requirement copy.
 */

import { JSX } from 'react';
import Image from 'next/image';
import type { EligibilityItem } from '../constants';

interface EligibilityCardProps {
  item: EligibilityItem;
  index: number;
}

const EligibilityCard = ({ item }: EligibilityCardProps): JSX.Element => {
  return (
    <div
      className="flex items-center justify-center gap-3 p-2 mb-2 bg-white rounded-lg shadow border border-gray-50"
    >
      <div className="w-9 h-9 bg-brand-primary/10 rounded flex items-center justify-center shrink-0">
        <Image
          src={item.image}
          alt=""
          width={24}
          height={24}
          className="w-5 h-5 object-contain"
        />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm leading-5">
          <span className="font-medium custom-text-black">{item.title} </span>
          <span className="font-normal custom-text-black">{item.requirement}</span>
        </p>
      </div>
    </div>
  );
};

export default EligibilityCard;
