'use client';

/**
 * DocumentGroupHeading
 * Shared label for a document list group — matches EmploymentTabs active styling.
 */

import { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DocumentGroupHeadingProps {
  children: ReactNode;
  className?: string;
}

const DocumentGroupHeading = ({
  children,
  className,
}: DocumentGroupHeadingProps): JSX.Element => {
  return (
    <h3
      className={cn(
        'mb-3 w-full text-center bg-brand-50 border-b-2 border-brand-primary p-3 text-sm font-semibold custom-text-black',
        className,
      )}
    >
      {children}
    </h3>
  );
};

export default DocumentGroupHeading;
