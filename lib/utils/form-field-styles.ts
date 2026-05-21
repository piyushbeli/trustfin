import { cn } from '@/lib/utils';

/** Hides number input spinners in WebKit browsers. */
export const LEAD_FORM_NUMBER_INPUT_CLASSES =
  '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

interface LeadFormControlClassOptions {
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

/**
 * Shared class names for loan form text/select/date inputs (brand fill + focus).
 */
export const getLeadFormControlClassName = ({
  error,
  disabled,
  readOnly,
  className,
}: LeadFormControlClassOptions = {}): string =>
  cn(
    'lead-form-control',
    LEAD_FORM_NUMBER_INPUT_CLASSES,
    error && 'lead-form-control-error',
    (disabled || readOnly) && 'lead-form-control-disabled',
    className
  );

interface LeadFormSegmentClassOptions {
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Shared class names for segmented button groups (gender, employment, etc.).
 */
export const getLeadFormSegmentClassName = ({
  selected,
  disabled,
  className,
}: LeadFormSegmentClassOptions = {}): string =>
  cn(
    'lead-form-segment',
    selected && 'lead-form-segment-selected',
    disabled && 'lead-form-control-disabled',
    className
  );
