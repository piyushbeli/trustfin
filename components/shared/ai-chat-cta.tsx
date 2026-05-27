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
import Image, { type StaticImageData } from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/lib/constants/images';
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
        class: 'rounded-md',
      },
      {
        variant: 'gradient',
        size: 'compact',
        class: 'rounded-md',
      },
      {
        variant: 'solid',
        size: 'default',
        class: 'rounded-md',
      },
      {
        variant: 'solid',
        size: 'compact',
        class: 'rounded-md',
      },
      {
        variant: 'dark',
        size: 'default',
        class: 'rounded-md',
      },
      {
        variant: 'dark',
        size: 'compact',
        class: 'rounded-md',
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

/** Colored icon on light backgrounds; solid icon on filled / dark buttons */
const getAiCtaIconSrc = (variant: AiChatCtaVariant | null | undefined): StaticImageData =>
  variant !== 'outline' ? IMAGES.aiTransparent : IMAGES.ai;

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
  /** Show AI icon after the label — defaults to true */
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

  const iconDimension = size === 'compact' ? 28 : 32;
  const iconSrc = getAiCtaIconSrc(variant);

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
        <Image
          src={iconSrc}
          alt=""
          width={iconDimension}
          height={iconDimension}
          className="shrink-0 -ms-2"
          aria-hidden
        />
      ) : null}
    </button>
  );
};

export { aiChatCtaVariants };
export default AiChatCta;
