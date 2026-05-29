'use client';

/**
 * AccordionTrigger
 * Button that toggles its parent AccordionItem. Renders the question text
 * on the left and a brand-colored chevron on the right that rotates when open.
 */

import { JSX, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccordionContext } from './accordion-context';
import { useAccordionItemContext } from './accordion-item-context';

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
  /** Optional class override for the trigger label text. */
  titleClassName?: string;
}

const AccordionTrigger = ({
  children,
  className,
  titleClassName,
}: AccordionTriggerProps): JSX.Element => {
  const { toggle } = useAccordionContext();
  const { value, isExpanded, contentId, triggerId } = useAccordionItemContext();

  return (
    <button
      type="button"
      id={triggerId}
      onClick={() => toggle(value)}
      aria-expanded={isExpanded}
      aria-controls={contentId}
      className={cn(
        'w-full flex items-center justify-between gap-4 py-4 text-left',
        'transition-colors hover:text-brand-primary focus:outline-none',
        className,
      )}
    >
      <span
        className={cn(
          'text-sm font-medium text-gray-900',
          titleClassName,
        )}
      >
        {children}
      </span>
      <ChevronDown
        className={cn(
          'w-5 h-5 shrink-0 text-brand-primary transition-transform duration-300 ease-in-out',
          isExpanded && 'rotate-180',
        )}
      />
    </button>
  );
};

export default AccordionTrigger;
