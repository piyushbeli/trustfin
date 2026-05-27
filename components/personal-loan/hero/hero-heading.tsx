import { BRAND_NAME } from '@/lib/constants/common';
import { JSX } from 'react';

/** Main hero headline — "Personal Loan" highlighted in brand purple */
const HeroHeading = (): JSX.Element => {
  return (
    <h1 className="text-2xl font-semibold text-left mb-4 leading-snug">
      Apply for <span className="text-brand-primary">Personal Loan</span>
      {' '}
      at {BRAND_NAME}
    </h1>
  );
};

export default HeroHeading;
