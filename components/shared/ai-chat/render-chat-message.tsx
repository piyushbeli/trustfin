'use client';

import { JSX } from 'react';
import type { AiChatOfferClickContext, AiChatRenderableMessage } from '@/types/ai-chat';
import AiChatMessage from './ai-chat-message';
import { OffersView } from '@/components/offers';

type RenderChatMessageOptions = AiChatOfferClickContext;

/** Registry keeps AiChatMessageList declarative — new in-chat blocks add a `kind` + renderer. */
export const renderChatMessage = (
  message: AiChatRenderableMessage,
  options: RenderChatMessageOptions,
): JSX.Element | null => {
  if (message.kind === 'text') {
    return <AiChatMessage text={message.text} role={message.role} />;
  }

  if (message.kind === 'offer_list') {
    return (
      <div className="flex w-full justify-start max-w-[85%] me-auto">
        <div className="w-full max-w-full">
          <OffersView
            embeddedOffers={message.offers}
            chatContext={{
              userId: options.userId,
              onLiveOffersUpdated: options.onLiveOffersUpdated,
            }}
          />
        </div>
      </div>
    );
  }

  return null;
};
