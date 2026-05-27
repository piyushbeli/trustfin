'use client';

/**
 * FaqList
 * Renders a list of FAQ items inside a multi-open Accordion.
 * Kept presentation-only so it can be reused outside the standard FaqSection.
 */

import { JSX } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import type { FaqItem } from '@/lib/constants/faqs';
import { cn } from '@/lib/utils';

interface FaqListProps {
  items: FaqItem[];
  className?: string;
}

const FAQ_ITEM_CLASS =
  'mb-3 overflow-hidden rounded-xl border border-brand-primary px-2 last:mb-0 last:!border-b';

const FaqList = ({ items, className }: FaqListProps): JSX.Element => {
  return (
    <Accordion type="multiple" className={cn('pb-px', className)}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className={FAQ_ITEM_CLASS}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="whitespace-pre-line">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqList;
