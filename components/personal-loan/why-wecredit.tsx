/**
 * WhyWeCredit
 * "Why Choose WeCredit" section. Thin composer using shared section atoms
 * and the BenefitsGrid leaf component.
 */

import { JSX } from 'react';
import { SectionWrapper, SectionTitle } from '@/components/shared';
import BenefitsGrid from './benefits/benefits-grid';

const WhyWeCredit = (): JSX.Element => {
  return (
    <SectionWrapper>
      <div
      >
        <SectionTitle className="mb-6">Why Choose WeCredit</SectionTitle>
        <BenefitsGrid />
      </div>
    </SectionWrapper>
  );
};

export default WhyWeCredit;
