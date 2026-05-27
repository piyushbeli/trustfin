/**
 * SectionDescription
 * Standard subtitle paragraph rendered below a SectionTitle.
 */

import { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionDescriptionProps {
  children: ReactNode;
  className?: string;
  /** Center align by default; allow opt-out for left-aligned copy */
  align?: 'center' | 'left';
}

const BASE_CLASSES = 'text-sm text-gray-500 leading-5';

const SectionDescription = ({
  children,
  className,
  align = 'center',
}: SectionDescriptionProps): JSX.Element => {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left';
  return <p className={cn(BASE_CLASSES, alignmentClass, className)}>{children}</p>;
};

export default SectionDescription;
