'use client';

/**
 * Features and benefits of TrustFin home loan — 9 feature cards in a 2-column grid.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle, SectionDescription } from '@/components/shared';
import HomeBenefitCard from './home-benefit-card';
import { HOME_FEATURES_ITEMS, HOME_FEATURES_SECTION } from './constants';

const HomeFeaturesSection = (): JSX.Element => {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle className="mb-6 custom-text-black text-left font-semibold">
          {HOME_FEATURES_SECTION.title}
        </SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          {HOME_FEATURES_ITEMS.map((item, index) => (
            <HomeBenefitCard key={item.id} item={item} index={index} />
          ))}
        </div>
        <SectionDescription align="left" className="mt-6 custom-text-black text-sm">
          {HOME_FEATURES_SECTION.footerNote}
        </SectionDescription>
      </motion.div>
    </SectionWrapper>
  );
};

export default HomeFeaturesSection;
