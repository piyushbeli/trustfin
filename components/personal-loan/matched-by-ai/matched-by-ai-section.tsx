'use client';

/**
 * MatchedByAiSection
 * Loan product AI matching content section. Thin composer over the
 * heading, intro copy, difference subsection (with the 2x2 AI feature grid),
 * and the "Ask the AI" advisor subsection.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, AiChatCta } from '@/components/shared';
import MatchedByAiHeading from './matched-by-ai-heading';
import AiFeaturesGrid from './ai-features-grid';
import BorrowerQuestionsList from './borrower-questions-list';
import {
  AI_MATCHED_SECTION,
  AI_BORROWER_QUESTIONS,
  AI_MATCHED_FEATURES,
  type AiFeatureItem,
  type BorrowerQuestionItem,
} from '../constants';

const SUBSECTION_TITLE_CLASS = 'text-base font-bold custom-text-black mb-2';
const BODY_PARAGRAPH_CLASS = 'text-sm custom-text-black leading-5';

export interface AiMatchedSectionConfig {
  titleLead: string;
  titleHighlight: string;
  intro: {
    lead: string;
    emphasis: string;
    closing: string;
  };
  difference: {
    title: string;
    paragraphs: readonly string[];
    featuresTitle: string;
  };
  advisor: {
    title: string;
    paragraphs: readonly string[];
    questionsTitle: string;
    closing: string;
    ctaLabel: string;
  };
}

interface MatchedByAiSectionProps {
  sectionConfig?: AiMatchedSectionConfig;
  features?: AiFeatureItem[];
  questions?: BorrowerQuestionItem[];
}

const MatchedByAiSection = ({
  sectionConfig = AI_MATCHED_SECTION as AiMatchedSectionConfig,
  features = AI_MATCHED_FEATURES,
  questions = AI_BORROWER_QUESTIONS,
}: MatchedByAiSectionProps): JSX.Element => {
  const { intro, difference, advisor } = sectionConfig;

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="space-y-3">
          <MatchedByAiHeading
            titleLead={sectionConfig.titleLead}
            titleHighlight={sectionConfig.titleHighlight}
          />
          <p className={BODY_PARAGRAPH_CLASS}>
            {intro.lead}{' '}
            <span className="font-semibold italic custom-text-black">{intro.emphasis}</span>{' '}
            {intro.closing}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className={SUBSECTION_TITLE_CLASS}>{difference.title}</h2>
          {difference.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={BODY_PARAGRAPH_CLASS}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className={SUBSECTION_TITLE_CLASS}>{difference.featuresTitle}</h3>
          <AiFeaturesGrid features={features} />
        </div>

        <div className="space-y-3">
          <h2 className={SUBSECTION_TITLE_CLASS}>{advisor.title}</h2>
          {advisor.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={BODY_PARAGRAPH_CLASS}>
              {paragraph}
            </p>
          ))}

          <h3 className={SUBSECTION_TITLE_CLASS}>{advisor.questionsTitle}</h3>
          <BorrowerQuestionsList questions={questions} />
          <div className="flex justify-center">
            <AiChatCta label={advisor.ctaLabel} className="mt-2 custom-cta-button" />
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default MatchedByAiSection;
