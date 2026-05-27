'use client';

/**
 * Why Choose TrustFin for Your Gold Loan — 5 benefit cards in a 2-column grid.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle } from '@/components/shared';
import GoldBenefitCard from './gold-benefit-card';
import { GOLD_WHY_CHOOSE_ITEMS, GOLD_WHY_CHOOSE_SECTION } from './constants';

const GoldWhyChooseSection = (): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-6 custom-text-black text-left font-semibold">
          {GOLD_WHY_CHOOSE_SECTION.title}
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GOLD_WHY_CHOOSE_ITEMS.map((item, index) => (
            <GoldBenefitCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default GoldWhyChooseSection;
