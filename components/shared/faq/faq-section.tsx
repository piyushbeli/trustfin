'use client';

/**
 * FaqSection
 * Thin section wrapper that pairs a section title with a FaqList.
 * Defaults to STANDARD_FAQS so existing callers stay unchanged.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle } from '@/components/shared/section';
import { STANDARD_FAQS, type FaqItem } from '@/lib/constants/faqs';
import FaqList from './faq-list';

interface FaqSectionProps {
  items?: FaqItem[];
  title?: string;
  className?: string;
}

const FaqSection = ({
  items = STANDARD_FAQS,
  title = 'Frequently Asked Questions',
  className,
}: FaqSectionProps): JSX.Element => {
  return (
    <SectionWrapper className={className}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-4">{title}</SectionTitle>
        <FaqList items={items} />
      </motion.div>
    </SectionWrapper>
  );
};

export default FaqSection;
