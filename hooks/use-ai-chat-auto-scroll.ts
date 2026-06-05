'use client';

import { useEffect, useRef, type RefObject } from 'react';
import type { AiChatRenderableMessage } from '@/types/ai-chat';

interface UseAiChatAutoScrollParams {
  messages: AiChatRenderableMessage[];
  showTypingIndicator?: boolean;
  showOfferPolling?: boolean;
  isLoadingHistory?: boolean;
}

interface UseAiChatAutoScrollResult {
  endRef: RefObject<HTMLDivElement | null>;
}

/**
 * Scrolls the chat thread to the latest content when appropriate.
 * Skips scroll for in-place offer patches (same message count + last id).
 * Always scrolls on initial history render and when history finishes loading.
 */
export function useAiChatAutoScroll({
  messages,
  showTypingIndicator = false,
  showOfferPolling = false,
  isLoadingHistory = false,
}: UseAiChatAutoScrollParams): UseAiChatAutoScrollResult {
  const endRef = useRef<HTMLDivElement | null>(null);
  const isInitialMountRef = useRef(true);
  const prevMessageCountRef = useRef(0);
  const prevLastMessageIdRef = useRef<string | undefined>(undefined);
  const prevIsLoadingHistoryRef = useRef(isLoadingHistory);

  useEffect(() => {
    const messageCount = messages.length;
    const lastMessageId = messages[messageCount - 1]?.id;
    const wasLoadingHistory = prevIsLoadingHistoryRef.current;
    const historyJustLoaded = wasLoadingHistory && !isLoadingHistory && messageCount > 0;

    const hasNewMessage =
      messageCount > prevMessageCountRef.current ||
      lastMessageId !== prevLastMessageIdRef.current;

    prevMessageCountRef.current = messageCount;
    prevLastMessageIdRef.current = lastMessageId;
    prevIsLoadingHistoryRef.current = isLoadingHistory;

    const shouldScrollToLatest =
      (isInitialMountRef.current && messageCount > 0) ||
      historyJustLoaded ||
      hasNewMessage ||
      showOfferPolling ||
      showTypingIndicator;

    if (!shouldScrollToLatest) {
      if (isInitialMountRef.current) {
        isInitialMountRef.current = false;
      }
      return;
    }

    const isHistoryReveal =
      (isInitialMountRef.current && messageCount > 0) || historyJustLoaded;

    isInitialMountRef.current = false;

    // Instant scroll on history load avoids a visible jump from the top of the thread.
    endRef.current?.scrollIntoView({
      behavior: isHistoryReveal ? 'auto' : 'smooth',
      block: 'end',
    });
  }, [messages, showOfferPolling, showTypingIndicator, isLoadingHistory]);

  return { endRef };
}
