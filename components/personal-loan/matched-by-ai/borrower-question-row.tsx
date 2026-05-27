'use client';

/**
 * BorrowerQuestionRow
 * Single suggested-question row in the advisor block. The whole row is a
 * button so the question text and the gradient arrow share one tap target.
 * Click is a placeholder until the AI chat modal ships; the question is
 * captured so it can later be forwarded as a prefill to the modal.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BorrowerQuestionItem } from '../constants';

interface BorrowerQuestionRowProps {
  item: BorrowerQuestionItem;
  index: number;
  /** Invoked with the question text so the parent can route it to the AI modal */
  onAsk: (question: string) => void;
}

const BorrowerQuestionRow = ({
  item,
  index,
  onAsk,
}: BorrowerQuestionRowProps): JSX.Element => {
  const handleClick = (): void => {
    onAsk(item.question);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-between gap-3 rounded-xl bg-brand-50 p-3 text-left transition-colors hover:bg-brand-100 active:scale-[0.99]"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <p className="flex-1 text-sm font-normal leading-5 text-gray-700">
        {item.question}
      </p>
      <span
        className="wc-hero-cta-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        aria-hidden
      >
        <ArrowRight className="h-4 w-4 text-white" />
      </span>
    </motion.button>
  );
};

export default BorrowerQuestionRow;
