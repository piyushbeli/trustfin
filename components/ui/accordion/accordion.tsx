'use client';

/**
 * Accordion
 * Root provider for the accordion compound component.
 * Owns the open-items state and exposes a toggle through context.
 */

import { JSX, ReactNode, useCallback, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  AccordionContext,
  type AccordionContextValue,
  type AccordionType,
} from './accordion-context';

interface AccordionProps {
  children: ReactNode;
  /** Toggle behaviour. Defaults to "multiple" so several items can stay open. */
  type?: AccordionType;
  /** Item values that should be open on first render */
  defaultValue?: string[];
  className?: string;
}

const Accordion = ({
  children,
  type = 'multiple',
  defaultValue,
  className,
}: AccordionProps): JSX.Element => {
  const [openValues, setOpenValues] = useState<Set<string>>(
    () => new Set(defaultValue ?? []),
  );

  const toggle = useCallback(
    (value: string): void => {
      setOpenValues((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
          return next;
        }
        // Single-mode keeps only the newly opened item.
        if (type === 'single') {
          return new Set([value]);
        }
        next.add(value);
        return next;
      });
    },
    [type],
  );

  const value = useMemo<AccordionContextValue>(
    () => ({ type, openValues, toggle }),
    [type, openValues, toggle],
  );

  return (
    <AccordionContext.Provider value={value}>
      <div className={cn('w-full', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export default Accordion;
