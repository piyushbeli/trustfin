'use client';

/**
 * AiFinnVisual
 * Reusable Finn mascot with optional glow and glass chat bubble.
 * Size variants cover home hero desktop + mobile layouts; extend as needed.
 */

import { JSX } from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/lib/constants/images';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';

const rootVariants = cva('relative w-full shrink-0', {
  variants: {
    bleed: {
      // Tighter bleed on very narrow screens to avoid horizontal layout breakage
      true: '-mx-4 w-[calc(100%+2rem)] overflow-hidden sm:mx-0 sm:w-full sm:overflow-visible',
      false: '',
    },
  },
  defaultVariants: {
    bleed: false,
  },
});

const frameVariants = cva('relative z-0 mx-auto w-full', {
  variants: {
    size: {
      // Explicit width prevents collapse when the image uses fill positioning
      default: 'h-[420px] max-w-[480px]',
      // mobile: 'h-[300px] max-w-full sm:h-[360px]',
      mobile: 'h-[320px] xs:h-[360px] max-w-full',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const imageVariants = cva('object-contain object-bottom', {
  variants: {
    size: {
      default: '',
      // Avoid aggressive scale on sub-400px viewports
      mobile: 'max-sm:scale-100 sm:scale-110',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type AiFinnVisualSize = NonNullable<VariantProps<typeof frameVariants>['size']>;

export interface AiFinnVisualProps extends VariantProps<typeof frameVariants> {
  /** Bleed mascot to screen edges on small viewports (home hero mobile) */
  bleed?: boolean;
  /** Lavender bloom behind the mascot */
  showGlow?: boolean;
  /** Glass chat bubble overlapping the mascot (desktop only) */
  showBubble?: boolean;
  /** Override default Finn intro copy */
  bubbleMessage?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}

const AiFinnVisual = ({
  size = 'default',
  bleed = false,
  showGlow = false,
  showBubble = false,
  bubbleMessage,
  alt = 'Finn, your AI loan guide',
  priority = false,
  className,
}: AiFinnVisualProps): JSX.Element => {
  const message = bubbleMessage ?? AI_CHAT_COPY.introMessage;

  return (
    <div className={cn(rootVariants({ bleed }), className)}>
      {showGlow ? <div className={cn("wc-hero-glow ", size === 'mobile' ? 'h-[320px] xs:h-[360px]' : '')} aria-hidden /> : null}

      <div className={frameVariants({ size })}>
        <Image
          src={IMAGES.HERO.BOAT}
          alt={alt}
          fill
          sizes={size === 'mobile' ? '100vw' : '(min-width: 1024px) 480px, 100vw'}
          className={imageVariants({ size })}
          priority={priority}
        />

        {showBubble ? (
          <div
            className="wc-hero-chat-bubble pointer-events-none absolute top-[14%] right-2 z-10 hidden w-[min(58%,260px)] min-w-[200px] rounded-2xl px-4 py-3.5 text-sm leading-snug text-white lg:block"
            role="note"
            aria-label={message}
          >
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { frameVariants as aiFinnVisualVariants };
export default AiFinnVisual;
