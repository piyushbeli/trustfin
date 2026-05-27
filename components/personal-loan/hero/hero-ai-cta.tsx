'use client';

/**
 * HeroAiCta
 * Personal loan hero secondary CTA — gradient-bordered "Talk to AI Assistant"
 * button below the primary apply CTA. Delegates to shared AiChatCta.
 */

import { JSX } from 'react';
import { AiChatCta } from '@/components/shared';
import { HERO_COPY } from '../constants';

const HeroAiCta = (): JSX.Element => {
  return (
    <AiChatCta
      variant="outline"
      size="default"
      label={HERO_COPY.secondaryCta}
    />
  );
};

export default HeroAiCta;
