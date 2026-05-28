'use client';

import { JSX } from 'react';
import { ActionButton } from '@/components/shared';
import type { AiChatNextFieldConfig } from '@/types/ai-chat';
import AiChatInputBar from './ai-chat-input-bar';
import type { AiChatViewMode } from './ai-chat-view';

interface AiChatModalFooterProps {
  viewMode: AiChatViewMode;
  errorMessage: string | null;
  inputValue: string;
  inputError: string | null;
  nextFieldConfig: AiChatNextFieldConfig | null;
  isSubmitting: boolean;
  isCompleted: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSelectChip: (value: string) => void;
  onBackToChat: () => void;
}

const AiChatModalFooter = ({
  viewMode,
  errorMessage,
  inputValue,
  inputError,
  nextFieldConfig,
  isSubmitting,
  isCompleted,
  onChange,
  onSubmit,
  onSelectChip,
  onBackToChat,
}: AiChatModalFooterProps): JSX.Element => {
  const showInputBar = viewMode !== 'login';

  return (
    <>
      {errorMessage ? <p className="px-4 pb-2 text-sm text-red-500">{errorMessage}</p> : null}
      {showInputBar ? (
        <AiChatInputBar
          inputValue={inputValue}
          inputError={inputError}
          nextFieldConfig={nextFieldConfig}
          isSubmitting={isSubmitting}
          isCompleted={isCompleted}
          onChange={onChange}
          onSubmit={onSubmit}
          onSelectChip={onSelectChip}
        />
      ) : (
        <div className="border-t border-brand-100 px-4 py-3">
          <ActionButton
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBackToChat}
            className="h-auto p-0 text-sm font-medium text-brand-primary hover:bg-transparent"
          >
            Back to chat
          </ActionButton>
        </div>
      )}
    </>
  );
};

export default AiChatModalFooter;
