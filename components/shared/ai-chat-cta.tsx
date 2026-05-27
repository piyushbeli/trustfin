'use client';

/**
 * AiChatCta
 * Reusable CTA for launching the TrustFin AI chat experience.
 *
 * Variants mirror the personal-loan hero design:
 *  - gradient: filled purple → sky (primary AI CTA on home hero, advisor block)
 *  - outline: white fill with cyan → purple gradient border (hero secondary CTA)
 *  - solid: flat brand purple (sections that need a simpler filled button)
 *  - dark: inverted styling for dark / tinted backgrounds
 *
 * The AI chat modal is not shipped yet; clicks use a shared placeholder handler.
 * `prefillQuestion` is forwarded so suggested-question rows can wire up without
 * another refactor once the modal lands.
 */

import { JSX, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AI_CTA_COPY } from '@/components/personal-loan/constants';

const aiChatCtaVariants = cva(
  'flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        gradient: 'wc-hero-cta-gradient text-white shadow-md hover:shadow-lg',
        outline: 'wc-ai-cta-outline text-cyan-600',
        solid:
          'bg-brand-primary text-white shadow-md hover:bg-brand-primary/90',
        dark:
          'border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15',
      },
      size: {
        default: 'h-14 text-base',
        compact: 'h-10 text-sm',
      },
    },
    compoundVariants: [
      {
        variant: 'gradient',
        size: 'default',
        class: 'rounded-xl',
      },
      {
        variant: 'gradient',
        size: 'compact',
        class: 'rounded-lg',
      },
      {
        variant: 'solid',
        size: 'default',
        class: 'rounded-xl',
      },
      {
        variant: 'solid',
        size: 'compact',
        class: 'rounded-lg',
      },
      {
        variant: 'dark',
        size: 'default',
        class: 'rounded-xl',
      },
      {
        variant: 'dark',
        size: 'compact',
        class: 'rounded-lg',
      },
      {
        variant: 'outline',
        size: 'default',
        class: 'rounded-md',
      },
      {
        variant: 'outline',
        size: 'compact',
        class: 'rounded-md',
      },
    ],
    defaultVariants: {
      variant: 'gradient',
      size: 'default',
    },
  },
);

export type AiChatCtaVariant = NonNullable<
  VariantProps<typeof aiChatCtaVariants>['variant']
>;

export type AiChatCtaSize = NonNullable<
  VariantProps<typeof aiChatCtaVariants>['size']
>;

export interface AiChatCtaProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof aiChatCtaVariants> {
  /** Button label; defaults to AI_CTA_COPY.defaultLabel */
  label?: string;
  /**
   * Optional question to pre-fill when the AI modal opens.
   * Reserved for future wiring; currently passed to the placeholder handler.
   */
  prefillQuestion?: string;
  /** Override click handler; defaults to shared placeholder until modal ships */
  onClick?: () => void;
  /** Defaults to true so the CTA stretches inside section containers */
  fullWidth?: boolean;
  /** Show sparkle icon after the label — defaults to true */
  showIcon?: boolean;
  /** Optional extra classes appended to variant styles */
  className?: string;
}

/**
 * Shared placeholder until the AI chat modal ships. Kept inside the
 * component file so all current AI buttons funnel through one no-op
 * and can be swapped to the real opener in a single place.
 */
const openAiChatPlaceholder = (prefillQuestion?: string): void => {
  void prefillQuestion;
};

const AiChatCta = ({
  label,
  variant = 'gradient',
  size = 'default',
  prefillQuestion,
  onClick,
  fullWidth = true,
  showIcon = true,
  className,
  disabled,
  ...buttonProps
}: AiChatCtaProps): JSX.Element => {
  const buttonLabel = label ?? AI_CTA_COPY.defaultLabel;

  const handleClick = (): void => {
    if (onClick) {
      onClick();
      return;
    }
    openAiChatPlaceholder(prefillQuestion);
  };

  const iconSizeClass = size === 'compact' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        aiChatCtaVariants({ variant, size }),
        fullWidth && 'w-full',
        className,
      )}
      {...buttonProps}
    >
      <span>{buttonLabel}</span>
      {showIcon ? (
        <Sparkles
          className={cn(iconSizeClass, 'shrink-0', variant === 'outline' && 'text-cyan-500')}
          aria-hidden
        />
      ) : null}
    </button>
  );
};

export { aiChatCtaVariants };
export default AiChatCta;
