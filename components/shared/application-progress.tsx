'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { clampProgress, getStepProgress } from '@/lib/utils/application-progress';

interface ApplicationProgressProps {
  /** Direct 0–100 percentage (takes priority over step props) */
  value?: number;
  currentStep?: number;
  totalSteps?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  labelClassName?: string;
  percentageClassName?: string;
  trackClassName?: string;
  fillClassName?: string;
}

const resolveProgressValue = (
  value: number | undefined,
  currentStep: number | undefined,
  totalSteps: number | undefined
): number => {
  if (value !== undefined) {
    return clampProgress(value);
  }
  if (
    currentStep !== undefined &&
    totalSteps !== undefined &&
    totalSteps > 0
  ) {
    return getStepProgress(currentStep, totalSteps);
  }
  return 0;
};

/**
 * Reusable application progress: label, percentage, and bar.
 * Pass `value` for field-based progress or `currentStep` + `totalSteps` for wizards.
 */
const ApplicationProgress = ({
  value,
  currentStep,
  totalSteps,
  label = 'Application Progress',
  showPercentage = true,
  className,
  labelClassName,
  percentageClassName,
  trackClassName,
  fillClassName,
}: ApplicationProgressProps): React.ReactNode => {
  const progress = useMemo(
    () => resolveProgressValue(value, currentStep, totalSteps),
    [value, currentStep, totalSteps]
  );

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            'text-sm font-semibold text-brand-primary',
            labelClassName
          )}
        >
          {label}
        </span>
        {showPercentage && (
          <span
            className={cn(
              'text-sm font-medium text-gray-900 tabular-nums',
              percentageClassName
            )}
          >
            {progress}%
          </span>
        )}
      </div>
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn(
          'h-2 w-full rounded-full bg-brand-100 overflow-hidden',
          trackClassName
        )}
      >
        <div
          className={cn(
            'h-full rounded-full bg-brand-primary transition-all duration-300',
            fillClassName
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ApplicationProgress;
