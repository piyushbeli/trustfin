'use client';

import { PARTNERS } from '@/lib/constants/common';
import { chunkPartners } from '@/lib/utils/partners-carousel';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselSlide,
} from '@/components/ui/carousel';
import PartnerCard from './partner-card';

const partnerSlides = chunkPartners(PARTNERS);

/**
 * Trusted By section — carousel of lender logos with pagination dots
 */
const PartnersSection = (): React.ReactNode => {
  return (
    <section className="min-w-0 overflow-hidden bg-white py-6 sm:py-8">
      <div className="mx-auto !sm:max-w-3xl px-4">
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 sm:mb-8 sm:text-2xl">
          Trusted By
          <br />
          <span className="text-brand-primary">50+ Lenders</span>
        </h2>

        <Carousel
          options={{ loop: false, align: 'start', containScroll: 'trimSnaps' }}
          className="min-w-0"
        >
          <CarouselContent>
            {partnerSlides.map((slidePartners, slideIndex) => (
              <CarouselSlide
                key={slideIndex}
                index={slideIndex}
                className="min-w-0 basis-full"
              >
                <div className="flex min-w-0 items-center justify-evenly gap-4 px-2 sm:gap-6 sm:px-4">
                  {slidePartners.map((partner) => (
                    <PartnerCard key={partner.name} partner={partner} />
                  ))}
                </div>
              </CarouselSlide>
            ))}
          </CarouselContent>

          <CarouselDots
            className="mt-5 sm:mt-6"
            dotClassName="h-2 w-2 rounded-full bg-brand-200 transition-colors"
            activeDotClassName="h-2 w-2 rounded-full bg-brand-primary"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default PartnersSection;
