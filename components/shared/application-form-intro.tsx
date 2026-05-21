'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface ApplicationFormIntroProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

/**
 * Reusable form intro: heading + optional description below application progress.
 */
const ApplicationFormIntro = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: ApplicationFormIntroProps): React.ReactNode => {
  const headingId = useId();

  return (
    <header className={cn('space-y-2', className)}>
      <h2
        id={headingId}
        className={cn(
          'text-xl font-bold text-gray-900 sm:text-2xl',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-sm text-gray-500 leading-5',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
};

export default ApplicationFormIntro;
