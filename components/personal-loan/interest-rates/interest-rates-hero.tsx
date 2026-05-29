/**
 * InterestRatesHero
 * Left-aligned editorial hero for the PL interest rates page.
 */

import { JSX } from 'react';
import { INTEREST_RATES_HERO } from './constants';
import InterestRatesHeading from './interest-rates-heading';

const InterestRatesHero = (): JSX.Element => {
  return (
    <header className="space-y-4">
      <InterestRatesHeading
        as="h1"
        highlight={INTEREST_RATES_HERO.titleHighlight}
        rest={INTEREST_RATES_HERO.titleRest}
      />
      {INTEREST_RATES_HERO.paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="text-left text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {paragraph}
        </p>
      ))}
    </header>
  );
};

export default InterestRatesHero;
