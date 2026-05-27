'use client';

/**
 * EligibilityList
 * Vertical stack of EligibilityCards driven by the constants file.
 */

import { JSX } from 'react';
import EligibilityCard from './eligibility-card';
import { SectionDescription, SectionTitle, SectionWrapper } from '@/components/shared';
import { ELIGIBILITY_CRITERIA } from '../constants';
import { motion } from 'framer-motion';

const EligibilityList = (): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-2 custom-text-black text-left font-semibold">Eligibility Criteria</SectionTitle>
        <SectionDescription className="mb-6 custom-text-black text-left">These are general eligibility guidelines. The actual requirements vary by lender, and TrustFin's AI will show you only the lenders whose criteria match your profile.</SectionDescription>
        {ELIGIBILITY_CRITERIA.map((item, index) => (
          <EligibilityCard key={item.id} item={item} index={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default EligibilityList;
