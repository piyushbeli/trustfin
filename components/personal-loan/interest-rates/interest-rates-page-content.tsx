/**
 * InterestRatesPageContent
 * Composes all sections for the Personal Loan Interest Rates page (mockup-driven layout).
 */

import { JSX } from 'react';
import {
  FaqList,
  MultiColumnTable,
  SectionTitle,
  SectionWrapper,
} from '@/components/shared';
import EmiCalculator from '@/components/personal-loan/emi-calculator';
import PersonalLoanSubnav from '@/components/personal-loan/subnav/personal-loan-subnav';
import { PERSONAL_LOAN_INTEREST_RATES_FAQS } from '@/lib/constants/personal-loan-interest-rates-faqs';
import InterestRatesHero from './interest-rates-hero';
import InterestRatesCta from './interest-rates-cta';
import RateFactorCards from './rate-factor-cards';
import ProseTipCards from './prose-tip-cards';
import {
  EMI_COMPARISON_ROWS,
  EMI_COMPARISON_TABLE_HEADERS,
  EMI_IMPACT_SECTION,
  FLAT_VS_REDUCING_SECTION,
  LENDER_RATES_SECTION,
  LENDER_RATES_TABLE_HEADERS,
  LOWEST_RATE_SECTION,
  LOWEST_RATE_TIPS,
  PAGE_DISCLAIMER,
  PERSONAL_LOAN_LENDER_RATES,
  PL_INTEREST_RATES_EMI_CALCULATOR_ID,
  PROCESSING_FEE_SECTION,
  RATE_FACTOR_ITEMS,
  RATE_FACTORS_SECTION,
  WHY_TRUSTFIN_SECTION,
} from './constants';

const BODY_CLASS = 'text-sm leading-relaxed text-muted-foreground md:text-base';

const InterestRatesPageContent = (): JSX.Element => {
  return (
    <div className="min-h-screen pb-24 pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="px-4 pt-6 max-w-3xl mx-auto flex flex-col">
          <div className="space-y-8">
            <InterestRatesHero />

            <InterestRatesCta label="Check My Eligible Rate" />

            <SectionWrapper className="py-0 px-0" innerClassName="max-w-none mx-0 px-0">
              <div className="space-y-4">
                <SectionTitle
                  as="h2"
                  className="text-left text-lg font-semibold custom-text-black md:text-xl"
                >
                  {LENDER_RATES_SECTION.title}
                </SectionTitle>
                <MultiColumnTable
                  headers={LENDER_RATES_TABLE_HEADERS}
                  rows={PERSONAL_LOAN_LENDER_RATES}
                  minWidthClassName="min-w-[640px]"
                />
                <p className={BODY_CLASS}>{LENDER_RATES_SECTION.disclaimer}</p>
              </div>
            </SectionWrapper>

            <InterestRatesCta label="See Rates Available For You"  />

            <SectionWrapper className="py-0 px-0" innerClassName="max-w-none mx-0 px-0">
              <div className="space-y-4">
                <SectionTitle as="h2" className="text-left text-lg font-semibold md:text-xl">
                  {EMI_IMPACT_SECTION.title}
                </SectionTitle>
                <p className={BODY_CLASS}>{EMI_IMPACT_SECTION.intro}</p>
                <p className={`${BODY_CLASS} font-medium custom-text-black`}>
                  {EMI_IMPACT_SECTION.exampleLabel}
                </p>
                <MultiColumnTable
                  headers={EMI_COMPARISON_TABLE_HEADERS}
                  rows={EMI_COMPARISON_ROWS}
                  minWidthClassName="min-w-[520px]"
                />
                <p className={BODY_CLASS}>{EMI_IMPACT_SECTION.closing}</p>
              </div>
            </SectionWrapper>

            <InterestRatesCta
              label="Calculate EMI for My Loan Amount"
              scrollToId={PL_INTEREST_RATES_EMI_CALCULATOR_ID}
            />

            <SectionWrapper className="py-0 px-0" innerClassName="max-w-none mx-0 px-0">
              <div className="space-y-4">
                <SectionTitle as="h2" className="text-left text-lg font-semibold md:text-xl">
                  {RATE_FACTORS_SECTION.title}
                </SectionTitle>
                <p className={BODY_CLASS}>{RATE_FACTORS_SECTION.intro}</p>
                <RateFactorCards items={RATE_FACTOR_ITEMS} />
              </div>
            </SectionWrapper>

            <SectionWrapper className="py-0 px-0" innerClassName="max-w-none mx-0 px-0">
              <div className="space-y-4">
                <SectionTitle as="h2" className="text-left text-lg font-semibold md:text-xl">
                  {FLAT_VS_REDUCING_SECTION.title}
                </SectionTitle>
                <p className={BODY_CLASS}>{FLAT_VS_REDUCING_SECTION.intro}</p>
                <div className="rounded-xl border border-brand-primary p-4 space-y-2">
                  <p className="text-sm font-semibold text-brand-primary">
                    {FLAT_VS_REDUCING_SECTION.reducingTitle}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {FLAT_VS_REDUCING_SECTION.reducingBody}
                  </p>
                </div>
                <div className="rounded-xl border border-brand-primary p-4 space-y-2">
                  <p className="text-sm font-semibold text-brand-primary">
                    {FLAT_VS_REDUCING_SECTION.flatTitle}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {FLAT_VS_REDUCING_SECTION.flatBody}
                  </p>
                </div>
                {FLAT_VS_REDUCING_SECTION.footerNotes.map((note) => (
                  <p key={note.slice(0, 40)} className={BODY_CLASS}>
                    {note}
                  </p>
                ))}
              </div>
            </SectionWrapper>

            <SectionWrapper className="py-0 px-0" innerClassName="max-w-none mx-0 px-0">
              <div className="space-y-4">
                <SectionTitle as="h2" className="text-left text-lg font-semibold md:text-xl">
                  {PROCESSING_FEE_SECTION.title}
                </SectionTitle>
                {PROCESSING_FEE_SECTION.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={BODY_CLASS}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </SectionWrapper>

            <SectionWrapper className="py-0 px-0" innerClassName="max-w-none mx-0 px-0">
              <div className="space-y-4">
                <SectionTitle as="h2" className="text-left text-lg font-semibold md:text-xl">
                  {LOWEST_RATE_SECTION.title}
                </SectionTitle>
                <ProseTipCards items={LOWEST_RATE_TIPS} />
              </div>
            </SectionWrapper>

            <InterestRatesCta label="Find the Lowest Rate for My Profile"  />

            <SectionWrapper className="py-0 px-0" innerClassName="max-w-none mx-0 px-0">
              <SectionTitle as="h2" className="mb-4 text-left text-lg font-semibold md:text-xl">
                Frequently Asked Questions
              </SectionTitle> 
              <FaqList items={PERSONAL_LOAN_INTEREST_RATES_FAQS} />
            </SectionWrapper>

            <SectionWrapper className="py-0 px-0" innerClassName="max-w-none mx-0 px-0">
              <div className="space-y-4">
                <SectionTitle as="h2" className="text-left text-lg font-semibold md:text-xl">
                  {WHY_TRUSTFIN_SECTION.title}
                </SectionTitle>
                {WHY_TRUSTFIN_SECTION.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={BODY_CLASS}>
                    {paragraph}
                  </p>
                ))}
                <p className="text-center text-lg font-semibold leading-snug text-brand-primary md:text-xl lg:text-2xl">
                  {WHY_TRUSTFIN_SECTION.tagline}
                </p>
              </div>
            </SectionWrapper>

            <InterestRatesCta label="Compare Rates for My Profile"  />

            <p className="text-xs italic leading-relaxed text-muted-foreground md:text-sm">
              {PAGE_DISCLAIMER}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InterestRatesPageContent;
