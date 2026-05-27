/**
 * SectionTitle
 * Standard centered section heading.
 */

import { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  /** Render as a different heading level when needed (defaults to h2) */
  as?: 'h1' | 'h2' | 'h3';
}

const BASE_CLASSES = 'text-base font-medium text-center text-gray-900';

const SectionTitle = ({
  children,
  className,
  as: Tag = 'h2',
}: SectionTitleProps): JSX.Element => {
  return <Tag className={cn(BASE_CLASSES, className)}>{children}</Tag>;
};

export default SectionTitle;
