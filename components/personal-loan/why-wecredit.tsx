'use client';

/**
 * WhyWeCredit
 * "Why Choose WeCredit" section. Thin composer using shared section atoms
 * and the BenefitsGrid leaf component.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle } from '@/components/shared';
import BenefitsGrid from './benefits/benefits-grid';

const WhyWeCredit = (): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-6">Why Choose WeCredit</SectionTitle>
        <BenefitsGrid />
      </motion.div>
    </SectionWrapper>
  );
};

export default WhyWeCredit;
