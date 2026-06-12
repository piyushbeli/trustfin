/**
 * Home Loan Landing Page - Server Component
 * Marketing content for home loans; apply flow at /home-loan/apply.
 */

import React from 'react';
import HeroSection from '@/components/personal-loan/hero-section';
import HowToApplySteps from '@/components/personal-loan/how-to-apply-steps';
import { FaqSection } from '@/components/shared';
import { PartnersSection } from '@/components/home';
import FaqFooterSection from '@/components/personal-loan/faq-footer-section';
import HomeHeroCta from '@/components/home-loan/landing/home-hero-cta';
import HomeStepsCta from '@/components/home-loan/landing/home-steps-cta';
import HomeEligibilityCta from '@/components/home-loan/landing/home-eligibility-cta';
import HomeStickyApplyButton from '@/components/home-loan/landing/home-sticky-apply-button';
import HomeWhyChooseSection from '@/components/home-loan/landing/home-why-choose-section';
import HomeFeaturesSection from '@/components/home-loan/landing/home-features-section';
import HomeEligibilityDocumentsSection from '@/components/home-loan/landing/home-eligibility-documents-section';
import {
  HOME_HERO_COPY,
  HOME_HERO_STATS,
  HOME_HOW_TO_APPLY_SECTION,
  HOME_HOW_TO_APPLY_STEPS,
} from '@/components/home-loan/landing/constants';
import { HOME_LOAN_FAQS } from '@/lib/constants/home-loan-faqs';

const HomeLoanPage = (): React.ReactNode => {
  return (
    <div className="min-h-screen">
      <HeroSection
        productLabel={HOME_HERO_COPY.productLabel}
        subtitle={HOME_HERO_COPY.subtitle}
        stats={HOME_HERO_STATS}
        secondaryCtaLabel={HOME_HERO_COPY.secondaryCta}
      />

      <HomeWhyChooseSection />

      <HomeFeaturesSection />

      <HomeEligibilityDocumentsSection />

      <HowToApplySteps
        sectionTitle={HOME_HOW_TO_APPLY_SECTION.title}
        steps={HOME_HOW_TO_APPLY_STEPS}
        StepsCtaComponent={HomeStepsCta}
      />
      
      {/* <PartnersSection /> */}

      <FaqSection items={HOME_LOAN_FAQS} />

      <FaqFooterSection hideDisclaimer={true} />

      <HomeStickyApplyButton />
    </div>
  );
};

export default HomeLoanPage;
