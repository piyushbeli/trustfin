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
 * When session stage is `completed`: poll check-status-all, persist via chat-offer,
 * then inject the offer_list message directly into chat state via onOffersReady.
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
          return;
        }

        if (hasPersistedChatOfferRef.current) {
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
    const { lenderCount, canReHit } = pollSnapshotRef.current;

    if (newPLEnabled) {
      return lenderCount > 0;
    }

    return lenderCount > 0 && !canReHit;
  }, []);

  const { startPolling, stopPolling } = useOfferStatusPolling({
    isPolling,
    setIsPolling,
    onPollTick,
    shouldStopPolling: shouldStopChatOfferPolling,
  });

  // Start/stop polling when modal opens on `completed` stage (same 15s / 90s loop as offers page).
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
    // Explicit trigger (requestOfferSync) means we know offers aren't in state yet.
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
      stopPolling();
      hasPersistedChatOfferRef.current = false;
      return;
    }

    hasPersistedChatOfferRef.current = false;
    logAiChat('offer-sync', 'polling started', { userId, stage: normalizeBotStage(stage) });
    startPolling();

    return () => {
      stopPolling();
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
    startPolling,
    stopPolling,
    userId,
  ]);

  return { isOfferPolling: isPolling, isCheckingOfferStatus };
}
