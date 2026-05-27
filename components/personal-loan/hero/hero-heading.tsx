import { BRAND_NAME } from '@/lib/constants/common';
import { JSX } from 'react';

interface HeroHeadingProps {
  productLabel?: string;
}

/** Main hero headline — product name highlighted in brand purple */
const HeroHeading = ({ productLabel = 'Personal Loan' }: HeroHeadingProps): JSX.Element => {
  return (
    <h1 className="text-2xl font-bold text-left mb-4 leading-snug">
      Apply for <span className="text-brand-primary">{productLabel}</span>
      {' '}
      at {BRAND_NAME}
    </h1>
  );
};

export default HeroHeading;
