'use client';

/**
 * Single credit card recommendation card with AI insight and Apply CTA.
 */

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { CreditCard } from '@/types/credit-card';
import { useCreditCardTracking } from '@/hooks/use-credit-card-tracking';
import { IMAGES } from '@/lib/constants/images';
import { CREDIT_CARD_FEATURE_ICONS } from './constants';
import ActionButton from '../shared/action-button';

export interface CreditCardItemProps {
  card: CreditCard;
}

const CreditCardItem = ({ card }: CreditCardItemProps): React.ReactNode => {
  const { trackCreditCardClick } = useCreditCardTracking();
  const cardImage = card.imageAsset ?? IMAGES.ICONS.CREDIT_CARD;

  const handleApplyNow = (): void => {
    // Open URL first so user is never blocked
    window.open(card.link, '_blank');
    // Fire-and-forget: track click for logged-in users only
    trackCreditCardClick(card.title);
  };

  return (
    <article className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm" data-card-title={card.title}>
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-brand-200 bg-brand-50">
          <img src={cardImage} alt="" className="h-8 w-8 object-contain" loading="lazy" />
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-medium leading-7 text-gray-900">{card.title}</h2>
          <p className="mt-1 text-sm leading-5 text-gray-500">{card.intro}</p>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
        {card.features.map((feature) => {
          const FeatureIcon = CREDIT_CARD_FEATURE_ICONS[feature.icon];
          return (
            <li key={feature.label} className="flex items-center gap-1.5 text-sm text-gray-700">
              <FeatureIcon className="h-3.5 w-3.5 shrink-0 text-brand-primary" aria-hidden />
              <span>{feature.label}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-lg border border-brand-200 bg-brand-50/80 p-3">
        <div className="mb-1 flex items-center gap-1.5">
          <Image src={IMAGES.aiTransparent} alt="" width={14} height={14} className="h-3.5 w-3.5" />
          <span className="text-[11px] font-semibold tracking-wide text-brand-primary">AI INSIGHT</span>
        </div>
        <p className="text-sm leading-5 text-gray-600">{card.aiInsight}</p>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-200 pt-3">
        <div className="border-l-2 border-brand-primary pl-2">
          <p className="text-[10px] font-medium tracking-wide text-brand-primary">ANNUAL FEE</p>
          <p className="text-2xl font-semibold leading-7 text-gray-900">
            {card.annualFee}
            <span className="ml-1 text-xs font-medium text-brand-primary">{card.annualFeePeriod}</span>
          </p>
        </div>

        <ActionButton
          type="button"
          onClick={handleApplyNow}
          rightIcon={<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
          className="h-10 rounded-lg px-4 text-sm font-medium"
        >
          Apply Now
        </ActionButton>
      </div>
    </article>
  );
};

export default CreditCardItem;
