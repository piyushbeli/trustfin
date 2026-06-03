import { recordChatOfferAfterUtmClick } from '@/lib/ai-chat/offer-sync/record-chat-offer-after-utm-click';
import type { AiChatOfferClickContext } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

export interface HandleChatOfferClickParams extends AiChatOfferClickContext {
  offer: LenderOfferStatus;
}

/** Delegates in-chat offer clicks to the UTM + chat-offer helper (no history refresh in-session). */
export const handleChatOfferClick = (params: HandleChatOfferClickParams): void => {
  void recordChatOfferAfterUtmClick(params);
};
