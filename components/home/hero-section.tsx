'use client';

import { JSX } from 'react';
import Image from 'next/image';
import { ActionButton, AiChatCta } from '@/components/shared';
import { useLoanApplicationStore } from '@/stores/loan-application-store';
import { IMAGES } from '@/lib/constants/images';
import { AI_CTA_COPY } from '@/components/personal-loan/constants';

/** Finn intro copy shown in the glass chat bubble */
const FINN_CHAT_MESSAGE =
  "Hi 👋 I'm Finn your AI loan guide. Tell me what you need, and I'll match you with the right financial option.";

/**
 * Trustfin home hero — static layout with boat image, Finn bubble, and dual CTAs.
 * AI Assistant CTA is rendered via the shared AiChatCta so all AI buttons
 * stay in sync until the full-screen chat modal is implemented.
 */
const HeroSection = (): JSX.Element => {
  const { triggerApplyFlow, isApplyLoading } = useLoanApplicationStore();

  return (
    <section className="wc-hero-bg relative overflow-x-hidden px-6 pt-24 pb-8">
      <div className="mx-auto flex max-w-md flex-col items-center">
        {/* Headline */}
        <h1 className="mb-8 text-center text-3xl font-semibold leading-tight text-gray-900">
          Get the Best Loan Offer
          <br />
          <span className="text-brand-primary">in Minutes</span>
        </h1>

        {/* Mascot + CTAs stacked so legs tuck behind opaque buttons */}
        <div className="relative w-full">
          {/* Mobile: bleed to screen edges; sm+: same width as CTAs (full stack width) */}
          <div className="relative -mx-12 w-[calc(100%+3rem)] overflow-visible sm:mx-0 sm:w-full sm:-mb-10 -mb-4">
            <div className="wc-hero-glow" aria-hidden />
            <div className="relative z-0 h-96 w-full sm:h-104">
              <Image
                src={IMAGES.HERO.BOAT}
                alt="Trustfin loan guide"
                fill
                className="scale-125 object-contain object-bottom sm:scale-115"
                priority
              />
            </div>
          </div>

          {/* CTAs sit above mascot feet via z-index + opaque backgrounds */}
          <div className="relative z-10 flex w-full flex-col gap-3">
            <AiChatCta variant="gradient" label={AI_CTA_COPY.heroSecondaryLabel} />

            <ActionButton
              variant="outline"
              size="lg"
              fullWidth
              className="h-14 rounded-xl border-2 border-brand-primary bg-white text-base font-semibold text-brand-primary hover:bg-brand-50"
              onClick={triggerApplyFlow}
              isLoading={isApplyLoading}
            >
              Get Loan Offers
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
