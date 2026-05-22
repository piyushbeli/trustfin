import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SKELETON_CARD_COUNT = 16;

/**
 * Skeleton for a single best-offer card — mirrors TrendingOfferCard layout
 */
const TrendingOfferCardSkeleton = (): React.ReactNode => {
  return (
    <div className="flex h-full w-full flex-col items-center rounded-xl border border-brand-primary bg-brand-primary/10 p-3 text-center">
      <Skeleton className="mb-2 h-8 w-20 rounded" />
      <Skeleton className="h-8 w-16 rounded" />
      <Skeleton className="mt-1 h-4 w-28 rounded" />
      <Skeleton className="h-5 w-20 rounded" />
      <div className="mt-1 flex w-full flex-col items-center gap-1">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
    </div>
  );
};

/**
 * Skeleton for Best Offers section — mirrors TrendingOffersSection (2-row horizontal scroll)
 */
const TrendingOffersSkeleton = (): React.ReactNode => {
  return (
    <section className="min-w-0 overflow-hidden bg-white py-6 common-section-wrapper mx-auto">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Skeleton className="h-7 w-28 rounded" />
        <Skeleton className="h-4 w-24 shrink-0 rounded" />
      </div>

      <div className="min-w-0 overflow-hidden">
        <div className="wc-products-scroll scrollbar-hide flex items-stretch gap-4 overflow-x-auto overscroll-x-contain pb-1">
          <div className="grid w-max grid-flow-col grid-rows-2 gap-3 auto-cols-[minmax(180px,200px)] sm:auto-cols-[minmax(180px,200px)]">
            {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
              <TrendingOfferCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingOffersSkeleton;
