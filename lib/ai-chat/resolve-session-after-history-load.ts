import {
  isFieldCaptureStage,
  isOfferReceivedStage,
  isOfferSyncStage,
  isUtmClickStage,
  normalizeBotStage,
} from '@/lib/ai-chat/normalize-bot-stage';
import { deriveSessionFlagsFromStage } from '@/lib/ai-chat/session-stage';
import type { AiChatSession } from '@/types/ai-chat';

/** Higher rank = further along the chat → offer journey. */
const getChatStageRank = (stage: string | null | undefined): number => {
  const normalized = normalizeBotStage(stage);

  if (isFieldCaptureStage(normalized)) {
    return 0;
  }

  if (isOfferSyncStage(normalized)) {
    return 1;
  }

  if (isOfferReceivedStage(normalized)) {
    return 2;
  }

  if (isUtmClickStage(normalized)) {
    return 3;
  }

  return 0;
};

/**
 * chat-history can lag behind the latest chat-query response.
 * Never downgrade session.stage when reloading history after promotion.
 *
 * Special case: history may jump to `offer_received` before the offer turn renders.
 * While there is no offer_list in messages, keep `completed` so check-status polling continues.
 */
export const resolveSessionAfterHistoryLoad = (
  current: AiChatSession | null,
  fromHistory: AiChatSession,
  options?: { hasOfferListMessages?: boolean },
): AiChatSession => {
  if (!current?.stage?.trim()) {
    return fromHistory;
  }

  const currentRank = getChatStageRank(current.stage);
  const historyRank = getChatStageRank(fromHistory.stage);

  if (currentRank <= historyRank) {
    // History can report offer_received before the offer turn is renderable — keep completed for polling.
    if (
      options?.hasOfferListMessages === false &&
      isOfferSyncStage(current.stage) &&
      isOfferReceivedStage(fromHistory.stage)
    ) {
      const preservedStage = normalizeBotStage(current.stage);
      const { isFieldCaptureActive, isCompleted } = deriveSessionFlagsFromStage(preservedStage);

      return {
        ...fromHistory,
        stage: preservedStage,
        isFieldCaptureActive,
        isCompleted,
      };
    }

    return fromHistory;
  }

  const preservedStage = normalizeBotStage(current.stage);
  const { isFieldCaptureActive, isCompleted } = deriveSessionFlagsFromStage(preservedStage);

  return {
    ...fromHistory,
    stage: preservedStage,
    isFieldCaptureActive,
    isCompleted,
  };
};
