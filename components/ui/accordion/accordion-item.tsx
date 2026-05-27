'use client';

/**
 * AccordionItem
 * Single row of the accordion. Provides item-scoped context so its
 * trigger/content can read the open state without prop drilling.
 */

import { JSX, ReactNode, useId, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useAccordionContext } from './accordion-context';
import {
  AccordionItemContext,
  type AccordionItemContextValue,
} from './accordion-item-context';

interface AccordionItemProps {
  children: ReactNode;
  /** Unique value identifying this item within the parent Accordion */
  value: string;
  className?: string;
}

const AccordionItem = ({ children, value, className }: AccordionItemProps): JSX.Element => {
  const { openValues } = useAccordionContext();
  const reactId = useId();
  const isExpanded = openValues.has(value);

  const itemContext = useMemo<AccordionItemContextValue>(
    () => ({
      value,
      isExpanded,
      contentId: `accordion-content-${reactId}`,
      triggerId: `accordion-trigger-${reactId}`,
    }),
    [value, isExpanded, reactId],
  );

  return (
    <AccordionItemContext.Provider value={itemContext}>
      <div className={cn('border-b border-gray-200 last:border-b-0', className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
