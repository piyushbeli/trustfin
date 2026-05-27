/**
 * GoldEligibilitySection
 * Eligibility criteria table for gold loan.
 */

import { JSX } from 'react';
import { SectionWrapper, SectionTitle, SectionDescription } from '@/components/shared';
import GoldDataTable from './gold-data-table';
import {
  GOLD_ELIGIBILITY_SECTION,
  GOLD_ELIGIBILITY_TABLE_ROWS,
} from './constants';

const GoldEligibilitySection = (): JSX.Element => {
  return (
    <SectionWrapper>
      <div
        className="space-y-4"
      >
        <SectionTitle className="custom-text-black text-left font-semibold">
          {GOLD_ELIGIBILITY_SECTION.title}
        </SectionTitle>

        <SectionDescription align="left" className="custom-text-black">
          {GOLD_ELIGIBILITY_SECTION.intro}
        </SectionDescription>

        <GoldDataTable rows={GOLD_ELIGIBILITY_TABLE_ROWS} />

        <SectionDescription align="left" className="custom-text-black">
          {GOLD_ELIGIBILITY_SECTION.footerNote}
        </SectionDescription>
      </div>
    </SectionWrapper>
  );
};

export default GoldEligibilitySection;
