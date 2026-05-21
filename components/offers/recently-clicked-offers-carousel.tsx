/**
 * RecentlyClickedOffersCarousel Component
 *
 * Horizontal scrollable carousel for recently clicked offers (status flow).
 */

'use client';

import type { LenderOfferStatus } from '@/types/wecredit';
import { Carousel, CarouselContent, CarouselSlide, CarouselDots } from '@/components/ui/carousel';
import Image from 'next/image';
import { PercentIcon, CalendarIcon } from '@/components/icons';
import {
  formatOfferDisplayAmount,
  parseAmountToNumber,
} from '@/lib/utils/common-helper';
import { getAmountUptoLabel } from '@/lib/lender-display';
import { StatusBadge } from './status-badge';
import { OfferCardGradientBorder } from './offer-card-gradient-border';

/** Single-line amount copy for carousel cards (e.g. "Amount upto 5 lakhs"). */
const getCarouselAmountLine = (
  uptoAmount: string | undefined,
  lenderType: LenderOfferStatus['lenderType']
): string => {
  const label = getAmountUptoLabel(lenderType);
  const raw = uptoAmount?.trim();
  if (!raw) return `${label} —`;

  if (/lakh/i.test(raw)) {
    return `${label} ${raw}`;
  }

  const numeric = parseAmountToNumber(uptoAmount);
  if (numeric <= 0) return `${label} —`;
  return `${label} ${formatOfferDisplayAmount(uptoAmount)}`;
};

const formatCarouselInterestInline = (
  intRate: string | number | undefined
): string | null => {
  if (intRate === undefined || intRate === null || intRate === '') return null;
  const rate = String(intRate).replace(/%/g, '').trim();
  if (!rate) return null;
  return `Int. rate ${rate}%`;
};

const formatCarouselTenureInline = (
  tenure: string | number | undefined
): string | null => {
  const months = Number(tenure);
  if (!tenure || Number.isNaN(months) || months <= 0) return null;
  return `Upto ${months} m`;
};

interface RecentlyClickedOffersCarouselProps {
  offers: LenderOfferStatus[];
  onOfferClick: (offer: LenderOfferStatus) => void;
}

function RecentlyClickedOfferCard({
  offer,
  onClick,
}: {
  offer: LenderOfferStatus;
  onClick: () => void;
}) {
  const { lenderName, uptoAmount, intRate, tenure, logo, wcStatus, lenderType } =
    offer;

  const interestLine = formatCarouselInterestInline(intRate);
  const tenureLine = formatCarouselTenureInline(tenure);
  const hasFooterDetails = Boolean(interestLine || tenureLine);

  return (
    <OfferCardGradientBorder
      as="button"
      type="button"
      onClick={onClick}
      innerClassName="p-3"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="shrink-0 w-[72px] h-[24px] flex items-center justify-start overflow-hidden">
            {logo ? (
              <Image
                src={logo}
                alt={lenderName}
                width={72}
                height={24}
                className="max-h-[24px] w-auto object-contain object-left"
              />
            ) : (
              <span className="text-xs font-medium text-gray-800 truncate">
                {lenderName}
              </span>
            )}
          </div>
          <StatusBadge status={wcStatus} className="shrink-0" />
        </div>

        <p className="text-lg font-bold text-brand-primary text-left">
          {getCarouselAmountLine(uptoAmount, lenderType)}
        </p>

        {hasFooterDetails && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {interestLine && (
              <div className="flex items-center gap-1 text-gray-500">
                <PercentIcon />
                <span className="text-xs font-medium text-gray-900">
                  {interestLine}
                </span>
              </div>
            )}
            {tenureLine && (
              <div className="flex items-center gap-1 text-gray-500">
                <CalendarIcon />
                <span className="text-xs font-medium text-gray-900">
                  {tenureLine}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </OfferCardGradientBorder>
  );
}

export function RecentlyClickedOffersCarousel({
  offers,
  onOfferClick,
}: RecentlyClickedOffersCarouselProps) {
  if (offers.length === 0) {
    return null;
  }

  return (
    <section className="mb-4 mx-auto max-w-xl">
      <h2 className="text-sm font-medium text-gray-900 mb-4 ml-4 mt-2 lg:ml-0">
        Recently Clicked Offers
      </h2>

      <div>
        <Carousel
          options={{
            align: 'start',
            loop: false,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="max-w-xl">
            {offers.map((offer, index) => {
              const isFirst = index === 0;
              const isLast = index === offers.length - 1;
              const singleOffer = isFirst && isLast;

              return (
                <CarouselSlide
                  key={`${offer.lenderName}-${index}`}
                  className={`${isLast ? 'pr-4' : ''} ${singleOffer ? 'basis-full' : 'basis-[85%]'} sm:basis-[70%] md:basis-[50%]`}
                >
                  <RecentlyClickedOfferCard
                    offer={offer}
                    onClick={() => onOfferClick(offer)}
                  />
                </CarouselSlide>
              );
            })}
          </CarouselContent>

          {offers.length > 1 && (
            <CarouselDots
              className="flex items-center justify-center gap-[2px] h-[8px] mt-4"
              renderDot={(_index, isActive) => (
                <div
                  className={`rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-[8px] h-[8px] bg-brand-primary'
                      : 'w-[6px] h-[6px] bg-gray-400'
                  }`}
                />
              )}
            />
          )}
        </Carousel>
      </div>
    </section>
  );
}
