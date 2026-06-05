'use client';

import { JSX } from 'react';
import { ActionButton, AiChatCta, AiFinnVisual } from '@/components/shared';
import { useLoanApplicationStore } from '@/stores/loan-application-store';
import { AI_CTA_COPY } from '@/components/personal-loan/constants';
import { cn } from '@/lib/utils';

const HERO_SUBHEADLINE =
  'Talk to our AI assistant to find the right financial option tailored just for your credit profile and needs.';

const OUTLINE_CTA_CLASS =
  'h-14 border-2 border-brand-primary bg-white text-base font-semibold text-brand-primary hover:bg-brand-50';

type HeroCtaLayout = 'stacked' | 'row';

interface HeroCtasProps {
  layout: HeroCtaLayout;
}

/** Shared dual CTAs — stacked on mobile, side-by-side on desktop */
const HeroCtas = ({ layout }: HeroCtasProps): JSX.Element => {
  const { triggerApplyFlow, isApplyLoading } = useLoanApplicationStore();
  const isRowLayout = layout === 'row';

  return (
    <div
      className={cn(
        'relative z-10',
        isRowLayout
          ? 'mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap'
          : 'flex w-full flex-col gap-3',
      )}
    >
      <AiChatCta
        variant="gradient"
        label={AI_CTA_COPY.heroSecondaryLabel}
        fullWidth={!isRowLayout}
        className={isRowLayout ? 'h-14 min-w-[200px] flex-1 font-semibold' : undefined}
      />

      <ActionButton
        variant="outline"
        size="lg"
        fullWidth={!isRowLayout}
        className={cn(
          OUTLINE_CTA_CLASS,
          isRowLayout && 'min-w-[200px] flex-1',
        )}
        onClick={triggerApplyFlow}
        isLoading={isApplyLoading}
      >
        Get Loan Offers
      </ActionButton>
    </div>
  );
};

/**
 * Trustfin home hero — mobile stack + desktop two-column (Finn left, copy/CTAs right).
 * AI Assistant CTA uses shared AiChatCta so all AI buttons stay in sync.
 */
const HeroSection = (): JSX.Element => {
  return (
    <section className="wc-hero-bg relative overflow-x-hidden px-6 pt-28 pb-8 sm:pt-24 lg:px-8 lg:pt-28 lg:pb-16">
      {/* Desktop — two columns inspired by marketing hero */}
      <div className="mx-auto hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-16 common-section-wrapper">
        <div className="min-w-0 w-full lg: -ms-22">
          <AiFinnVisual size="default" showGlow />
        </div>

        <div className="flex min-w-0 flex-col">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 xl:text-5xl">
            Get the Best Loan Offer{' '}
            <span className="text-brand-primary">in Minutes</span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-500">
            {HERO_SUBHEADLINE}
          </p>

          <HeroCtas layout="row" />
        </div>
      </div>

      {/* Mobile — headline, mascot, then stacked CTAs */}
      <div className="mx-auto flex max-w-md flex-col items-center lg:hidden">
        <h1 className="mb-4 text-center text-3xl font-semibold leading-tight text-gray-900">
          Get the Best Loan Offer
          <br />
          <span className="text-brand-primary">in Minutes</span>
        </h1>

        <p className="mb-8 text-center text-sm leading-relaxed text-gray-500">
          {HERO_SUBHEADLINE}
        </p>

        <div className="relative w-full">
          <AiFinnVisual
            size="mobile"
            showGlow
            priority
            className="-mb-11 -ms-4"
          />

          <HeroCtas layout="stacked" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
