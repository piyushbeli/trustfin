import type { AiChatRenderableMessage } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

/** Stable id for in-chat offers rendered before chat-history returns an offer turn. */
export const LIVE_OFFERS_MESSAGE_ID = 'live_offers';

export const upsertLiveOfferMessage = (
  messages: AiChatRenderableMessage[],
  offers: LenderOfferStatus[],
): AiChatRenderableMessage[] => {
  if (!offers.length) {
    return messages.filter((message) => message.id !== LIVE_OFFERS_MESSAGE_ID);
  }

  const withoutLive = messages.filter((message) => message.id !== LIVE_OFFERS_MESSAGE_ID);

  return [
    ...withoutLive,
    {
      kind: 'offer_list',
      id: LIVE_OFFERS_MESSAGE_ID,
      offers,
    },
  ];
};

/** Updates every in-modal offer_list block (live or history id) after check-status-all. */
export const refreshOfferListInChatMessages = (
  messages: AiChatRenderableMessage[],
  offers: LenderOfferStatus[],
): AiChatRenderableMessage[] => {
  if (!offers.length) {
    return messages.filter((message) => message.kind !== 'offer_list');
  }

  const hasOfferList = messages.some((message) => message.kind === 'offer_list');
  if (!hasOfferList) {
    return upsertLiveOfferMessage(messages, offers);
  }

  return messages.map((message) =>
    message.kind === 'offer_list' ? { ...message, offers } : message,
  );
};
