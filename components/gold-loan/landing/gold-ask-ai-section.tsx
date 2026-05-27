'use client';

/**
 * GoldAskAiSection
 * AI advisor section with common borrower questions and chat CTA.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle, SectionDescription, AiChatCta } from '@/components/shared';
import BorrowerQuestionsList from '@/components/personal-loan/matched-by-ai/borrower-questions-list';
import {
  GOLD_ASK_AI_SECTION,
  GOLD_AI_BORROWER_QUESTIONS,
} from './constants';

const GoldAskAiSection = (): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <SectionTitle className="custom-text-black text-left font-semibold">
          {GOLD_ASK_AI_SECTION.title}
        </SectionTitle>

        {GOLD_ASK_AI_SECTION.paragraphs.map((paragraph) => (
          <SectionDescription key={paragraph.slice(0, 40)} align="left" className="custom-text-black">
            {paragraph}
          </SectionDescription>
        ))}

        <p className="text-sm font-medium custom-text-black">
          {GOLD_ASK_AI_SECTION.questionsTitle}
        </p>

        <BorrowerQuestionsList questions={GOLD_AI_BORROWER_QUESTIONS} />

        <SectionDescription align="left" className="custom-text-black">
          {GOLD_ASK_AI_SECTION.closing}
        </SectionDescription>

        <AiChatCta label={GOLD_ASK_AI_SECTION.ctaLabel} variant="gradient" />
      </motion.div>
    </SectionWrapper>
  );
};

export default GoldAskAiSection;
