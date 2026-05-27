'use client';

/**
 * PersonalLoanInfoAccordion
 * Thin composer rendering the personal-loan info accordion list.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared';
import InfoAccordionList from './info-accordion-list';

const PersonalLoanInfoAccordion = (): JSX.Element => {
  return (
    <SectionWrapper innerClassName="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <InfoAccordionList />
      </motion.div>
    </SectionWrapper>
  );
};

export default PersonalLoanInfoAccordion;

