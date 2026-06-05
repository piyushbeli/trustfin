'use client';

import { useCallback, useEffect, useRef, type RefObject } from 'react';
import type { AiChatRenderableMessage } from '@/types/ai-chat';

interface UseAiChatAutoScrollParams {
  messages: AiChatRenderableMessage[];
  showTypingIndicator?: boolean;
  showOfferPolling?: boolean;
  isLoadingHistory?: boolean;
}

interface UseAiChatAutoScrollResult {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

/** Scrolls the chat container to the true bottom (more reliable than scrollIntoView on a sentinel). */
const scrollContainerToBottom = (container: HTMLDivElement, behavior: ScrollBehavior): void => {
  const top = container.scrollHeight - container.clientHeight;
  if (behavior === 'smooth') {
    container.scrollTo({ top, behavior: 'smooth' });
    return;
  }
  container.scrollTop = top;
};

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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInitialMountRef = useRef(true);
  const prevMessageCountRef = useRef(0);
  const prevLastMessageIdRef = useRef<string | undefined>(undefined);
  const prevIsLoadingHistoryRef = useRef(isLoadingHistory);
  const pinToBottomAfterLayoutRef = useRef(false);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto'): void => {
    const container = scrollContainerRef.current;
    if (!container) return;
    scrollContainerToBottom(container, behavior);
  }, []);

  const scheduleScrollToBottom = useCallback(
    (behavior: ScrollBehavior, isHistoryReveal: boolean): (() => void) => {
      const run = (): void => scrollToBottom(behavior);

      // Double rAF lets layout settle after React commit before measuring scrollHeight.
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(run);
      });

      const retryTimeouts: ReturnType<typeof setTimeout>[] = [];
      if (isHistoryReveal) {
        // Offer cards and long assistant bubbles can shift height after the first paint.
        retryTimeouts.push(setTimeout(run, 100));
        retryTimeouts.push(setTimeout(run, 300));
      }

      return () => {
        cancelAnimationFrame(rafId);
        retryTimeouts.forEach(clearTimeout);
      };
    },
    [scrollToBottom],
  );

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

    if (isHistoryReveal) {
      pinToBottomAfterLayoutRef.current = true;
    }

    const behavior: ScrollBehavior = isHistoryReveal ? 'auto' : 'smooth';
    return scheduleScrollToBottom(behavior, isHistoryReveal);
  }, [
    messages,
    scheduleScrollToBottom,
    showOfferPolling,
    showTypingIndicator,
    isLoadingHistory,
  ]);

  // After history reveal, keep pinned to bottom while embedded offer cards/images resize.
  useEffect(() => {
    if (!pinToBottomAfterLayoutRef.current || isLoadingHistory || messages.length === 0) {
      return;
    }

    const container = scrollContainerRef.current;
    const content = contentRef.current;
    if (!container || !content) {
      return;
    }

    let rafId = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => scrollToBottom('auto'));
    });

    observer.observe(content);
    const disconnectTimeout = setTimeout(() => {
      observer.disconnect();
      pinToBottomAfterLayoutRef.current = false;
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(disconnectTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [isLoadingHistory, messages.length, scrollToBottom]);

  return { scrollContainerRef, contentRef };
}
