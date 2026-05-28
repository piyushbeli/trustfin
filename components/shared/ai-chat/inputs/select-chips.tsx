'use client';

import { JSX } from 'react';
import type { AiChatOption } from '@/types/ai-chat';

interface SelectChipsProps {
  options: AiChatOption[];
  disabled?: boolean;
  onSelect: (value: string) => void;
}

const SelectChips = ({ options, disabled, onSelect }: SelectChipsProps): JSX.Element => {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option.value)}
          className="wc-ai-chat-chip rounded-full px-4 py-2.5 text-base font-semibold text-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SelectChips;
