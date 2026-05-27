'use client';

/**
 * GoldBenefitCard
 * Single benefit tile with title and description for gold loan landing sections.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import type { GoldBenefitItem } from './constants';

interface GoldBenefitCardProps {
  item: GoldBenefitItem;
  index: number;
}

const GoldBenefitCard = ({ item, index }: GoldBenefitCardProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div>
        <p className="text-sm font-medium text-primary mb-1">{item.title}</p>
        <p className="text-sm font-normal custom-text-black">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default GoldBenefitCard;
