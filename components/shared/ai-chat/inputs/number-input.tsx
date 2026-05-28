'use client';

import { JSX } from 'react';
import TextInput from './text-input';

interface NumberInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const NumberInput = (props: NumberInputProps): JSX.Element => {
  return (
    <TextInput
      {...props}
      onChange={(nextValue) => {
        const numericValue = nextValue.replace(/[^\d]/g, '');
        props.onChange(numericValue);
      }}
    />
  );
};

export default NumberInput;
