'use client';

import { JSX } from 'react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import type { AiChatNextFieldConfig } from '@/types/ai-chat';
import SelectChips from './inputs/select-chips';
import TextInput from './inputs/text-input';

interface AiChatDynamicInputProps {
  nextFieldConfig: AiChatNextFieldConfig | null;
  showSelectChips?: boolean;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  shouldAutoFocus?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSelectChip: (value: string) => void;
}

const AiChatDynamicInput = ({
  nextFieldConfig,
  showSelectChips = false,
  value,
  placeholder,
  disabled,
  shouldAutoFocus = false,
  onChange,
  onSubmit,
  onSelectChip,
}: AiChatDynamicInputProps): JSX.Element | null => {
  if (nextFieldConfig?.inputType === 'select' && showSelectChips) {
    return (
      <SelectChips
        options={nextFieldConfig.options}
        disabled={disabled}
        onSelect={onSelectChip}
      />
    );
  }

  return (
    <TextInput
      value={value}
      disabled={disabled}
      shouldAutoFocus={shouldAutoFocus}
      placeholder={placeholder ?? AI_CHAT_COPY.fallbackPlaceholder}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default AiChatDynamicInput;
