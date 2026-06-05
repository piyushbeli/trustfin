import type { AiChatRenderableMessage } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

export interface PatchOfferListMessagesOptions {
  canReHit?: boolean;
}

/**
 * Updates offer_list messages in place without changing message ids or count.
 * Used after in-chat UTM clicks / Explore More so chat scroll position is preserved.
 */
export const patchOfferListMessages = (
  messages: AiChatRenderableMessage[],
  offers: LenderOfferStatus[],
  options?: PatchOfferListMessagesOptions,
): AiChatRenderableMessage[] => {
  const hasOfferListMessage = messages.some((message) => message.kind === 'offer_list');
  if (!hasOfferListMessage) {
    return messages;
  }

  let didPatch = false;

  const patched = messages.map((message) => {
    if (message.kind !== 'offer_list') {
      return message;
    }

    didPatch = true;
    return {
      ...message,
      offers,
      ...(options?.canReHit !== undefined ? { canReHit: options.canReHit } : {}),
    };
  });

  return didPatch ? patched : messages;
};
