'use client';

/**
 * AiFeatureCard
 * Single tile in the "What the AI handles for you" 2x2 grid.
 * Mirrors the entrance animation used in BenefitCard but with a bordered,
 * tinted style matching the section design.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import type { AiFeatureItem } from '../constants';

interface AiFeatureCardProps {
  feature: AiFeatureItem;
  index: number;
}

const AiFeatureCard = ({ feature, index }: AiFeatureCardProps): JSX.Element => {
  return (
    <motion.div
      className="rounded-md wc-ai-feature-card p-3"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <p className="text-sm font-normal leading-5 custom-text-black">{feature.text}</p>
    </motion.div>
  );
};

export default AiFeatureCard;
