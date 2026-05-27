/**
 * PersonalLoanInfoAccordion
 * Thin composer rendering the personal-loan info accordion list.
 */

import { JSX } from 'react';
import { SectionWrapper } from '@/components/shared';
import InfoAccordionList from './info-accordion-list';
import {
  PERSONAL_LOAN_INFO_ACCORDION_DEFAULT_OPEN,
  PERSONAL_LOAN_INFO_ACCORDION_ITEMS,
  type PersonalLoanInfoAccordionItem,
} from '../constants';

interface PersonalLoanInfoAccordionProps {
  items?: PersonalLoanInfoAccordionItem[];
  defaultOpen?: string[];
}

const PersonalLoanInfoAccordion = ({
  items = PERSONAL_LOAN_INFO_ACCORDION_ITEMS,
  defaultOpen = PERSONAL_LOAN_INFO_ACCORDION_DEFAULT_OPEN,
}: PersonalLoanInfoAccordionProps): JSX.Element => {
  return (
    <SectionWrapper>
      <div
      >
        <InfoAccordionList items={items} defaultOpen={defaultOpen} />
      </div>
    </SectionWrapper>
  );
};

export default PersonalLoanInfoAccordion;

