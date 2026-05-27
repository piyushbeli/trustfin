'use client';

/**
 * MatchedByAiSection
 * "Personal Loans, Matched by AI" content section. Thin composer over the
 * heading, intro copy, "What Makes TrustFin Different" subsection (with the
 * 2x2 AI feature grid), and the "Got a Loan Question? Ask the AI" subsection.
 *
 * All content is left-aligned to match the design, so we don't reuse the
 * centered SectionTitle / SectionDescription atoms here.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, AiChatCta } from '@/components/shared';
import MatchedByAiHeading from './matched-by-ai-heading';
import AiFeaturesGrid from './ai-features-grid';
import BorrowerQuestionsList from './borrower-questions-list';
import { AI_MATCHED_SECTION } from '../constants';

const SUBSECTION_TITLE_CLASS = 'text-base font-medium text-gray-900 mb-2';
const BODY_PARAGRAPH_CLASS = 'text-sm text-gray-500 leading-5';

const MatchedByAiSection = (): JSX.Element => {
  const { intro, difference, advisor } = AI_MATCHED_SECTION;

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Intro: heading + opening paragraph with an emphasised middle sentence */}
        <div className="space-y-3">
          <MatchedByAiHeading />
          <p className={BODY_PARAGRAPH_CLASS}>
            {intro.lead}{' '}
            <span className="font-semibold italic text-gray-700">{intro.emphasis}</span>{' '}
            {intro.closing}
          </p>
        </div>

        {/* What Makes TrustFin Different */}
        <div className="space-y-3">
          <h2 className={SUBSECTION_TITLE_CLASS}>{difference.title}</h2>
          {difference.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={BODY_PARAGRAPH_CLASS}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* What the AI handles for you */}
        <div className="space-y-3">
          <h3 className={SUBSECTION_TITLE_CLASS}>{difference.featuresTitle}</h3>
          <AiFeaturesGrid />
        </div>

        {/* Got a Loan Question? Ask the AI */}
        <div className="space-y-3">
          <h2 className={SUBSECTION_TITLE_CLASS}>{advisor.title}</h2>
          {advisor.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={BODY_PARAGRAPH_CLASS}>
              {paragraph}
            </p>
          ))}

          {/* Suggested questions — tap to prefill the AI chat (placeholder for now) */}
          <h3 className={SUBSECTION_TITLE_CLASS}>{advisor.questionsTitle}</h3>
          <BorrowerQuestionsList />

          <AiChatCta label={advisor.ctaLabel} className="mt-2" />
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default MatchedByAiSection;
