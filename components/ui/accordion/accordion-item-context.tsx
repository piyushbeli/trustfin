'use client';

/**
 * AccordionItemContext
 * Item-scoped context so the trigger and content can share the
 * item's value and expanded state without prop drilling.
 */

import { createContext, useContext } from 'react';

export interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  contentId: string;
  triggerId: string;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export const useAccordionItemContext = (): AccordionItemContextValue => {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error('AccordionTrigger/AccordionContent must be inside <AccordionItem>');
  }
  return ctx;
};
