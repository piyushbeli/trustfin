'use client';

/**
 * BenefitsGrid
 * 2x2 grid of BenefitCards. Kept separate from the section composer so
 * the layout primitive can be reused on other pages if needed.
 */

import { JSX } from 'react';
import BenefitCard from './benefit-card';
import { WHY_WECREDIT_SIMPLE } from '../constants';

const BenefitsGrid = (): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {WHY_WECREDIT_SIMPLE.map((benefit, index) => (
        <BenefitCard key={benefit.id} benefit={benefit} index={index} />
      ))}
    </div>
  );
};

export default BenefitsGrid;
