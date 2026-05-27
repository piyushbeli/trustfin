/**
 * GoldBenefitCard
 * Single benefit tile with title and description for gold loan landing sections.
 */

import { JSX } from 'react';
import type { GoldBenefitItem } from './constants';

interface GoldBenefitCardProps {
  item: GoldBenefitItem;
  index: number;
}

const GoldBenefitCard = ({ item, index }: GoldBenefitCardProps): JSX.Element => {
  return (
    <div
    >
      <div>
        <p className="text-sm font-medium text-primary mb-1">{item.title}</p>
        <p className="text-sm font-normal custom-text-black">{item.description}</p>
      </div>
    </div>
  );
};

export default GoldBenefitCard;
