/**
 * MatchedByAiHeading
 * Left-aligned heading for the "Personal Loans, Matched by AI" section.
 * Highlights the "Matched by AI" portion in brand color with a sparkle accent.
 */

import { JSX } from 'react';
import { Sparkles } from 'lucide-react';
import { AI_MATCHED_SECTION } from '../constants';

const MatchedByAiHeading = (): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-base font-semibold text-gray-900 leading-snug">
        {AI_MATCHED_SECTION.titleLead}{' '}
        <span className="text-brand-primary">{AI_MATCHED_SECTION.titleHighlight}</span>
      </h2>
      <Sparkles className="w-5 h-5 text-brand-primary shrink-0" aria-hidden />
    </div>
  );
};

export default MatchedByAiHeading;
