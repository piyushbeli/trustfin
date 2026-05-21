'use client';

import React, { useState, useEffect } from 'react';
import TrendingOfferCard from './trending-offer-card';
import type { ActiveLender } from '@/lib/utils/lenders';
import { getLowestRateLenderId } from '@/lib/utils/offers-display';

/** Props for TrendingOffersSection component */
interface TrendingOffersSectionProps {
  activeLenders: ActiveLender[];
  heading?: string;
  /** Show "Swipe to explore" — off for long custom headings (e.g. personal-loan page) */
  showSwipeHint?: boolean;
}

const DEFAULT_HEADING = 'Best Offers';

/**
 * Best Offers — 2-row horizontally scrollable lender cards
 */
const TrendingOffersSection = ({
  activeLenders,
  heading = DEFAULT_HEADING,
  showSwipeHint,
}: TrendingOffersSectionProps): React.ReactNode => {
  const [skipAnimation, setSkipAnimation] = useState(false);
  const lowestRateId = getLowestRateLenderId(activeLenders);
  const resolvedHeading = heading || DEFAULT_HEADING;
  const shouldShowSwipeHint = showSwipeHint ?? resolvedHeading === DEFAULT_HEADING;

  useEffect(() => {
    const timeout = setTimeout(() => setSkipAnimation(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  if (activeLenders.length === 0) {
    return null;
  }

  return (
    <section className="min-w-0 overflow-hidden bg-white py-6">
      <div className="mb-4 flex items-center justify-between gap-3 px-4">
        <h2 className="min-w-0 text-lg font-semibold text-gray-900">{resolvedHeading}</h2>
        {shouldShowSwipeHint ? (
          <span className="shrink-0 text-sm text-gray-500">Swipe to explore</span>
        ) : null}
      </div>

      <div className="min-w-0 overflow-hidden">
        <div className="wc-products-scroll scrollbar-hide overflow-x-auto overscroll-x-contain px-4 pb-1">
          {/* increase the width of the grid more so that the cards are not too close to each other*/}
          <div className="grid w-max grid-flow-col grid-rows-2 gap-3 auto-cols-[minmax(180px,200px)] sm:auto-cols-[minmax(180px,200px)]">
            {activeLenders.map(({ id, lender }, index) => (
              <TrendingOfferCard
                key={id}
                id={id}
                lenderName={lender.Name || id}
                logoPath={lender.logo || undefined}
                amount={lender.UptoAmount || 'N/A'}
                interestRate={lender.IntRate != null ? `${lender.IntRate}%` : 'N/A'}
                tenure={lender.Tenure != null ? String(lender.Tenure) : 'N/A'}
                href={lender.utmLink || `/offers/${id}`}
                index={index}
                skipAnimation={skipAnimation}
                lenderType={lender?.lenderType ?? null}
                showLowestRateBadge={id === lowestRateId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingOffersSection;
