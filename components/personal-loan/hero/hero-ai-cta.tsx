'use client';

/**
 * HeroAiCta
 * Secondary AI assistant CTA shown below the primary apply CTA in the
 * personal loan hero. Thin wrapper around the shared AiChatCta so all
 * AI buttons share a single click target and styling source of truth.
 */

import { JSX } from 'react';
import { AiChatCta } from '@/components/shared';
import { HERO_COPY } from '../constants';

const HeroAiCta = (): JSX.Element => {
  return <AiChatCta variant="outline" label={HERO_COPY.secondaryCta} />;
};

export default HeroAiCta;
