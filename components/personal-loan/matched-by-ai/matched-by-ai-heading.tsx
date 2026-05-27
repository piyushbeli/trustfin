/**
 * MatchedByAiHeading
 * Left-aligned heading for the "Personal Loans, Matched by AI" section.
 * Highlights the "Matched by AI" portion in brand color with a sparkle accent.
 */

import { JSX } from 'react';
import { AI_MATCHED_SECTION } from '../constants';
import Image from 'next/image';
import { IMAGES } from '@/lib/constants/images';

interface MatchedByAiHeadingProps {
  titleLead?: string;
  titleHighlight?: string;
}

const MatchedByAiHeading = ({
  titleLead = AI_MATCHED_SECTION.titleLead,
  titleHighlight = AI_MATCHED_SECTION.titleHighlight,
}: MatchedByAiHeadingProps): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-base font-semibold custom-text-black leading-snug">
        {titleLead}{' '}
        <span className="text-brand-primary">{titleHighlight}</span>
      </h2>
      <Image src={IMAGES.ai} alt="AI" width={30} height={30} className="shrink-0" />
    </div>
  );
};

export default MatchedByAiHeading;
