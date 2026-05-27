/**
 * SectionWrapper
 * Standard <section> wrapper with consistent padding and max-width.
 * Use across landing pages to keep section layout uniform.
 */

import { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: ReactNode;
  /** Additional classes appended to the default wrapper styles */
  className?: string;
  /** Inner container classes (max-width, padding). Override sparingly. */
  innerClassName?: string;
  /** Optional id for in-page navigation */
  id?: string;
}

const DEFAULT_OUTER = 'py-6 px-4';
const DEFAULT_INNER = 'max-w-3xl mx-auto';

const SectionWrapper = ({
  children,
  className,
  innerClassName,
  id,
}: SectionWrapperProps): JSX.Element => {
  return (
    <section id={id} className={cn(DEFAULT_OUTER, className)}>
      <div className={cn(DEFAULT_INNER, innerClassName)}>{children}</div>
    </section>
  );
};

export default SectionWrapper;
