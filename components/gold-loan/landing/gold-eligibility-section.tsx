'use client';

/**
 * GoldEligibilitySection
 * Eligibility criteria table for gold loan.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle, SectionDescription } from '@/components/shared';
import GoldDataTable from './gold-data-table';
import {
  GOLD_ELIGIBILITY_SECTION,
  GOLD_ELIGIBILITY_TABLE_ROWS,
} from './constants';

const GoldEligibilitySection = (): JSX.Element => {
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
          {GOLD_ELIGIBILITY_SECTION.title}
        </SectionTitle>

        <SectionDescription align="left" className="custom-text-black">
          {GOLD_ELIGIBILITY_SECTION.intro}
        </SectionDescription>

        <GoldDataTable rows={GOLD_ELIGIBILITY_TABLE_ROWS} />

        <SectionDescription align="left" className="custom-text-black">
          {GOLD_ELIGIBILITY_SECTION.footerNote}
        </SectionDescription>
      </motion.div>
    </SectionWrapper>
  );
};

export default GoldEligibilitySection;
