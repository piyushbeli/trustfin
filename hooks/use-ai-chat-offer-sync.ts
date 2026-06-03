'use client';

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { getCookie } from 'cookies-next';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { applyLiveOffersToChat } from '@/lib/ai-chat/offer-sync/apply-live-offers-to-chat';
import {
  persistChatOfferForChat,
  runCheckStatusForChat,
} from '@/lib/ai-chat/offer-sync/run-check-and-save-offer';
import { normalizeBotStage, shouldPollOffersInChat } from '@/lib/ai-chat/normalize-bot-stage';
import { STORAGE_AUTH_TOKEN, STORAGE_MOBILE } from '@/lib/constants/api-keys';
import { useOfferStatusPolling } from '@/hooks/use-offer-status-polling';
import { newPLEnabled } from '@/hooks/use-offers';
import type { AiChatRenderableMessage } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

interface UseAiChatOfferSyncParams {
  stage: string | null | undefined;
  userId: string;
  mobile?: string;
  isOpen: boolean;
  setMessages: Dispatch<SetStateAction<AiChatRenderableMessage[]>>;
  lastLiveOffersRef: { current: LenderOfferStatus[] };
}

/**
 * When session stage is `completed`: poll check-status-all (same timing as /offers),
 * render offers in-modal when lenders arrive, then call chat-offer once.
 * chat-history is NOT refreshed here — it loads when the user reopens the modal.
 */
export function useAiChatOfferSync({
  stage,
  userId,
  mobile,
  isOpen,
  setMessages,
  lastLiveOffersRef,
}: UseAiChatOfferSyncParams): {
  isOfferPolling: boolean;
  isCheckingOfferStatus: boolean;
} {
  const [isPolling, setIsPolling] = useState(false);
  const [isCheckingOfferStatus, setIsCheckingOfferStatus] = useState(false);
  const pollSnapshotRef = useRef({ lenderCount: 0, canReHit: true });
  const hasPersistedChatOfferRef = useRef(false);

  const renderLiveOffers = useCallback(
    (offers: LenderOfferStatus[]): void => {
      applyLiveOffersToChat({
        offers,
        setMessages,
        lastLiveOffersRef,
        userId,
        source: 'poll',
      });
    },
    [lastLiveOffersRef, setMessages, userId],
  );

  const onPollTick = useCallback(
    async (signal: AbortSignal): Promise<void> => {
      const token = getCookie(STORAGE_AUTH_TOKEN) as string | undefined;
      const resolvedMobile = mobile ?? (getCookie(STORAGE_MOBILE) as string | undefined);

      logAiChat('offer-sync', 'poll tick — check-status-all', {
        userId,
        stage,
        hasMobile: Boolean(resolvedMobile),
        hasToken: Boolean(token),
      });

      if (!resolvedMobile || !token) {
        logAiChat('offer-sync', 'poll tick skipped — missing auth', { userId });
        return;
      }

      setIsCheckingOfferStatus(true);

      try {
        const checkResult = await runCheckStatusForChat({
          mobile: resolvedMobile,
          token,
          userId,
          signal,
          onCheckStatusSuccess: (_data, lenders) => {
            renderLiveOffers(lenders);
          },
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
          logAiChat('offer-sync', 'poll tick — no lenders yet, keep polling', {
            userId,
            statusCode: checkResult.statusCode ?? null,
          });
          return;
        }

        renderLiveOffers(checkResult.data.lenders ?? []);

        if (hasPersistedChatOfferRef.current) {
          logAiChat('offer-sync', 'poll tick — lenders present, chat-offer already sent', {
            userId,
            lenderCount: checkResult.lenderCount,
          });
          return;
        }

        const persistResult = await persistChatOfferForChat({
          mobile: resolvedMobile,
          userId,
          checkStatusResponse: checkResult.data,
          signal,
        });

        if (persistResult.success) {
          hasPersistedChatOfferRef.current = true;
        }
      } finally {
        setIsCheckingOfferStatus(false);
      }
    },
    [mobile, renderLiveOffers, userId],
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
    const token = getCookie(STORAGE_AUTH_TOKEN);
    const resolvedMobile = mobile ?? (getCookie(STORAGE_MOBILE) as string | undefined);
    const shouldRun =
      isOpen &&
      shouldPollOffersInChat(stage) &&
      Boolean(resolvedMobile) &&
      Boolean(token);

    logAiChat('offer-sync', 'polling gate evaluated', {
      userId,
      isOpen,
      stage,
      normalizedStage: normalizeBotStage(stage),
      shouldRun,
    });

    if (!shouldRun) {
      stopPolling();
      hasPersistedChatOfferRef.current = false;
      return;
    }

    hasPersistedChatOfferRef.current = false;
    logAiChat('offer-sync', 'starting check-status polling (no chat-history refresh)', {
      userId,
      stage,
    });
    startPolling();

    return () => {
      logAiChat('offer-sync', 'stopping check-status polling (cleanup)', { userId, stage });
      stopPolling();
    };
  }, [isOpen, mobile, stage, startPolling, stopPolling, userId]);

  return { isOfferPolling: isPolling, isCheckingOfferStatus };
}
