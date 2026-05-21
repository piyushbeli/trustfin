import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SKELETON_CARD_COUNT = 8;

/**
 * Skeleton for a single best-offer card
 */
const TrendingOfferCardSkeleton = (): React.ReactNode => {
  return (
    <div className="flex min-h-[168px] w-full flex-col items-center rounded-xl border border-brand-100 bg-gray-50/50 p-3">
      <Skeleton className="mb-2 h-8 w-20 rounded" />
      <Skeleton className="h-7 w-16 rounded" />
      <Skeleton className="mt-2 h-3 w-24 rounded" />
      <Skeleton className="mt-1 h-3 w-16 rounded" />
      <div className="mt-auto flex w-full flex-col items-center gap-1 pt-3">
        <Skeleton className="h-4 w-28 rounded-full" />
        <Skeleton className="h-4 w-24 rounded-full" />
      </div>
    </div>
  );
};

/**
 * Skeleton for Best Offers section — 2-row horizontal scroll
 */
const TrendingOffersSkeleton = (): React.ReactNode => {
  return (
    <section className="min-w-0 overflow-hidden bg-white py-6">
      <div className="mb-4 flex items-center justify-between px-4">
        <Skeleton className="h-7 w-28 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      <div className="min-w-0 overflow-hidden">
        <div className="wc-products-scroll scrollbar-hide overflow-x-auto px-4 pb-1">
          <div className="grid w-max grid-flow-col grid-rows-2 gap-3 auto-cols-[minmax(148px,160px)]">
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
