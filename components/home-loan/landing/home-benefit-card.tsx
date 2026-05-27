/**
 * HomeBenefitCard
 * Single benefit/feature tile with title and description for home loan landing sections.
 */

import { JSX } from 'react';
import type { HomeBenefitItem } from './constants';

interface HomeBenefitCardProps {
  item: HomeBenefitItem;
  index: number;
}

const HomeBenefitCard = ({ item, index }: HomeBenefitCardProps): JSX.Element => {
  return (
    <div
      // className="bg-brand-lightest rounded shadow-sm overflow-hidden h-full"
    >
      <div className="">
        <p className="text-sm font-medium text-primary mb-1">{item.title}</p>
        <p className="text-sm font-normal custom-text-black">{item.description}</p>
      </div>
    </div>
  );
};

export default HomeBenefitCard;
