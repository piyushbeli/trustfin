'use client';

import { JSX, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { useAppHeight } from '@/hooks/use-app-height';
import { useAiChat } from '@/hooks/use-ai-chat';
import { useAiChatStore } from '@/stores/ai-chat-store';
import {
  MOBILE_MODAL_BODY,
  MOBILE_MODAL_FOOTER_CLUSTER,
  MOBILE_MODAL_FOOTER_SAFE,
  MOBILE_MODAL_OVERLAY,
  MOBILE_MODAL_PANEL,
} from '@/lib/utils/mobile-modal-layout';
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
  // Sets --app-height / --keyboard-inset-bottom; height is applied via Tailwind (not inline) so md:h-[92vh] can center on desktop.
  useAppHeight();
  const {
    messages,
    chatUserId,
    isLoadingHistory,
    isSubmitting,
    errorMessage,
    inputValue,
    inputError,
    nextFieldConfig,
    showSelectChips,
    isChatInputDisabled,
    isEscalated,
    showGuestWelcome,
    showOfferPolling,
    isCheckingOfferStatus,
    onLiveOffersUpdated,
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
    return null;
  }, [isEscalated]);

  const displayMessages = useMemo(
    () =>
      systemMessage
        ? [
            ...messages,
            {
              kind: 'text' as const,
              id: 'system_message',
              role: 'assistant' as const,
              text: systemMessage,
            },
          ]
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
    <div
      className={`${MOBILE_MODAL_OVERLAY} items-stretch justify-center bg-black/35 md:items-center md:p-6`}
    >
      <div
        className="absolute inset-0"
        onClick={closeModal}
        role="button"
        aria-label="Close chat overlay"
        tabIndex={-1}
      />
      <div
        className={`${MOBILE_MODAL_PANEL} h-[calc(var(--app-height,1vh)*100)] max-h-[100dvh] border border-brand-200 shadow-2xl md:h-[92vh] md:max-h-[92vh] md:w-4/5 md:rounded-3xl lg:w-1/2`}
      >
        <div className="flex h-full flex-col overflow-hidden">
          <AiChatHeader onClose={closeModal} />
          <div className={MOBILE_MODAL_BODY}>
            <AiChatModalBody
              viewMode={viewMode}
              messages={displayMessages}
              chatUserId={chatUserId}
              showTypingIndicator={isSubmitting}
              showOfferPolling={showOfferPolling}
              isCheckingOfferStatus={isCheckingOfferStatus}
              onLiveOffersUpdated={onLiveOffersUpdated}
            />
          </div>
          <div className={`${MOBILE_MODAL_FOOTER_CLUSTER} ${MOBILE_MODAL_FOOTER_SAFE}`}>
            <AiChatModalFooter
              errorMessage={errorMessage}
              inputValue={inputValue}
              inputError={inputError}
              inputPlaceholder={undefined}
              nextFieldConfig={nextFieldConfig}
              showSelectChips={showSelectChips}
              isSubmitting={isInputDisabled}
              isChatInputDisabled={isChatInputDisabled}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onSelectChip={handleSelectChip}
            />
            <AiChatSecureBadge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatModal;
