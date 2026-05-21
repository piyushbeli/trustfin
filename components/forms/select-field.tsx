/**
 * Select Field Component
 * Reusable select dropdown with label, helper text, and error handling
 */

import { cn } from '@/lib/utils';
import { getLeadFormControlClassName } from '@/lib/utils/form-field-styles';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options: SelectOption[];
}

const SelectField = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  placeholder,
  helperText,
  required,
  options,
}: SelectFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="lead-form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            getLeadFormControlClassName({ error, disabled }),
            'appearance-none pr-10 cursor-pointer'
          )}
        >
          <option value="" disabled>
            {placeholder || `Select ${label}`}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>

      {helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default SelectField;
