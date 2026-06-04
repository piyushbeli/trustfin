'use client';

import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { runCheckStatusForChat } from '@/lib/ai-chat/offer-sync/run-check-and-save-offer';
import {
  finalizeExploreMoreOffersForChat,
  triggerExploreMoreReHitForChat,
} from '@/lib/ai-chat/offer-sync/run-explore-more-offers-for-chat';
import { newPLEnabled } from '@/hooks/use-offers';
import { useOfferStatusPolling } from '@/hooks/use-offer-status-polling';
import { STORAGE_AUTH_TOKEN, STORAGE_MOBILE } from '@/lib/constants/api-keys';
import type { AiChatOfferClickContext } from '@/types/ai-chat';
import type { CheckStatusAllResponse } from '@/types/wecredit';

interface UseChatExploreMoreOffersParams extends AiChatOfferClickContext {}

interface UseChatExploreMoreOffersResult {
  isExploringMore: boolean;
  exploreMoreOffers: () => Promise<void>;
}

/**
 * In-chat Explore More: re-hit lenders, poll check-status-all, persist chat-offer, refresh history.
 */
export function useChatExploreMoreOffers({
  userId,
  onLiveOffersUpdated,
}: UseChatExploreMoreOffersParams): UseChatExploreMoreOffersResult {
  const [isExploringMore, setIsExploringMore] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const pollSnapshotRef = useRef({ lenderCount: 0, canReHit: true });
  const lastCheckDataRef = useRef<CheckStatusAllResponse | null>(null);
  const isExploreMoreSessionRef = useRef(false);

  const shouldStopExploreMorePolling = useCallback((): boolean => {
    const { lenderCount, canReHit } = pollSnapshotRef.current;

    if (newPLEnabled) {
      return lenderCount > 0;
    }

    return lenderCount > 0 && !canReHit;
  }, []);

  const onPollTick = useCallback(
    async (signal: AbortSignal): Promise<void> => {
      const mobile = getCookie(STORAGE_MOBILE) as string | undefined;
      const token = getCookie(STORAGE_AUTH_TOKEN) as string | undefined;

      if (!mobile || !token) {
        logAiChat('offer-sync', 'explore more poll skipped — missing auth', { userId });
        return;
      }

      const checkResult = await runCheckStatusForChat({
        mobile,
        token,
        userId,
        signal,
      });

      pollSnapshotRef.current = {
        lenderCount: checkResult.lenderCount,
        canReHit: checkResult.canReHit,
      };

      if (checkResult.success && checkResult.data) {
        lastCheckDataRef.current = checkResult.data;
      }
    },
    [userId],
  );

  const { startPolling, stopPolling } = useOfferStatusPolling({
    isPolling,
    setIsPolling,
    onPollTick,
    shouldStopPolling: shouldStopExploreMorePolling,
  });

  const exploreMoreOffers = useCallback(async (): Promise<void> => {
    const mobile = getCookie(STORAGE_MOBILE) as string | undefined;
    const token = getCookie(STORAGE_AUTH_TOKEN) as string | undefined;

    if (!mobile || !token || !userId) {
      logAiChat('offer-sync', 'explore more skipped — missing auth or userId', {
        userId: userId || null,
        hasMobile: Boolean(mobile),
        hasToken: Boolean(token),
      });
      return;
    }

    setIsExploringMore(true);
    isExploreMoreSessionRef.current = true;
    lastCheckDataRef.current = null;
    pollSnapshotRef.current = { lenderCount: 0, canReHit: true };

    await triggerExploreMoreReHitForChat({ mobile, token, userId });
    startPolling();
  }, [startPolling, userId]);

  // When polling ends after Explore More, persist and refresh chat-history.
  useEffect(() => {
    if (isPolling || !isExploreMoreSessionRef.current) {
      return;
    }

    const finalize = async (): Promise<void> => {
      const mobile = getCookie(STORAGE_MOBILE) as string | undefined;
      const checkData = lastCheckDataRef.current;

      if (mobile && checkData && userId) {
        await finalizeExploreMoreOffersForChat({
          mobile,
          userId,
          checkStatusResponse: checkData,
          onLiveOffersUpdated,
        });
      }

      isExploreMoreSessionRef.current = false;
      setIsExploringMore(false);
    };

    void finalize();
  }, [isPolling, onLiveOffersUpdated, userId]);

  // Cleanup polling if the embedded offers block unmounts mid-flow.
  useEffect(() => {
    return () => {
      stopPolling();
      isExploreMoreSessionRef.current = false;
    };
  }, [stopPolling]);

  return {
    isExploringMore: isExploringMore || isPolling,
    exploreMoreOffers,
  };
}
