'use client';

import { JSX } from 'react';
import type { AiChatNextFieldConfig } from '@/types/ai-chat';
import AiChatInputBar from './ai-chat-input-bar';

interface AiChatModalFooterProps {
  errorMessage: string | null;
  inputValue: string;
  inputError: string | null;
  inputPlaceholder?: string;
  nextFieldConfig: AiChatNextFieldConfig | null;
  showSelectChips: boolean;
  isSubmitting: boolean;
  isChatInputDisabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSelectChip: (value: string) => void;
}

const AiChatModalFooter = ({
  errorMessage,
  inputValue,
  inputError,
  inputPlaceholder,
  nextFieldConfig,
  showSelectChips,
  isSubmitting,
  isChatInputDisabled,
  onChange,
  onSubmit,
  onSelectChip,
}: AiChatModalFooterProps): JSX.Element => {
  return (
    <>
      {errorMessage ? <p className="px-4 pb-2 text-sm text-red-500">{errorMessage}</p> : null}
      <AiChatInputBar
        inputValue={inputValue}
        inputError={inputError}
        inputPlaceholder={inputPlaceholder}
        nextFieldConfig={nextFieldConfig}
        showSelectChips={showSelectChips}
        isSubmitting={isSubmitting}
        isChatInputDisabled={isChatInputDisabled}
        onChange={onChange}
        onSubmit={onSubmit}
        onSelectChip={onSelectChip}
      />
    </>
  );
};

export default AiChatModalFooter;
