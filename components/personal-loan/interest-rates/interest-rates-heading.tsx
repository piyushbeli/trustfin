/**
 * InterestRatesHeading
 * Title with "Personal Loan" highlighted in brand primary — matches PL hero pattern.
 */

import { JSX } from 'react';
import { cn } from '@/lib/utils';

interface InterestRatesHeadingProps {
  highlight: string;
  rest: string;
  as?: 'h1' | 'h2';
  className?: string;
}

const InterestRatesHeading = ({
  highlight,
  rest,
  as: Tag = 'h1',
  className,
}: InterestRatesHeadingProps): JSX.Element => {
  const isH1 = Tag === 'h1';

  return (
    <Tag
      className={cn(
        'text-left font-bold leading-snug custom-text-black',
        isH1 ? 'text-2xl md:text-3xl' : 'text-lg font-semibold md:text-xl',
        className
      )}
    >
      <span className="text-brand-primary">{highlight}</span> {rest}
    </Tag>
  );
};

export default InterestRatesHeading;
