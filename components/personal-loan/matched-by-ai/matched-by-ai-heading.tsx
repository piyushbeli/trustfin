/**
 * MatchedByAiHeading
 * Left-aligned heading for the "Personal Loans, Matched by AI" section.
 * Highlights the "Matched by AI" portion in brand color with a sparkle accent.
 */

import { JSX } from 'react';
import { AI_MATCHED_SECTION } from '../constants';
import Image from 'next/image';
import { IMAGES } from '@/lib/constants/images';

const MatchedByAiHeading = (): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-base font-semibold custom-text-black leading-snug">
        {AI_MATCHED_SECTION.titleLead}{' '}
        <span className="text-brand-primary">{AI_MATCHED_SECTION.titleHighlight}</span>
      </h2>
      <Image src={IMAGES.ai} alt="AI" width={30} height={30} className="shrink-0" />
    </div>
  );
};

export default MatchedByAiHeading;
