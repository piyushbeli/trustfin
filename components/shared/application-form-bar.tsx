'use client';

import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationFormBarProps {
  /** Page title, e.g. "Home Loan Application" */
  title: string;
  onBack: () => void;
  backAriaLabel?: string;
  hideBackButton?: boolean;
  className?: string;
}

/**
 * Reusable application header: back navigation + title.
 * Used on secured loan application flows.
 */
const ApplicationFormBar = ({
  title,
  onBack,
  backAriaLabel = 'Back',
  hideBackButton = false,
  className,
}: ApplicationFormBarProps): React.ReactNode => (
  <div className={cn('px-4 py-4 flex items-center gap-3', className)}>
    {!hideBackButton && (
      <button
        type="button"
        onClick={onBack}
        className="p-1 text-gray-700 hover:text-gray-900"
        aria-label={backAriaLabel}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
    )}
    <h1 className="text-base font-medium text-gray-900">{title}</h1>
  </div>
);

export default ApplicationFormBar;
