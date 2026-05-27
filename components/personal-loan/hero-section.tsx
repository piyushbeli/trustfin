/**
 * HeroSection
 * Loan product hero — heading, subtitle, stats, and dual CTAs.
 */

import { JSX, type ComponentType } from 'react';
import HeroHeading from './hero/hero-heading';
import HeroSubtitle from './hero/hero-subtitle';
import HeroStats from './hero/hero-stats';
import HeroCta from './hero/hero-cta';
import HeroAiCta from './hero/hero-ai-cta';
import { HERO_COPY, HERO_STATS, type HeroStatItem } from './constants';

export interface HeroSectionProps {
  productLabel?: string;
  subtitle?: string;
  stats?: HeroStatItem[];
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  /** When provided, replaces the default personal-loan apply CTA */
  PrimaryCta?: ComponentType;
}

const HeroSection = ({
  productLabel,
  subtitle,
  stats,
  primaryCtaLabel = HERO_COPY.primaryCta,
  secondaryCtaLabel = HERO_COPY.secondaryCta,
  PrimaryCta,
}: HeroSectionProps): JSX.Element => {
  const PrimaryCtaComponent = PrimaryCta ?? HeroCta;

  return (
    <section className="pt-20 pb-2">
      <div className="px-4 pt-6 max-w-3xl mx-auto flex flex-col">
        <HeroHeading productLabel={productLabel} />
        <HeroSubtitle subtitle={subtitle} />
        <HeroStats stats={stats ?? HERO_STATS} />
        <div className="flex flex-col gap-3 w-full">
          {PrimaryCta ? (
            <PrimaryCtaComponent />
          ) : (
            <HeroCta label={primaryCtaLabel} />
          )}
          <HeroAiCta label={secondaryCtaLabel} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
