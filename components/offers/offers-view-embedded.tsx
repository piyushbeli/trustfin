'use client';

import { useCallback, useMemo, type JSX } from 'react';
import { OfferCard } from '@/components/offers/offer-card';
import { RecentlyClickedOffersCarousel } from '@/components/offers/recently-clicked-offers-carousel';
import { UnmatchedOffersSection } from '@/components/offers/unmatched-offers-section';
import { ActionButton } from '@/components/shared';
import { handleChatOfferClick } from '@/lib/ai-chat/offer-sync/handle-chat-offer-click';
import { categorizeOffers } from '@/lib/utils/offer-categorization';
import { parseAmountToNumber } from '@/lib/utils/common-helper';
import { useChatExploreMoreOffers } from '@/hooks/use-chat-explore-more-offers';
import { newPLEnabled } from '@/hooks/use-offers';
import type { AiChatOfferClickContext } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';
import { cn } from '@/lib/utils';

export type OffersViewChatContext = AiChatOfferClickContext;

export interface OffersViewEmbeddedProps {
  offers: LenderOfferStatus[];
  chatContext: OffersViewChatContext;
  canReHit?: boolean;
  className?: string;
}

/**
 * Same categorized offer layout as /offers (carousel, explore cards, unmatched)
 * without page chrome, routing, or useOffers polling.
 */
export const OffersViewEmbedded = ({
  offers,
  chatContext,
  canReHit = false,
  className,
}: OffersViewEmbeddedProps): JSX.Element => {
  const { explore: exploreOffers, recentlyClicked: statusOffers, unmatched: unmatchedOffers } =
    useMemo(() => categorizeOffers(offers), [offers]);

  const { isExploringMore, exploreMoreOffers } = useChatExploreMoreOffers(chatContext);

  const showExploreMoreCta = canReHit && newPLEnabled;

  const handleOfferClick = useCallback(
    (offer: LenderOfferStatus): void => {
      handleChatOfferClick({ offer, ...chatContext });
    },
    [chatContext],
  );

  const recentStatusOffers = useMemo(
    () =>
      newPLEnabled
        ? statusOffers
        : statusOffers.filter((offer) => offer.isWebHookSent !== 2),
    [statusOffers],
  );

  const maxInitiatedAmount = useMemo(() => {
    return exploreOffers
      .filter((offer) => offer.wcStatus === 'INITIATED' && offer.uptoAmount)
      .map((offer) => parseAmountToNumber(offer.uptoAmount))
      .reduce((max, current) => Math.max(max, current), 0);
  }, [exploreOffers]);

  const formattedMaxAmount = useMemo(() => {
    return maxInitiatedAmount > 0 ? `₹${maxInitiatedAmount.toLocaleString('en-IN')}` : null;
  }, [maxInitiatedAmount]);

  const hasInitiatedOffers = exploreOffers.length > 0;
  const hasOffers =
    exploreOffers.length > 0 || statusOffers.length > 0 || unmatchedOffers.length > 0;

  const renderOfferSection = (title: string, offerList: LenderOfferStatus[]): JSX.Element | null => {
    if (offerList.length === 0) {
      return null;
    }

    return (
      <section className="space-y-3">
        {title ? <h2 className="lead-form-label">{title}</h2> : null}
        <div className="space-y-4">
          {offerList.map((offer, index) => (
            <OfferCard
              key={`${offer.lenderName}-${index}`}
              offer={offer}
              onClick={() => handleOfferClick(offer)}
              variant="explore"
            />
          ))}
        </div>
      </section>
    );
  };

  if (!hasOffers) {
    return (
      <div
        className={cn(
          'rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground',
          className,
        )}
      >
        Offers are being prepared. Please check back shortly.
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {hasInitiatedOffers && formattedMaxAmount ? (
        <p
          className="text-blue-600 my-4"
          style={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '153%',
            letterSpacing: '-0.01em',
          }}
        >
          Congratulations! You are eligible for a loan of upto {formattedMaxAmount}
        </p>
      ) : null}

      <div className="space-y-6">
        {exploreOffers.length > 0 ? renderOfferSection('', exploreOffers) : null}
        {showExploreMoreCta ? (
          <ActionButton
            type="button"
            onClick={() => void exploreMoreOffers()}
            rightIcon="🔍"
            fullWidth
            isLoading={isExploringMore}
            disabled={isExploringMore}
          >
            Explore More Offers
          </ActionButton>
        ) : null}
        {recentStatusOffers.length > 0 ? (
          <RecentlyClickedOffersCarousel
            offers={recentStatusOffers}
            onOfferClick={handleOfferClick}
            className="max-w-auto m-0"
            headingClassName="mx-0"
          />
        ) : null}
        {unmatchedOffers.length > 0 ? (
          <UnmatchedOffersSection offers={unmatchedOffers} variant="compact" className="my-2" />
        ) : null}
      </div>

    </div>
  );
};
