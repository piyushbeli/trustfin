'use client';

/**
 * AiChatCta
 * Shared CTA button for launching the TrustFin AI chat experience.
 *
 * Two visual variants are supported so the same component can power:
 *  - gradient: primary AI button (home hero, "Chat with TrustFin AI" in
 *    the personal loan advisor block)
 *  - outline: secondary AI button (personal loan hero, sits below the
 *    primary "Start Loan Application" CTA)
 *
 * The AI chat modal is not shipped yet, so clicks fall through to a
 * shared placeholder handler. `prefillQuestion` is accepted now and
 * forwarded to the handler so suggested-question rows can wire up
 * without another component churn once the modal lands.
 */

import { JSX } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AI_CTA_COPY } from '@/components/personal-loan/constants';

export type AiChatCtaVariant = 'gradient' | 'outline';

export interface AiChatCtaProps {
  /** Button label; defaults to AI_CTA_COPY.defaultLabel */
  label?: string;
  /** Visual style — defaults to gradient */
  variant?: AiChatCtaVariant;
  /**
   * Optional question to pre-fill when the AI modal opens.
   * Reserved for future wiring; currently logged by the placeholder handler.
   */
  prefillQuestion?: string;
  /** Override click handler; defaults to shared placeholder until modal ships */
  onClick?: () => void;
  /** Defaults to true so the CTA stretches inside section containers */
  fullWidth?: boolean;
  /** Optional extra classes appended to the variant styles */
  className?: string;
}

const GRADIENT_CLASSES =
  'wc-hero-cta-gradient text-white shadow-md hover:shadow-lg';

const OUTLINE_CLASSES =
  'border border-cyan-300 bg-white text-brand-primary hover:bg-brand-50';

const BASE_CLASSES =
  'flex h-14 items-center justify-center gap-2 rounded-xl text-base font-medium transition-all duration-200 active:scale-[0.98]';

/**
 * Shared placeholder until the AI chat modal ships. Kept inside the
 * component file so all current AI buttons funnel through one no-op
 * and can be swapped to the real opener in a single place.
 */
const openAiChatPlaceholder = (prefillQuestion?: string): void => {
  // Intentionally a no-op for now. When the modal ships, route to it and
  // forward prefillQuestion so suggested-question rows seed the chat.
  void prefillQuestion;
};

const AiChatCta = ({
  label,
  variant = 'gradient',
  prefillQuestion,
  onClick,
  fullWidth = true,
  className,
}: AiChatCtaProps): JSX.Element => {
  const buttonLabel = label ?? AI_CTA_COPY.defaultLabel;

  const handleClick = (): void => {
    if (onClick) {
      onClick();
      return;
    }
    openAiChatPlaceholder(prefillQuestion);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        BASE_CLASSES,
        variant === 'gradient' ? GRADIENT_CLASSES : OUTLINE_CLASSES,
        fullWidth && 'w-full',
        className,
      )}
    >
      <span>{buttonLabel}</span>
      <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
    </button>
  );
};

export default AiChatCta;
