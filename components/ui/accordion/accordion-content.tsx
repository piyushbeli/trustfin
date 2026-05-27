'use client';

/**
 * AccordionContent
 * Expand/collapse panel paired with an AccordionTrigger.
 * Uses Framer Motion to animate the height transition smoothly.
 */

import { JSX, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAccordionItemContext } from './accordion-item-context';

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps): JSX.Element => {
  const { isExpanded, contentId, triggerId } = useAccordionItemContext();

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={cn('pb-4 pr-8 text-sm text-gray-600 leading-relaxed', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccordionContent;
