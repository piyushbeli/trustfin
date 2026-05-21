/**
 * Input Field Component
 * Reusable form input with label, helper text, and error handling
 */

import { getLeadFormControlClassName } from '@/lib/utils/form-field-styles';

interface InputFieldProps {
  label: string;
  /** Associates a visible <label htmlFor="..."> with this control; required for autofill hints in DevTools. */
  id?: string;
  /** Submitted field name; also helps browsers autofill when paired with autocomplete. */
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  helperText?: string;
  type?: string;
  inputMode?: 'text' | 'numeric' | 'email' | 'tel';
  maxLength?: number;
  required?: boolean;
  autoComplete?: string;
}

const InputField = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  readOnly,
  placeholder,
  helperText,
  type = 'text',
  inputMode = 'text',
  maxLength,
  autoComplete,
}: InputFieldProps) => {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && errorId ? errorId : undefined}
        className={getLeadFormControlClassName({ error, disabled, readOnly })}
      />

      {helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}

      {error && (
        <p id={errorId} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
