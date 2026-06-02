'use client';

import { JSX, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { useAiChat } from '@/hooks/use-ai-chat';
import { useAiChatStore } from '@/stores/ai-chat-store';
import AiChatHeader from './ai-chat-header';
import AiChatModalBody from './ai-chat-modal-body';
import AiChatModalFooter from './ai-chat-modal-footer';
import AiChatSecureBadge from './ai-chat-secure-badge';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { getAiChatViewMode } from './ai-chat-view';

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
    showSelectChips,
    phaseLabel,
    progressCurrent,
    progressTotal,
    isCompleted,
    isEscalated,
    showGuestWelcome,
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
    // if (isCompleted) return AI_CHAT_COP
    // Y.completedMessage;
    return null;
  }, [isCompleted, isEscalated]);

  const displayMessages = useMemo(
    () =>
      systemMessage
        ? [...messages, { id: 'system_message', role: 'assistant' as const, text: systemMessage }]
        : messages,
    [messages, systemMessage],
  );

  const viewMode = getAiChatViewMode({
    isInitialLoading: isLoadingHistory && !isSubmitting,
    showGuestWelcome,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    logAiChat('modal', 'view mode resolved', {
      viewMode,
      isLoadingHistory,
      isSubmitting,
      showGuestWelcome,
      messageCount: messages.length,
    });
  }, [isOpen, isLoadingHistory, isSubmitting, messages.length, showGuestWelcome, viewMode]);

  const isInputDisabled = isSubmitting;

  const handleInputChange = (value: string): void => {
    resetInputError();
    setInputValue(value);
  };

  const handleSubmit = (): void => {
    void submitInput();
  };

  const handleSelectChip = (value: string): void => {
    void submitChip(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-center bg-black/35 items-center">
      <div
        className="absolute inset-0"
        onClick={closeModal}
        role="button"
        aria-label="Close chat overlay"
        tabIndex={-1}
      />
      <div className="relative z-10 h-full md:h-[92vh] w-full md:w-4/5 lg:w-1/2 md:rounded-t-3xl border border-brand-200 bg-white shadow-2xl md:rounded-3xl">
        <div className="flex h-full flex-col overflow-hidden">
          <AiChatHeader onClose={closeModal} />
          {/* {viewMode !== 'login' ? (
            <AiChatProgress current={progressCurrent} total={progressTotal} phaseLabel={phaseLabel} />
          ) : null} */}
          <AiChatModalBody
            viewMode={viewMode}
            messages={displayMessages}
            showTypingIndicator={isSubmitting}
          />
          <AiChatModalFooter
            errorMessage={errorMessage}
            inputValue={inputValue}
            inputError={inputError}
            inputPlaceholder={undefined}
            nextFieldConfig={nextFieldConfig}
            showSelectChips={showSelectChips}
            isSubmitting={isInputDisabled}
            isCompleted={isEscalated}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onSelectChip={handleSelectChip}
          />
          <AiChatSecureBadge />
        </div>
      </div>
    </div>
  );
};

export default AiChatModal;
