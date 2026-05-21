'use client';

import { cn } from '@/lib/utils';

interface OfferCardGradientBorderBaseProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

type OfferCardGradientBorderDivProps = OfferCardGradientBorderBaseProps &
  React.HTMLAttributes<HTMLDivElement> & {
    as?: 'div';
  };

type OfferCardGradientBorderButtonProps = OfferCardGradientBorderBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as: 'button';
  };

export type OfferCardGradientBorderProps =
  | OfferCardGradientBorderDivProps
  | OfferCardGradientBorderButtonProps;

/**
 * Offer card shell with a light purple → pink gradient on the card surface.
 */
export const OfferCardGradientBorder = (
  props: OfferCardGradientBorderProps
): React.ReactNode => {
  const { children, className, innerClassName, as = 'div', ...rest } = props;

  const shellClassName = cn(
    'offer-card-light-gradient rounded-lg w-full border border-brand-primary',
    innerClassName,
    className
  );

  if (as === 'button') {
    const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        type="button"
        {...buttonProps}
        className={cn(shellClassName, 'text-left', buttonProps.className)}
      >
        {children}
      </button>
    );
  }

  const divProps = rest as React.HTMLAttributes<HTMLDivElement>;
  return (
    <div {...divProps} className={cn(shellClassName, divProps.className)}>
      {children}
    </div>
  );
};
