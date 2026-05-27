'use client';

/**
 * GoldLoanAmountSection
 * Illustrative LTV table with CTA that scrolls to the EMI calculator.
 */

import { JSX, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle, SectionDescription } from '@/components/shared';
import GoldMultiColumnTable from './gold-multi-column-table';
import GoldApplyButton from './gold-apply-button';
import {
  GOLD_EMI_CALCULATOR_ID,
  GOLD_LOAN_AMOUNT_SECTION,
  GOLD_LTV_ILLUSTRATION_TABLE,
} from './constants';

const GoldLoanAmountSection = (): JSX.Element => {
  const scrollToCalculator = useCallback((): void => {
    const calculator = document.getElementById(GOLD_EMI_CALCULATOR_ID);
    calculator?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

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
          {GOLD_LOAN_AMOUNT_SECTION.title}
        </SectionTitle>

        <SectionDescription align="left" className="custom-text-black">
          {GOLD_LOAN_AMOUNT_SECTION.intro}
        </SectionDescription>

        <p className="text-sm font-medium custom-text-black">
          {GOLD_LOAN_AMOUNT_SECTION.tableTitle}
        </p>

        <GoldMultiColumnTable
          headers={GOLD_LTV_ILLUSTRATION_TABLE.headers}
          rows={GOLD_LTV_ILLUSTRATION_TABLE.rows}
        />

        <SectionDescription align="left" className="custom-text-black">
          {GOLD_LOAN_AMOUNT_SECTION.footerNote}
        </SectionDescription>

        <SectionDescription align="left" className="custom-text-black">
          {GOLD_LOAN_AMOUNT_SECTION.calculatorNote}
        </SectionDescription>

        <GoldApplyButton
          label={GOLD_LOAN_AMOUNT_SECTION.ctaLabel}
          onClick={scrollToCalculator}
        />
      </motion.div>
    </SectionWrapper>
  );
};

export default GoldLoanAmountSection;
