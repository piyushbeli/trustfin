'use client';

/**
 * HowToApplySteps
 * Section that explains the personal loan application flow as a
 * compact timeline followed by a primary CTA.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared';
import StepsTimeline from './steps/steps-timeline';
import StepsCta from './steps/steps-cta';

const HowToApplySteps = (): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-2 text-gray-900/80 text-left text-xl font-semibold">
          How to Apply for Personal Loan Online?
        </SectionTitle>
        <StepsTimeline />
        <StepsCta />
      </motion.div>
    </SectionWrapper>
  );
};

export default HowToApplySteps;
