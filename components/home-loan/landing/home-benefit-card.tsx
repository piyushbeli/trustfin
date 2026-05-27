'use client';

/**
 * HomeBenefitCard
 * Single benefit/feature tile with title and description for home loan landing sections.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import type { HomeBenefitItem } from './constants';

interface HomeBenefitCardProps {
  item: HomeBenefitItem;
  index: number;
}

const HomeBenefitCard = ({ item, index }: HomeBenefitCardProps): JSX.Element => {
  return (
    <motion.div
      // className="bg-brand-lightest rounded shadow-sm overflow-hidden h-full"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="">
        <p className="text-sm font-medium text-primary mb-1">{item.title}</p>
        <p className="text-sm font-normal custom-text-black">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default HomeBenefitCard;
