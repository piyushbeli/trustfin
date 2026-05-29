/**
 * RequiredDocumentsHero
 * Left-aligned editorial hero for the PL documents required page.
 */

import { JSX } from 'react';
import InterestRatesHeading from '@/components/personal-loan/interest-rates/interest-rates-heading';
import { REQUIRED_DOCUMENTS_HERO } from './constants';

const RequiredDocumentsHero = (): JSX.Element => {
  return (
    <header className="space-y-4">
      <InterestRatesHeading
        as="h1"
        highlight={REQUIRED_DOCUMENTS_HERO.titleHighlight}
        rest={REQUIRED_DOCUMENTS_HERO.titleRest}
      />
      {REQUIRED_DOCUMENTS_HERO.paragraphs.map((paragraph) => (
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

export default RequiredDocumentsHero;
