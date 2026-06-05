import { getEffectiveChatUserId } from '@/lib/ai-chat/chat-identity';
import { isOfferSyncStage } from '@/lib/ai-chat/normalize-bot-stage';
import {
  type ChatOfferSyncCredentials,
  normalizeIndianMobile,
} from '@/lib/ai-chat/resolve-chat-offer-sync-credentials';
import type { AiChatSession, AiChatTurn } from '@/types/ai-chat';

/** Poll check-status when history says `completed` but the offer turn is not saved yet. */
export const shouldStartOfferSyncFromHistory = (
  session: AiChatSession,
  hasOfferListMessages: boolean,
): boolean => isOfferSyncStage(session.stage) && !hasOfferListMessages;

/** Reads the mobile captured during field_capture from persisted history turns. */
export const getCapturedMobileFromHistoryTurns = (turns: AiChatTurn[]): string | undefined => {
  for (let index = turns.length - 1; index >= 0; index -= 1) {
    const turn = turns[index];
    if (turn.field?.toLowerCase() !== 'mobile') {
      continue;
    }

    for (const value of [turn.normalizedValue, turn.userAnswer, turn.userQuery]) {
      const mobile = normalizeIndianMobile(value);
      if (mobile) {
        return mobile;
      }
    }
  }

  return undefined;
};

/** Seeds offer-sync credentials when chat-history loads on `completed` without an offer turn. */
export const resolveOfferSyncCredentialsFromHistory = (
  session: AiChatSession,
  turns: AiChatTurn[],
): ChatOfferSyncCredentials => {
  const mobile =
    getCapturedMobileFromHistoryTurns(turns) ??
    normalizeIndianMobile(session.userId) ??
    normalizeIndianMobile(getEffectiveChatUserId());

  return { mobile, token: undefined };
};
