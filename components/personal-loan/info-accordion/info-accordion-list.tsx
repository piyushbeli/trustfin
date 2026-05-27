'use client';

/**
 * InfoAccordionList
 * Maps `PERSONAL_LOAN_INFO_ACCORDION_ITEMS` into the shared accordion UI.
 */

import { JSX } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  PERSONAL_LOAN_INFO_ACCORDION_DEFAULT_OPEN,
  PERSONAL_LOAN_INFO_ACCORDION_ITEMS,
  type PersonalLoanInfoAccordionItem,
} from '../constants';
import InfoAccordionPanel from './info-accordion-panel';

interface InfoAccordionListProps {
  items?: PersonalLoanInfoAccordionItem[];
  defaultOpen?: string[];
}

const InfoAccordionList = ({
  items = PERSONAL_LOAN_INFO_ACCORDION_ITEMS,
  defaultOpen = PERSONAL_LOAN_INFO_ACCORDION_DEFAULT_OPEN,
}: InfoAccordionListProps): JSX.Element => {
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={defaultOpen}
    >
      {items.map(
        (item: PersonalLoanInfoAccordionItem) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-0 mb-3 rounded-xl overflow-hidden"
          >
            <AccordionTrigger
              titleClassName="text-base font-semibold"
              className="px-4 bg-brand-primary/5 rounded-xl"
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pr-4 pb-4 pt-4">
              <InfoAccordionPanel panel={item.panel} />
            </AccordionContent>
          </AccordionItem>
        ),
      )}
    </Accordion>
  );
};

export default InfoAccordionList;

