import { recordChatOfferAfterUtmClick } from '@/lib/ai-chat/offer-sync/record-chat-offer-after-utm-click';
import type { AiChatOfferClickContext } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

export interface HandleChatOfferClickParams extends AiChatOfferClickContext {
  offer: LenderOfferStatus;
}

/** Delegates in-chat offer clicks to UTM + chat-offer, then reloads chat-history. */
export const handleChatOfferClick = (params: HandleChatOfferClickParams): void => {
  void recordChatOfferAfterUtmClick(params);
};
