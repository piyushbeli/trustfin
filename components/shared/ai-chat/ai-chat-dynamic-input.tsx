'use client';

import { JSX } from 'react';
import type { AiChatNextFieldConfig } from '@/types/ai-chat';
import DateInput from './inputs/date-input';
import NumberInput from './inputs/number-input';
import SelectChips from './inputs/select-chips';
import TextInput from './inputs/text-input';

interface AiChatDynamicInputProps {
  nextFieldConfig: AiChatNextFieldConfig | null;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSelectChip: (value: string) => void;
}

const AiChatDynamicInput = ({
  nextFieldConfig,
  value,
  placeholder,
  disabled,
  onChange,
  onSubmit,
  onSelectChip,
}: AiChatDynamicInputProps): JSX.Element | null => {
  if (!nextFieldConfig) {
    return (
      <TextInput
        value={value}
        disabled={disabled}
        placeholder={placeholder ?? 'Type your message...'}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  }

  switch (nextFieldConfig.inputType) {
    case 'select':
      return (
        <SelectChips
          options={nextFieldConfig.options}
          disabled={disabled}
          onSelect={onSelectChip}
        />
      );
    case 'number':
      return (
        <NumberInput
          value={value}
          disabled={disabled}
          placeholder={nextFieldConfig.placeholder}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      );
    case 'date':
      return (
        <DateInput
          value={value}
          disabled={disabled}
          placeholder={nextFieldConfig.placeholder}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      );
    default:
      return (
        <TextInput
          value={value}
          disabled={disabled}
          placeholder={nextFieldConfig.placeholder}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      );
  }
};

export default AiChatDynamicInput;
