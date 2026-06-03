'use client';

import { JSX, useEffect, useMemo, useRef } from 'react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import type { AiChatRenderableMessage } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';
import AiChatOfferPolling from './ai-chat-offer-polling';
import { renderChatMessage } from './render-chat-message';

interface AiChatMessageListProps {
  messages: AiChatRenderableMessage[];
  chatUserId: string;
  showTypingIndicator?: boolean;
  showOfferPolling?: boolean;
  isCheckingOfferStatus?: boolean;
  onLiveOffersUpdated?: (offers: LenderOfferStatus[]) => void;
}

const AiChatMessageList = ({
  messages,
  chatUserId,
  showTypingIndicator = false,
  showOfferPolling = false,
  isCheckingOfferStatus = false,
  onLiveOffersUpdated,
}: AiChatMessageListProps): JSX.Element => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, showOfferPolling, showTypingIndicator]);

  const renderFinTypingIndicator = useMemo(() => {
    if (!showTypingIndicator) return null;

    return (
      <div className="flex justify-center">
        <span className=" py-1 text-xs text-muted-foreground">
          {AI_CHAT_COPY.typingMessage}
        </span>
      </div>
    );
  }, [showTypingIndicator]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <div key={message.id}>
            {renderChatMessage(message, {
              userId: chatUserId,
              onLiveOffersUpdated,
            })}
          </div>
        ))}
        {showOfferPolling ? (
          <AiChatOfferPolling isCheckingStatus={isCheckingOfferStatus} />
        ) : null}
        {renderFinTypingIndicator}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default AiChatMessageList;
