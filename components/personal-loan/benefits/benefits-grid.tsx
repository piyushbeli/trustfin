'use client';

/**
 * BenefitsGrid
 * 2x2 grid of BenefitCards. Kept separate from the section composer so
 * the layout primitive can be reused on other pages if needed.
 */

import { JSX } from 'react';
import BenefitCard from './benefit-card';
import { WHY_WECREDIT_SIMPLE, type WhyWeCreditSimpleItem } from '../constants';

interface BenefitsGridProps {
  items?: WhyWeCreditSimpleItem[];
}

const BenefitsGrid = ({ items = WHY_WECREDIT_SIMPLE }: BenefitsGridProps): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((benefit, index) => (
        <BenefitCard key={benefit.id} benefit={benefit} index={index} />
      ))}
    </div>
  );
};

export default BenefitsGrid;
