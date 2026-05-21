'use client';

import { PARTNERS } from '@/lib/constants/common';
import { chunkPartners } from '@/lib/utils/partners-carousel';
import { useScrollSnapCarousel } from '@/hooks/use-scroll-snap-carousel';
import { cn } from '@/lib/utils';
import PartnerCard from './partner-card';

const partnerSlides = chunkPartners(PARTNERS);

/**
 * Trusted By section — scroll-snap carousel with dot indicators
 */
const PartnersSection = (): React.ReactNode => {
  const { scrollRef, selectedIndex, scrollTo } = useScrollSnapCarousel(
    partnerSlides.length
  );
  const showDots = partnerSlides.length > 1;

  return (
    <section className="min-w-0 overflow-hidden bg-white py-6 sm:py-8">
      <div className="mx-auto common-section-wrapper">
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 sm:mb-8 sm:text-2xl">
          Trusted By
          <br />
          <span className="text-brand-primary">50+ Lenders</span>
        </h2>

        <div
          ref={scrollRef}
          className="wc-products-scroll scrollbar-hide flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          role="region"
          aria-label="Trusted lending partners"
          aria-roledescription="carousel"
        >
          {partnerSlides.map((slidePartners, slideIndex) => (
            <div
              key={slideIndex}
              className="w-full shrink-0 snap-start snap-always"
              aria-label={`Partners slide ${slideIndex + 1} of ${partnerSlides.length}`}
            >
              <div className="flex min-w-0 items-center justify-evenly gap-4 px-2 sm:gap-6 sm:px-4">
                {slidePartners.map((partner) => (
                  <PartnerCard key={partner.name} partner={partner} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {showDots ? (
          <div className="mt-5 flex justify-center gap-2 sm:mt-6">
            {partnerSlides.map((_, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'h-2 w-2 rounded-full bg-brand-200 transition-colors',
                    isActive && 'bg-brand-primary'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PartnersSection;
