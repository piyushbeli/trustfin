/**
 * Combined eligibility criteria and documents required section for home loan.
 */

import { JSX } from 'react';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared';
import EligibilityCard from '@/components/personal-loan/eligibility/eligibility-card';
import DocumentGroupHeading from '@/components/personal-loan/documents/document-group-heading';
import DocumentList from '@/components/personal-loan/documents/document-list';
import {
  HOME_ELIGIBILITY_CRITERIA,
  HOME_ELIGIBILITY_SECTION,
  HOME_DOCUMENTS,
} from './constants';
import EligibilityCta from '@/components/personal-loan/eligibility/eligibility-cta';

const HomeEligibilityDocumentsSection = (): JSX.Element => {
  return (
    <SectionWrapper>
      <div
      >
        <SectionTitle className="mb-2 custom-text-black text-left font-semibold">
          {HOME_ELIGIBILITY_SECTION.title}
        </SectionTitle>
        <SectionDescription align="left" className="mb-6 custom-text-black">
          {HOME_ELIGIBILITY_SECTION.intro}
        </SectionDescription>

        <div className="mb-6">
          {HOME_ELIGIBILITY_CRITERIA.map((item, index) => (
            <EligibilityCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <EligibilityCta />
        <SectionTitle className="mb-2 custom-text-black text-left font-semibold">
          {HOME_ELIGIBILITY_SECTION.documentsHeading}
        </SectionTitle>
        <DocumentGroupHeading>{HOME_ELIGIBILITY_SECTION.eligibilityHeading}</DocumentGroupHeading>
        <DocumentList documents={HOME_DOCUMENTS} />

      </div>
    </SectionWrapper>
  );
};

export default HomeEligibilityDocumentsSection;
