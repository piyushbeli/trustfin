import React from 'react';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselDots,
} from '@/components/ui/carousel';
import { TESTIMONIALS } from '@/lib/constants/common';

/** Text-based testimonial card data */
export interface Testimonial {
  id: string;
  name: string;
  /** Role and location, e.g. "Software Engineer • Bengaluru, Karnataka" */
  subtitle: string;
  quote: string;
  rating: 4 | 5;
}

/** Derive up to 2 initials from a full name */
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/** Circular avatar showing the customer's initials */
const InitialsAvatar = ({ name }: { name: string }): React.ReactNode => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-primary">
    {getInitials(name)}
  </div>
);

interface StarRatingProps {
  rating: number;
  max?: number;
}

/** Row of filled/empty stars using brand colors */
const StarRating = ({ rating, max = 5 }: StarRatingProps): React.ReactNode => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }, (_, i) => (
      <Star
        key={i}
        className={
          i < rating
            ? 'h-4 w-4 fill-brand-primary text-brand-primary'
            : 'h-4 w-4 fill-transparent text-brand-200'
        }
        strokeWidth={i < rating ? 0 : 1.5}
      />
    ))}
  </div>
);

/** Individual lavender testimonial card */
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }): React.ReactNode => (
  <div className="flex h-full flex-col gap-4 rounded-2xl bg-brand-50 p-5 sm:p-6">
    <StarRating rating={testimonial.rating} />

    <p className="flex-1 text-sm leading-relaxed text-gray-700">
      &ldquo;{testimonial.quote}&rdquo;
    </p>

    <div className="flex items-center gap-3">
      <InitialsAvatar name={testimonial.name} />
      <div>
        <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
        <p className="text-xs text-gray-500">{testimonial.subtitle}</p>
      </div>
    </div>
  </div>
);

/**
 * Testimonials carousel section
 * Displays customer text reviews in a center-aligned peek carousel
 */
const TestimonialsSection = (): React.ReactNode => (
  <section className="bg-white py-6 sm:py-10 overflow-hidden">
    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-center mb-6 sm:mb-8 px-4">
      Testimonials
    </h2>

    <Carousel options={{ loop: true, align: 'center', containScroll: false }}>
      <CarouselContent className="items-stretch">
        {TESTIMONIALS.map((testimonial, index) => (
          <CarouselSlide
            key={testimonial.id}
            index={index}
            className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_55%] px-2"
          >
            <TestimonialCard testimonial={testimonial} />
          </CarouselSlide>
        ))}
      </CarouselContent>

      <CarouselDots className="mt-5 sm:mt-6" />
    </Carousel>
  </section>
);

export default TestimonialsSection;
