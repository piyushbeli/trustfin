import {
  LIVE_OFFERS_MESSAGE_ID,
  upsertLiveOfferMessage,
} from '@/lib/ai-chat/offer-sync/live-offer-message';
import type { AiChatRenderableMessage } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

export const historyHasOfferMessages = (messages: AiChatRenderableMessage[]): boolean =>
  messages.some(
    (message) => message.kind === 'offer_list' && message.id !== LIVE_OFFERS_MESSAGE_ID,
  );

/**
 * After chat-history refresh, keep live check-status offers when history has not yet
 * returned an offer turn (common race: chat-offer completes before offer turn is readable).
 */
export const mergeHistoryWithLiveOffers = (
  historyMessages: AiChatRenderableMessage[],
  previousMessages: AiChatRenderableMessage[],
  fallbackOffers: LenderOfferStatus[] = [],
): AiChatRenderableMessage[] => {
  if (historyHasOfferMessages(historyMessages)) {
    return historyMessages.filter((message) => message.id !== LIVE_OFFERS_MESSAGE_ID);
  }

  const liveMessage = previousMessages.find(
    (message) => message.kind === 'offer_list' && message.id === LIVE_OFFERS_MESSAGE_ID,
  );
  const offersToKeep =
    liveMessage?.kind === 'offer_list' ? liveMessage.offers : fallbackOffers;

  if (!offersToKeep.length) {
    return historyMessages;
  }

  return upsertLiveOfferMessage(historyMessages, offersToKeep);
};
