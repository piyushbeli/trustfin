'use client';

/**
 * AccordionContent
 * Expand/collapse panel paired with an AccordionTrigger.
 */

import { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CollapsiblePanel } from '@/components/ui/collapsible-panel';
import { useAccordionItemContext } from './accordion-item-context';

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps): JSX.Element => {
  const { isExpanded, contentId, triggerId } = useAccordionItemContext();

  return (
    <CollapsiblePanel
      id={contentId}
      aria-labelledby={triggerId}
      isExpanded={isExpanded}
    >
      <div className={cn('pb-4 pr-8 text-sm text-gray-600 leading-relaxed', className)}>
        {children}
      </div>
    </CollapsiblePanel>
  );
};

export default AccordionContent;
