'use client';

import { JSX } from 'react';
import TextInput from './text-input';

interface DateInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const DateInput = (props: DateInputProps): JSX.Element => {
  return <TextInput {...props} />;
};

export default DateInput;
