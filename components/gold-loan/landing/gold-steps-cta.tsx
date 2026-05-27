'use client';

import { JSX } from 'react';
import GoldApplyButton from './gold-apply-button';

/** Steps section CTA — opens gold loan application */
const GoldStepsCta = (): JSX.Element => {
  return (
    <GoldApplyButton
      className="h-14 custom-cta-button text-lg font-medium bg-brand-primary text-white hover:bg-brand-primary/90"
      fullWidth={false}
    />
  );
};

export default GoldStepsCta;
