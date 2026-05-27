'use client';

/**
 * PersonalLoanInfoAccordion
 * Thin composer rendering the personal-loan info accordion list.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared';
import InfoAccordionList from './info-accordion-list';
import {
  PERSONAL_LOAN_INFO_ACCORDION_DEFAULT_OPEN,
  PERSONAL_LOAN_INFO_ACCORDION_ITEMS,
  type PersonalLoanInfoAccordionItem,
} from '../constants';

interface PersonalLoanInfoAccordionProps {
  items?: PersonalLoanInfoAccordionItem[];
  defaultOpen?: string[];
}

const PersonalLoanInfoAccordion = ({
  items = PERSONAL_LOAN_INFO_ACCORDION_ITEMS,
  defaultOpen = PERSONAL_LOAN_INFO_ACCORDION_DEFAULT_OPEN,
}: PersonalLoanInfoAccordionProps): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <InfoAccordionList items={items} defaultOpen={defaultOpen} />
      </motion.div>
    </SectionWrapper>
  );
};

export default PersonalLoanInfoAccordion;

