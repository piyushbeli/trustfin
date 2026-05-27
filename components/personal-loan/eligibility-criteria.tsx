/**
 * EligibilityCriteria
 * Lists personal loan eligibility requirements. Thin composer over the
 * eligibility leaf components and shared section atoms.
 */

import { JSX } from 'react';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared';
import EligibilityList from './eligibility/eligibility-list';
import { ELIGIBILITY_SECTION_INFO } from './constants';

const EligibilityCriteria = (): JSX.Element => {
  return (
    <SectionWrapper>
      <div
      >
        <SectionTitle className="mb-2">{ELIGIBILITY_SECTION_INFO.title}</SectionTitle>
        <SectionDescription className="mb-6">
          {ELIGIBILITY_SECTION_INFO.description}
        </SectionDescription>
        <EligibilityList />
      </div>
    </SectionWrapper>
  );
};

export default EligibilityCriteria;
