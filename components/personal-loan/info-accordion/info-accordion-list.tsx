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

const InfoAccordionList = (): JSX.Element => {
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={PERSONAL_LOAN_INFO_ACCORDION_DEFAULT_OPEN}
    >
      {PERSONAL_LOAN_INFO_ACCORDION_ITEMS.map(
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

