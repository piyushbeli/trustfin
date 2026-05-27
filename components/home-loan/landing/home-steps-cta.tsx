'use client';

import { JSX } from 'react';
import HomeApplyButton from './home-apply-button';

/** Steps section CTA — opens home loan application */
const HomeStepsCta = (): JSX.Element => {
  return (
    <HomeApplyButton
      className="h-14 custom-cta-button text-lg font-medium bg-brand-primary text-white hover:bg-brand-primary/90"
      fullWidth={false}
    />
  );
};

export default HomeStepsCta;
