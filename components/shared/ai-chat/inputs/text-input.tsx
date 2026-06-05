'use client';

import { JSX } from 'react';
import { useInputAutoFocus } from '@/hooks/use-input-auto-focus';

interface TextInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  shouldAutoFocus?: boolean;
  isSubmitting?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const TextInput = ({
  value,
  placeholder,
  disabled,
  shouldAutoFocus = false,
  isSubmitting = false,
  onChange,
  onSubmit,
}: TextInputProps): JSX.Element => {
  const { inputRef, restoreFocusOnBlur } = useInputAutoFocus({
    shouldAutoFocus,
    disabled,
    isSubmitting,
  });

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      disabled={disabled}
      enterKeyHint="send"
      onChange={(event) => onChange(event.target.value)}
      onBlur={restoreFocusOnBlur}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onSubmit();
        }
      }}
      className="w-full border-0 bg-transparent px-3 py-3 text-base text-gray-700 placeholder:text-gray-400 focus:outline-none"
      placeholder={placeholder}
    />
  );
};

export default TextInput;
