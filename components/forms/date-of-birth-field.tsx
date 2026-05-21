/**
 * Reusable Date of Birth field component.
 * Handles common formatting, label, and error rendering for DOB inputs.
 */
'use client';

import { getLeadFormControlClassName } from '@/lib/utils/form-field-styles';
import {
  dobToNativeFormat,
  formatDobForDisplay,
  getDobMaxDate,
  normalizeDobTextInput,
} from '@/lib/utils/form-helpers';

/**
 * iOS Safari date inputs are inconsistent with max/min constraints inside modals.
 * Use a text input fallback to keep DOB entry predictable.
 */
function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isAppleMobile = /iPad|iPhone|iPod/.test(ua);
  const isIpadOs = ua.includes('Mac') && navigator.maxTouchPoints > 1;
  return isAppleMobile || isIpadOs;
}

interface DateOfBirthFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
}

const DateOfBirthField = ({
  id,
  value,
  onChange,
  onBlur,
  error,
  hint,
}: DateOfBirthFieldProps): React.ReactNode => {
  const isIos = isIOSDevice();
  const nativeDisplayValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value
    : dobToNativeFormat(value);
  const textDisplayValue = formatDobForDisplay(value);
  const maxDobDate = getDobMaxDate(18);

  return (
    <div>
      <label htmlFor={id} className="lead-form-label">
        Date of Birth <span className="text-red-500">*</span>
      </label>
      <input
        id={id}
        name="dob"
        type={isIos ? 'text' : 'date'}
        inputMode={isIos ? 'numeric' : undefined}
        placeholder={isIos ? 'DD-MM-YYYY' : 'MM/DD/YYYY'}
        maxLength={isIos ? 10 : undefined}
        value={isIos ? textDisplayValue : nativeDisplayValue}
        onChange={(event) => {
          const nextValue = isIos
            ? normalizeDobTextInput(event.target.value)
            : event.target.value;
          onChange(nextValue);
        }}
        onBlur={onBlur}
        max={isIos ? undefined : maxDobDate}
        className={getLeadFormControlClassName({ error })}
      />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default DateOfBirthField;
