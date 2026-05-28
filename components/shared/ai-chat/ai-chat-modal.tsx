'use client';

import { JSX, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat-copy';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { useAiChat } from '@/hooks/use-ai-chat';
import { useAiChatStore } from '@/stores/ai-chat-store';
import AiChatHeader from './ai-chat-header';
import AiChatInputBar from './ai-chat-input-bar';
import AiChatMessageList from './ai-chat-message-list';
import AiChatProgress from './ai-chat-progress';
import AiChatSecureBadge from './ai-chat-secure-badge';

const AiChatModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useAiChatStore();
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);
  const {
    messages,
    isLoadingHistory,
    isSubmitting,
    errorMessage,
    inputValue,
    inputError,
    nextFieldConfig,
    phaseLabel,
    progressCurrent,
    progressTotal,
    isCompleted,
    isEscalated,
    setInputValue,
    submitInput,
    submitChip,
    resetInputError,
  } = useAiChat(isOpen);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      previousPathnameRef.current = pathname;
      return;
    }

    if (previousPathnameRef.current && previousPathnameRef.current !== pathname) {
      closeModal();
    }
    previousPathnameRef.current = pathname;
  }, [closeModal, isOpen, pathname]);

  const systemMessage = useMemo(() => {
    if (isEscalated) return AI_CHAT_COPY.escalateMessage;
    if (isCompleted) return AI_CHAT_COPY.completedMessage;
    return null;
  }, [isCompleted, isEscalated]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center bg-black/35 sm:items-center">
      <div
        className="absolute inset-0"
        onClick={closeModal}
        role="button"
        aria-label="Close chat overlay"
        tabIndex={-1}
      />
      <div className="relative z-10 h-[92vh] w-full max-w-md rounded-t-3xl border border-brand-200 bg-white shadow-2xl sm:h-[86vh] sm:rounded-3xl">
        <div className="flex h-full flex-col overflow-hidden">
          <AiChatHeader onClose={closeModal} />
          <AiChatProgress current={progressCurrent} total={progressTotal} phaseLabel={phaseLabel} />
          {isLoadingHistory ? (
            <div className="flex flex-1 items-center justify-center px-4 text-sm text-gray-500">
              {AI_CHAT_COPY.loadingMessage}
            </div>
          ) : (
            <AiChatMessageList
              messages={
                systemMessage
                  ? [...messages, { id: 'system_message', role: 'assistant', text: systemMessage }]
                  : messages
              }
            />
          )}
          {errorMessage ? (
            <p className="px-4 pb-2 text-sm text-red-500">{errorMessage}</p>
          ) : null}
          <AiChatInputBar
            inputValue={inputValue}
            inputError={inputError}
            nextFieldConfig={nextFieldConfig}
            isSubmitting={isSubmitting}
            isCompleted={isCompleted || isEscalated}
            onChange={(value) => {
              resetInputError();
              setInputValue(value);
            }}
            onSubmit={() => {
              void submitInput();
            }}
            onSelectChip={(value) => {
              void submitChip(value);
            }}
          />
          <AiChatSecureBadge />
        </div>
      </div>
    </div>
  );
};

export default AiChatModal;
