'use client';

/**
 * EligibilityList
 * Vertical stack of EligibilityCards driven by the constants file.
 */

import { JSX } from 'react';
import EligibilityCard from './eligibility-card';
import { SectionDescription, SectionTitle, SectionWrapper } from '@/components/shared';
import { ELIGIBILITY_CRITERIA, type EligibilityItem } from '../constants';
import { motion } from 'framer-motion';

interface EligibilityListProps {
  title?: string;
  description?: string;
  criteria?: EligibilityItem[];
}

const DEFAULT_ELIGIBILITY_DESCRIPTION =
  "These are general eligibility guidelines. The actual requirements vary by lender, and TrustFin's AI will show you only the lenders whose criteria match your profile.";

const EligibilityList = ({
  title = 'Eligibility Criteria',
  description = DEFAULT_ELIGIBILITY_DESCRIPTION,
  criteria = ELIGIBILITY_CRITERIA,
}: EligibilityListProps): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-2 custom-text-black text-left font-semibold">{title}</SectionTitle>
        <SectionDescription className="mb-6 custom-text-black text-left">{description}</SectionDescription>
        {criteria.map((item, index) => (
          <EligibilityCard key={item.id} item={item} index={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default EligibilityList;
