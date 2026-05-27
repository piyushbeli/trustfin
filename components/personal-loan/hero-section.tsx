/**
 * HeroSection
 * Personal loan hero — heading, subtitle, stats, and dual CTAs.
 */

import { JSX } from 'react';
import HeroHeading from './hero/hero-heading';
import HeroSubtitle from './hero/hero-subtitle';
import HeroStats from './hero/hero-stats';
import HeroCta from './hero/hero-cta';
import HeroAiCta from './hero/hero-ai-cta';

const HeroSection = (): JSX.Element => {
  return (
    <section className="pt-20 pb-2">
      <div className="px-4 pt-6 max-w-3xl mx-auto flex flex-col">
        <HeroHeading />
        <HeroSubtitle />
        <HeroStats />
        <div className="flex flex-col gap-3 w-full">
          <HeroCta />
          <HeroAiCta />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
