'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shared check-status polling loop — used by offers page and AI chat offer-sync
 * so timing and stop rules never diverge.
 */
export const OFFER_POLL_INTERVAL_MS = 15000;
export const OFFER_MAX_POLL_DURATION_MS = 90000;
export const OFFER_API_TIMEOUT_MS = 15000;

export interface UseOfferStatusPollingOptions {
  isPolling: boolean;
  setIsPolling: (value: boolean) => void;
  onPollTick: (signal: AbortSignal) => Promise<void>;
  shouldStopPolling?: () => boolean;
}

export interface UseOfferStatusPollingResult {
  startPolling: () => void;
  stopPolling: () => void;
  executePoll: () => Promise<void>;
}

export function useOfferStatusPolling({
  isPolling,
  setIsPolling,
  onPollTick,
  shouldStopPolling,
}: UseOfferStatusPollingOptions): UseOfferStatusPollingResult {
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollStartTimeRef = useRef<number | null>(null);
  const [pollTick, setPollTick] = useState(0);

  const stopPolling = useCallback((): void => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    pollStartTimeRef.current = null;
    setIsPolling(false);
  }, [setIsPolling]);

  const executePoll = useCallback(async (): Promise<void> => {
    if (pollStartTimeRef.current) {
      const elapsed = Date.now() - pollStartTimeRef.current;
      // Stop after 90s even if lenders are still pending (same as offers page).
      if (elapsed >= OFFER_MAX_POLL_DURATION_MS) {
        stopPolling();
        return;
      }
    }

    const controller = new AbortController();
    // Per-tick guard so a hung check-status does not block the next poll.
    const timeoutId = setTimeout(() => controller.abort(), OFFER_API_TIMEOUT_MS);

    try {
      await onPollTick(controller.signal);
    } finally {
      clearTimeout(timeoutId);
      setPollTick((previous) => previous + 1);
    }
  }, [onPollTick, stopPolling]);

  const startPolling = useCallback((): void => {
    pollStartTimeRef.current = Date.now();
    setIsPolling(true);
    void executePoll();
  }, [executePoll, setIsPolling]);

  // Schedule the next poll tick while polling is active.
  useEffect(() => {
    if (!isPolling) {
      return;
    }

    pollTimerRef.current = setTimeout(executePoll, OFFER_POLL_INTERVAL_MS);

    return () => {
      if (pollTimerRef.current) {
        clearTimeout(pollTimerRef.current);
      }
    };
  }, [isPolling, executePoll, pollTick]);

  // Consumer-specific early stop (e.g. lenders arrived on offers page or in chat).
  useEffect(() => {
    if (!isPolling || !shouldStopPolling) {
      return;
    }

    if (shouldStopPolling()) {
      stopPolling();
    }
  }, [isPolling, shouldStopPolling, stopPolling, pollTick]);

  return {
    startPolling,
    stopPolling,
    executePoll,
  };
}
