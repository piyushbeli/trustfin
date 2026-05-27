/**
 * Gold Loan Landing Page - Server Component
 * Marketing content for gold loans; apply flow at /gold-loan/apply.
 */

import React from 'react';
import HeroSection from '@/components/personal-loan/hero-section';
import EmiCalculator from '@/components/personal-loan/emi-calculator';
import HowToApplySteps from '@/components/personal-loan/how-to-apply-steps';
import { FaqSection } from '@/components/shared';
import { PartnersSection, TrendingOffersClient } from '@/components/home';
import FaqFooterSection from '@/components/personal-loan/faq-footer-section';
import GoldHeroCta from '@/components/gold-loan/landing/gold-hero-cta';
import GoldStepsCta from '@/components/gold-loan/landing/gold-steps-cta';
import GoldStickyApplyButton from '@/components/gold-loan/landing/gold-sticky-apply-button';
import GoldProseSection from '@/components/gold-loan/landing/gold-prose-section';
import GoldAskAiSection from '@/components/gold-loan/landing/gold-ask-ai-section';
import GoldLoanAmountSection from '@/components/gold-loan/landing/gold-loan-amount-section';
import GoldEligibilitySection from '@/components/gold-loan/landing/gold-eligibility-section';
import GoldDocumentsSection from '@/components/gold-loan/landing/gold-documents-section';
import { PersonalLoanInfoAccordion } from '@/components/personal-loan/info-accordion';
import {
  GOLD_BORROW_SMARTER_SECTION,
  GOLD_EMI_CALCULATOR_CONFIG,
  GOLD_EMI_CALCULATOR_ID,
  GOLD_HERO_COPY,
  GOLD_HERO_STATS,
  GOLD_HOW_TO_APPLY_SECTION,
  GOLD_HOW_TO_APPLY_STEPS,
  GOLD_HOW_TRUSTFIN_HELPS_SECTION,
  GOLD_LOAN_DISCLAIMER,
  GOLD_LOAN_INFO_ACCORDION_DEFAULT_OPEN,
  GOLD_LOAN_INFO_ACCORDION_ITEMS,
  GOLD_WHAT_IS_SECTION,
} from '@/components/gold-loan/landing/constants';
import { GOLD_LOAN_FAQS } from '@/lib/constants/gold-loan-faqs';

const GoldLoanPage = (): React.ReactNode => {
  return (
    <div className="min-h-screen pb-24">
      <HeroSection
        productLabel={GOLD_HERO_COPY.productLabel}
        subtitle={GOLD_HERO_COPY.subtitle}
        stats={GOLD_HERO_STATS}
        secondaryCtaLabel={GOLD_HERO_COPY.secondaryCta}
      />

      <TrendingOffersClient heading="Gold Loan Offers and Interest Rates" />

      <GoldProseSection config={GOLD_BORROW_SMARTER_SECTION} />

      {/* <VideoSection config={GOLD_VIDEO_CONFIG} /> */}

      <GoldProseSection config={GOLD_WHAT_IS_SECTION} />

      <GoldProseSection config={GOLD_HOW_TRUSTFIN_HELPS_SECTION} />

      <GoldAskAiSection />

      <HowToApplySteps
        sectionTitle={GOLD_HOW_TO_APPLY_SECTION.title}
        steps={GOLD_HOW_TO_APPLY_STEPS}
        StepsCtaComponent={GoldStepsCta}
      />

      <GoldLoanAmountSection />

      <div id={GOLD_EMI_CALCULATOR_ID} className="px-4 pb-4 max-w-3xl mx-auto">
        <EmiCalculator
          title="Gold Loan EMI Calculator"
          config={GOLD_EMI_CALCULATOR_CONFIG}
        />
      </div>

      <GoldEligibilitySection />

      <GoldDocumentsSection />

      <PersonalLoanInfoAccordion
        items={GOLD_LOAN_INFO_ACCORDION_ITEMS}
        defaultOpen={GOLD_LOAN_INFO_ACCORDION_DEFAULT_OPEN}
      />

      <PartnersSection />
      <FaqSection items={GOLD_LOAN_FAQS} />

      <FaqFooterSection disclaimer={GOLD_LOAN_DISCLAIMER} />

      <GoldStickyApplyButton />
    </div>
  );
};

export default GoldLoanPage;
