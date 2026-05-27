'use client';

import { JSX } from 'react';
import BusinessApplyButton from './business-apply-button';

/** Steps section CTA — opens business loan application */
const BusinessStepsCta = (): JSX.Element => {
  return (
    <BusinessApplyButton
      className="h-14 custom-cta-button text-lg font-medium bg-brand-primary text-white hover:bg-brand-primary/90"
      fullWidth={false}
    />
  );
};

export default BusinessStepsCta;
