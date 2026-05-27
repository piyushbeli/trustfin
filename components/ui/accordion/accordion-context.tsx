'use client';

/**
 * AccordionContext
 * Shared state for Accordion primitives. Tracks which items are expanded
 * and exposes a toggle helper to children. Supports two modes:
 *  - "multiple" (default): any number of items can be open at once
 *  - "single": opening one item closes the others
 */

import { createContext, useContext } from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionContextValue {
  type: AccordionType;
  openValues: Set<string>;
  toggle: (value: string) => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

/**
 * Hook for accordion children to read open state and toggle items.
 * Throws if used outside an Accordion root to surface integration bugs early.
 */
export const useAccordionContext = (): AccordionContextValue => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('Accordion subcomponents must be used inside <Accordion>');
  }
  return ctx;
};
