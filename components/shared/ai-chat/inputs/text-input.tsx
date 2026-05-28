'use client';

import { JSX } from 'react';

interface TextInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const TextInput = ({
  value,
  placeholder,
  disabled,
  onChange,
  onSubmit,
}: TextInputProps): JSX.Element => {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onSubmit();
        }
      }}
      className="w-full border-0 bg-transparent px-3 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
      placeholder={placeholder}
    />
  );
};

export default TextInput;
