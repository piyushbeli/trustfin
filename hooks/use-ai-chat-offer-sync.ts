'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import {
  persistChatOfferForChat,
  runCheckStatusForChat,
} from '@/lib/ai-chat/offer-sync/run-check-and-save-offer';
import { normalizeBotStage, shouldPollOffersInChat } from '@/lib/ai-chat/normalize-bot-stage';
import {
  canRunChatOfferSync,
  resolveChatOfferSyncCredentials,
} from '@/lib/ai-chat/resolve-chat-offer-sync-credentials';
import { useOfferStatusPolling } from '@/hooks/use-offer-status-polling';
import { newPLEnabled } from '@/hooks/use-offers';
import type { LenderOfferStatus } from '@/types/wecredit';

interface UseAiChatOfferSyncParams {
  stage: string | null | undefined;
  userId: string;
  mobile?: string;
  responseMobile?: string;
  responseToken?: string;
  isOpen: boolean;
  isLoadingHistory?: boolean;
  sessionUserId?: string;
  offerSyncTrigger?: number;
  historyHasOfferMessages: boolean;
  /** Called once offers are ready — injects offer_list directly into chat state (no history reload). */
  onOffersReady: (offers: LenderOfferStatus[], canReHit: boolean) => void;
}

/**
 * Offer-sync polling hook — runs only when session.stage is `completed`.
 *
 * Triggered from useAiChat via offerSyncTrigger (chat-query `completed`) or chat-history on reopen.
 * Loop: check-status-all (15s, max 90s) → chat-offer persist → onOffersReady injects offer_list.
 * Polling stops once offers are in chat state; `offer_received` is downstream and does not poll.
 */
export function useAiChatOfferSync({
  stage,
  userId,
  mobile,
  responseMobile,
  responseToken,
  isOpen,
  isLoadingHistory = false,
  sessionUserId,
  offerSyncTrigger = 0,
  historyHasOfferMessages,
  onOffersReady,
}: UseAiChatOfferSyncParams): {
  isOfferPolling: boolean;
  isCheckingOfferStatus: boolean;
} {
  const [isPolling, setIsPolling] = useState(false);
  const [isCheckingOfferStatus, setIsCheckingOfferStatus] = useState(false);
  const pollSnapshotRef = useRef({ lenderCount: 0, canReHit: true });
  const hasPersistedChatOfferRef = useRef(false);
  const prevTriggerRef = useRef(offerSyncTrigger);
  const startPollingRef = useRef<() => void>(() => undefined);
  const stopPollingRef = useRef<() => void>(() => undefined);

  const onPollTick = useCallback(
    async (signal: AbortSignal): Promise<void> => {
      const credentials = resolveChatOfferSyncCredentials({
        phoneNumber: mobile,
        chatUserId: userId,
        sessionUserId,
        responseMobile,
        responseToken,
      });
      const { mobile: resolvedMobile, token } = credentials;

      if (!canRunChatOfferSync(credentials)) {
        logAiChat('offer-sync', 'poll skipped — missing mobile', { userId });
        return;
      }

      setIsCheckingOfferStatus(true);

      try {
        const checkResult = await runCheckStatusForChat({
          mobile: resolvedMobile!,
          token: token ?? '',
          userId,
          signal,
        });

        pollSnapshotRef.current = {
          lenderCount: checkResult.lenderCount,
          canReHit: checkResult.canReHit,
        };

        if (!checkResult.success || !checkResult.data) {
          logAiChat('offer-sync', 'poll tick — check-status failed or empty', {
            userId,
            error: checkResult.error ?? null,
          });
          return;
        }

        if (checkResult.lenderCount === 0) {
          // Lenders still pending — keep polling until check-status returns data or 90s cap.
          return;
        }

        if (hasPersistedChatOfferRef.current) {
          // chat-offer already saved; inject if UI lost the offer_list (e.g. remount) without re-persisting.
          if (!historyHasOfferMessages) {
            onOffersReady(checkResult.data.lenders ?? [], checkResult.canReHit);
          }
          return;
        }

        const persistResult = await persistChatOfferForChat({
          mobile: resolvedMobile!,
          userId,
          checkStatusResponse: checkResult.data,
          signal,
        });

        // Only mark done when persist succeeds — stop rule below keys off this ref + UI state.
        if (persistResult.success) {
          hasPersistedChatOfferRef.current = true;
          onOffersReady(checkResult.data.lenders ?? [], checkResult.canReHit);
        }
      } finally {
        setIsCheckingOfferStatus(false);
      }
    },
    [historyHasOfferMessages, mobile, onOffersReady, responseMobile, responseToken, sessionUserId, userId],
  );

  const shouldStopChatOfferPolling = useCallback((): boolean => {
    // Keep polling until offers are injected into chat state (not just when lenders exist in API).
    if (!historyHasOfferMessages && !hasPersistedChatOfferRef.current) {
      return false;
    }

    const { lenderCount, canReHit } = pollSnapshotRef.current;

    if (newPLEnabled) {
      return lenderCount > 0;
    }

    return lenderCount > 0 && !canReHit;
  }, [historyHasOfferMessages]);

  const { startPolling, stopPolling } = useOfferStatusPolling({
    isPolling,
    setIsPolling,
    onPollTick,
    shouldStopPolling: shouldStopChatOfferPolling,
  });

  startPollingRef.current = startPolling;
  stopPollingRef.current = stopPolling;

  // Gate polling: stage must be `completed`, mobile resolved, and offers not already in messages.
  useEffect(() => {
    const credentials = resolveChatOfferSyncCredentials({
      phoneNumber: mobile,
      chatUserId: userId,
      sessionUserId,
      responseMobile,
      responseToken,
    });
    const { mobile: resolvedMobile } = credentials;
    const stageReady = shouldPollOffersInChat(stage);
    // Allow polling on `completed` even during a background history refresh (post-login).
    const historyReady = !isLoadingHistory || stageReady;
    // offerSyncTrigger bump from requestOfferSync() — chat-query `completed` or history reopen.
    const isExplicitTrigger = offerSyncTrigger !== prevTriggerRef.current;
    prevTriggerRef.current = offerSyncTrigger;

    const shouldRun =
      isOpen &&
      stageReady &&
      historyReady &&
      canRunChatOfferSync(credentials) &&
      (isExplicitTrigger || !historyHasOfferMessages);

    if (!shouldRun) {
      logAiChat('offer-sync', 'polling blocked', {
        userId,
        stage: normalizeBotStage(stage),
        isLoadingHistory,
        hasMobile: Boolean(resolvedMobile),
        historyHasOfferMessages,
      });
      stopPollingRef.current();
      hasPersistedChatOfferRef.current = false;
      return;
    }

    if (isExplicitTrigger) {
      // Fresh chat-query `completed` — allow a new chat-offer persist cycle.
      hasPersistedChatOfferRef.current = false;
    }

    logAiChat('offer-sync', 'polling started', { userId, stage: normalizeBotStage(stage) });
    // Refs avoid restarting the loop when onPollTick identity changes (would cancel the 15s timer).
    startPollingRef.current();

    return () => {
      stopPollingRef.current();
    };
  }, [
    historyHasOfferMessages,
    isLoadingHistory,
    isOpen,
    mobile,
    offerSyncTrigger,
    responseMobile,
    responseToken,
    sessionUserId,
    stage,
    userId,
  ]);

  return { isOfferPolling: isPolling, isCheckingOfferStatus };
}
