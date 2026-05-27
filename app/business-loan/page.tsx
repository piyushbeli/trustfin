/**
 * Business Loan Landing Page - Server Component
 * Marketing content for business loans; apply flow at /business-loan/apply.
 */

import React from 'react';
import HeroSection from '@/components/personal-loan/hero-section';
import EmiCalculator from '@/components/personal-loan/emi-calculator';
import HowToApplySteps from '@/components/personal-loan/how-to-apply-steps';
import { MatchedByAiSection } from '@/components/personal-loan/matched-by-ai';
import { FaqSection } from '@/components/shared';
import { PartnersSection, TrendingOffersClient } from '@/components/home';
import EligibilityList from '@/components/personal-loan/eligibility/eligibility-list';
import { PersonalLoanInfoAccordion } from '@/components/personal-loan/info-accordion';
import FaqFooterSection from '@/components/personal-loan/faq-footer-section';
import BusinessHeroCta from '@/components/business-loan/landing/business-hero-cta';
import BusinessStepsCta from '@/components/business-loan/landing/business-steps-cta';
import BusinessEligibilityCta from '@/components/business-loan/landing/business-eligibility-cta';
import BusinessDocumentsRequired from '@/components/business-loan/landing/business-documents-required';
import BusinessStickyApplyButton from '@/components/business-loan/landing/business-sticky-apply-button';
import {
  BUSINESS_AI_BORROWER_QUESTIONS,
  BUSINESS_AI_MATCHED_FEATURES,
  BUSINESS_AI_MATCHED_SECTION,
  BUSINESS_EMI_CALCULATOR_CONFIG,
  BUSINESS_ELIGIBILITY_CRITERIA,
  BUSINESS_ELIGIBILITY_SECTION_INFO,
  BUSINESS_HERO_COPY,
  BUSINESS_HERO_STATS,
  BUSINESS_HOW_TO_APPLY_STEPS,
  BUSINESS_LOAN_INFO_ACCORDION_DEFAULT_OPEN,
  BUSINESS_LOAN_INFO_ACCORDION_ITEMS,
} from '@/components/business-loan/landing/constants';
import { BUSINESS_LOAN_FAQS } from '@/lib/constants/business-loan-faqs';

const BUSINESS_ELIGIBILITY_DESCRIPTION = `${BUSINESS_ELIGIBILITY_SECTION_INFO.description} ${BUSINESS_ELIGIBILITY_SECTION_INFO.footer}`;

const BusinessLoanPage = (): React.ReactNode => {
  return (
    <div className="min-h-screen">
      <HeroSection
        productLabel={BUSINESS_HERO_COPY.productLabel}
        subtitle={BUSINESS_HERO_COPY.subtitle}
        stats={BUSINESS_HERO_STATS}
        secondaryCtaLabel={BUSINESS_HERO_COPY.secondaryCta}
        PrimaryCta={BusinessHeroCta}
      />

      <div className="px-4 pb-4 max-w-3xl mx-auto">
        <EmiCalculator
          title="Business Loan EMI Calculator"
          config={BUSINESS_EMI_CALCULATOR_CONFIG}
        />
      </div>

      <TrendingOffersClient heading="Business Loan Offers and Interest Rates" />

      <MatchedByAiSection
        sectionConfig={BUSINESS_AI_MATCHED_SECTION}
        features={BUSINESS_AI_MATCHED_FEATURES}
        questions={BUSINESS_AI_BORROWER_QUESTIONS}
      />

      {/* <VideoSection config={BUSINESS_VIDEO_CONFIG} /> */}

      <HowToApplySteps
        sectionTitle="How to Apply for a Business Loan on TrustFin"
        steps={BUSINESS_HOW_TO_APPLY_STEPS}
        StepsCtaComponent={BusinessStepsCta}
      />

      <EligibilityList
        title={BUSINESS_ELIGIBILITY_SECTION_INFO.title}
        description={BUSINESS_ELIGIBILITY_DESCRIPTION}
        criteria={BUSINESS_ELIGIBILITY_CRITERIA}
      />

      <BusinessEligibilityCta />

      <BusinessDocumentsRequired />

      <PersonalLoanInfoAccordion
        items={BUSINESS_LOAN_INFO_ACCORDION_ITEMS}
        defaultOpen={BUSINESS_LOAN_INFO_ACCORDION_DEFAULT_OPEN}
      />

      <PartnersSection />

      <FaqSection items={BUSINESS_LOAN_FAQS} />

      <FaqFooterSection />

      <BusinessStickyApplyButton />
    </div>
  );
};

export default BusinessLoanPage;
