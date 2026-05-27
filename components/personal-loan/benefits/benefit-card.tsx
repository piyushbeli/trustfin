'use client';

/**
 * BenefitCard
 * Single benefit tile used in the "Why Choose WeCredit" grid.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import type { WhyWeCreditSimpleItem } from '../constants';

interface BenefitCardProps {
  benefit: WhyWeCreditSimpleItem;
  index: number;
}

const BenefitCard = ({ benefit, index }: BenefitCardProps): JSX.Element => {
  return (
    <motion.div
      className="h-16 bg-brand-lightest rounded shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="p-2">
        <p className="text-sm font-normal text-gray-700">{benefit.text}</p>
      </div>
    </motion.div>
  );
};

export default BenefitCard;
