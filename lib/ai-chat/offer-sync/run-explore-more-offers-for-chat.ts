import { hitAllLenders } from '@/lib/api/wecredit';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { persistChatOfferForChat } from '@/lib/ai-chat/offer-sync/run-check-and-save-offer';
import { newPLEnabled } from '@/hooks/use-offers';
import type { AiChatOfferClickContext } from '@/types/ai-chat';
import type { CheckStatusAllResponse } from '@/types/wecredit';

export interface TriggerExploreMoreReHitParams {
  mobile: string;
  token: string;
  userId: string;
}

/** Fires hit-all-lenders when new PL is enabled (same as offers page reHitLenders). */
export const triggerExploreMoreReHitForChat = async ({
  mobile,
  token,
  userId,
}: TriggerExploreMoreReHitParams): Promise<boolean> => {
  if (!newPLEnabled) {
    return true;
  }

  const result = await hitAllLenders(mobile, token);

  if (!result.success) {
    logAiChat('offer-sync', 'explore more — hitAllLenders failed', { userId, error: result.error ?? null });
  }

  return result.success;
};

export interface FinalizeExploreMoreOffersParams extends AiChatOfferClickContext {
  mobile: string;
  checkStatusResponse: CheckStatusAllResponse;
}

/** Persists updated check-status to chat-offer and reloads chat-history via callback. */
export const finalizeExploreMoreOffersForChat = async ({
  mobile,
  userId,
  checkStatusResponse,
  onLiveOffersUpdated,
}: FinalizeExploreMoreOffersParams): Promise<boolean> => {
  const persistResult = await persistChatOfferForChat({
    mobile,
    userId,
    checkStatusResponse,
  });

  if (!persistResult.success) {
    return false;
  }

  const canReHit = checkStatusResponse.isRehitLenders === 0;
  await onLiveOffersUpdated?.(checkStatusResponse.lenders ?? [], canReHit);
  return true;
};
   