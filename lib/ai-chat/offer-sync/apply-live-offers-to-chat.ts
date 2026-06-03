import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { refreshOfferListInChatMessages } from '@/lib/ai-chat/offer-sync/live-offer-message';
import type { AiChatRenderableMessage } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

export interface ApplyLiveOffersToChatParams {
  offers: LenderOfferStatus[];
  setMessages: Dispatch<SetStateAction<AiChatRenderableMessage[]>>;
  lastLiveOffersRef: MutableRefObject<LenderOfferStatus[]>;
  userId?: string;
  source?: 'poll' | 'utm_click';
}

/** Single path to refresh embedded OffersView data in the chat modal from check-status-all. */
export const applyLiveOffersToChat = ({
  offers,
  setMessages,
  lastLiveOffersRef,
  userId,
  source = 'poll',
}: ApplyLiveOffersToChatParams): void => {
  lastLiveOffersRef.current = offers;

  if (!offers.length) {
    return;
  }

  setMessages((previous) => {
    const next = refreshOfferListInChatMessages(previous, offers);
    logAiChat('offer-sync', 'offer_list updated in chat modal', {
      userId: userId ?? null,
      source,
      lenderCount: offers.length,
      previousMessageCount: previous.length,
      nextMessageCount: next.length,
    });
    return next;
  });
};
