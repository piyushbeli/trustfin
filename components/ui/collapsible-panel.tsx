'use client';

import { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CollapsiblePanelProps {
  children: ReactNode;
  isExpanded: boolean;
  className?: string;
  /** Applied to the inner content wrapper */
  contentClassName?: string;
  id?: string;
  role?: string;
  'aria-labelledby'?: string;
}

/**
 * Smooth height expand/collapse via CSS grid (0fr → 1fr).
 * Keeps children mounted so open and close both animate evenly.
 */
export const CollapsiblePanel = ({
  children,
  isExpanded,
  className,
  contentClassName,
  id,
  role = 'region',
  'aria-labelledby': ariaLabelledBy,
}: CollapsiblePanelProps): JSX.Element => {
  return (
    <div
      id={id}
      role={role}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={!isExpanded}
      className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-in-out',
        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        className,
      )}
    >
      <div className={cn('min-h-0 overflow-hidden', contentClassName)}>
        {children}
      </div>
    </div>
  );
};
