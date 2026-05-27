'use client';

/**
 * StepRow
 * Single step in the "How to Apply" timeline. Renders an icon column with
 * an optional connector and the step title + description on the right.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import type { StepItem } from '../constants';

interface StepRowProps {
  step: StepItem;
  index: number;
  isLast: boolean;
}

const StepRow = ({ step, index }: StepRowProps): JSX.Element => {

  return (
    <motion.div
      className="relative flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex-1 pt-1 pb-3">
        <p className="text-sm font-medium text-brand-primary mb-2">{step.title}</p>
        <p className="text-sm custom-text-black leading-5">{step.description}</p>
      </div>
    </motion.div>
  );
};

export default StepRow;
