'use client';

import { JSX } from 'react';
import { ArrowRight } from 'lucide-react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import type { AiChatNextFieldConfig } from '@/types/ai-chat';
import AiChatDynamicInput from './ai-chat-dynamic-input';

interface AiChatInputBarProps {
  inputValue: string;
  inputError: string | null;
  inputPlaceholder?: string;
  nextFieldConfig: AiChatNextFieldConfig | null;
  showSelectChips: boolean;
  isSubmitting: boolean;
  isCompleted: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSelectChip: (value: string) => void;
}

const AiChatInputBar = ({
  inputValue,
  inputError,
  inputPlaceholder,
  nextFieldConfig,
  showSelectChips,
  isSubmitting,
  isCompleted,
  onChange,
  onSubmit,
  onSelectChip,
}: AiChatInputBarProps): JSX.Element => {
  const defaultPlaceholder =
    inputPlaceholder ?? nextFieldConfig?.placeholder ?? AI_CHAT_COPY.fallbackPlaceholder;

  if (showSelectChips && nextFieldConfig) {
    const selectHint = nextFieldConfig.placeholder || AI_CHAT_COPY.chipsPlaceholder;

    return (
      <div className="border-t border-brand-100 pt-3">
        <AiChatDynamicInput
          value={inputValue}
          nextFieldConfig={nextFieldConfig}
          showSelectChips
          disabled={isCompleted}
          onChange={onChange}
          onSubmit={onSubmit}
          onSelectChip={onSelectChip}
        />
        <div className="px-4 pb-3">
          <div className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-gray-400">
            {selectHint}
          </div>
          {inputError ? <p className="mt-2 text-sm text-red-500">{inputError}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-brand-100 p-4">
      <div className="flex items-center gap-2 rounded-xl bg-brand-50 p-2">
        <div className="flex-1">
          <AiChatDynamicInput
            value={inputValue}
            nextFieldConfig={nextFieldConfig}
            showSelectChips={false}
            placeholder={defaultPlaceholder}
            disabled={isSubmitting || isCompleted}
            onChange={onChange}
            onSubmit={onSubmit}
            onSelectChip={onSelectChip}
          />
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || isCompleted || !inputValue.trim()}
          className="wc-hero-cta-gradient rounded-xl p-3 text-white disabled:opacity-60"
          aria-label="Send message"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AiChatInputBar;
