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
 */
export const resolveSessionAfterHistoryLoad = (
  current: AiChatSession | null,
  fromHistory: AiChatSession,
): AiChatSession => {
  if (!current?.stage?.trim()) {
    return fromHistory;
  }

  const currentRank = getChatStageRank(current.stage);
  const historyRank = getChatStageRank(fromHistory.stage);

  if (currentRank <= historyRank) {
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
