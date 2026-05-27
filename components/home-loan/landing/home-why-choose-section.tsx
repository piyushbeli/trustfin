/**
 * Why choose TrustFin Home Loan — 6 benefit cards in a 2-column grid.
 */

import { JSX } from 'react';
import { SectionWrapper, SectionTitle } from '@/components/shared';
import HomeBenefitCard from './home-benefit-card';
import { HOME_WHY_CHOOSE_ITEMS, HOME_WHY_CHOOSE_SECTION } from './constants';

const HomeWhyChooseSection = (): JSX.Element => {
  return (
    <SectionWrapper>
      <div
      >
        <SectionTitle className="mb-6 custom-text-black text-left font-semibold">
          {HOME_WHY_CHOOSE_SECTION.title}
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOME_WHY_CHOOSE_ITEMS.map((item, index) => (
            <HomeBenefitCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HomeWhyChooseSection;
