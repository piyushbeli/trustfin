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
import { HOW_TO_APPLY_STEPS, type StepItem } from './constants';
import type { ComponentType } from 'react';

interface HowToApplyStepsProps {
  sectionTitle?: string;
  steps?: StepItem[];
  StepsCtaComponent?: ComponentType;
}

const HowToApplySteps = ({
  sectionTitle = 'How to Apply for Personal Loan Online?',
  steps = HOW_TO_APPLY_STEPS,
  StepsCtaComponent,
}: HowToApplyStepsProps): JSX.Element => {
  const CtaComponent = StepsCtaComponent ?? StepsCta;

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-2 custom-text-black text-left text-xl font-semibold">
          {sectionTitle}
        </SectionTitle>
        <StepsTimeline steps={steps} />
        <div className="flex justify-center">
        <CtaComponent />
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default HowToApplySteps;
