/**
 * BenefitCard
 * Single benefit tile used in the "Why Choose WeCredit" grid.
 */

import { JSX } from 'react';
import type { WhyWeCreditSimpleItem } from '../constants';

interface BenefitCardProps {
  benefit: WhyWeCreditSimpleItem;
  index: number;
}

const BenefitCard = ({ benefit, index }: BenefitCardProps): JSX.Element => {
  return (
    <div
      className="h-16 bg-brand-lightest rounded shadow-sm overflow-hidden"
    >
      <div className="p-2">
        <p className="text-sm font-normal text-gray-700">{benefit.text}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
