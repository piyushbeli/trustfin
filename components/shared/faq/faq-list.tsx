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

interface FaqListProps {
  items: FaqItem[];
  className?: string;
}

const FaqList = ({ items, className }: FaqListProps): JSX.Element => {
  return (
    <Accordion type="multiple" className={className}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
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
