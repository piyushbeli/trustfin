/**
 * Personal Loan Landing Page - Server Component
 * Composes the redesigned personal loan landing flow.
 * Interactive logic remains in PersonalLoanContent and other client sections.
 */

import React from 'react';
import HeroSection from '@/components/personal-loan/hero-section';
import EmiCalculator from '@/components/personal-loan/emi-calculator';
import HowToApplySteps from '@/components/personal-loan/how-to-apply-steps';
import { MatchedByAiSection } from '@/components/personal-loan/matched-by-ai';
import { FaqSection } from '@/components/shared';
import { PersonalLoanContent } from '@/components/personal-loan/personal-loan-content';
import StickyApplyButton from '@/components/personal-loan/sticky-apply-button';
import { PartnersSection, TrendingOffersClient } from '@/components/home';
import EligibilityList from '@/components/personal-loan/eligibility/eligibility-list';
import EligibilityCta from '@/components/personal-loan/eligibility/eligibility-cta';
import DocumentsRequired from '@/components/personal-loan/documents-required';
import { PersonalLoanInfoAccordion } from '@/components/personal-loan/info-accordion';
import FaqFooterSection from '@/components/personal-loan/faq-footer-section';

const PersonalLoanPage = (): React.ReactNode => {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <HeroSection />

      {/* EMI Calculator */}
      <div className="px-4 pb-4 max-w-3xl mx-auto">
        <EmiCalculator title="Personal Loan EMI Calculator" />
      </div>

      {/* Trending Offers */}
      <TrendingOffersClient heading="Personal Loan Offers" />

      {/* Matched by AI */}
      <MatchedByAiSection />

      {/* How to Apply Steps */}
      <HowToApplySteps />

      {/* Eligibility List */}
      <EligibilityList />

      {/* Apply CTA shown right after the eligibility rules */}
      <EligibilityCta />

      {/* Documents section shown right after the eligibility CTA */}
      <DocumentsRequired />

      {/* Personal Loan Info accordion (Interest Rates, Fees & Charges, Why TrustFin) */}
      <PersonalLoanInfoAccordion />

      {/* Our Partners Section */}
      {/* <PartnersSection /> */}


      {/* FAQ Section */}
      <FaqSection />

      {/* Ask AI CTA + legal disclaimer */}
      <FaqFooterSection />

      {/* Personal Loan Content */}
      <PersonalLoanContent />

      {/* Sticky Apply Button */}
      <StickyApplyButton />
    </div>
  );
};

export default PersonalLoanPage;
