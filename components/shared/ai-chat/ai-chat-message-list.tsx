'use client';

import { JSX, useMemo } from 'react';
import { useAiChatAutoScroll } from '@/hooks/use-ai-chat-auto-scroll';
import type { AiChatRenderableMessage } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';
import AiChatOfferPolling from './ai-chat-offer-polling';
import { renderChatMessage } from './render-chat-message';
import { FinTypingBlock } from './message-blocks/fin-typing-block';

interface AiChatMessageListProps {
  messages: AiChatRenderableMessage[];
  chatUserId: string;
  showTypingIndicator?: boolean;
  showOfferPolling?: boolean;
  isCheckingOfferStatus?: boolean;
  isLoadingHistory?: boolean;
  onLiveOffersUpdated?: (offers: LenderOfferStatus[], canReHit: boolean) => void;
}

const AiChatMessageList = ({
  messages,
  chatUserId,
  showTypingIndicator = false,
  showOfferPolling = false,
  isCheckingOfferStatus = false,
  isLoadingHistory = false,
  onLiveOffersUpdated,
}: AiChatMessageListProps): JSX.Element => {
  const { scrollContainerRef, contentRef } = useAiChatAutoScroll({
    messages,
    showTypingIndicator,
    showOfferPolling,
    isLoadingHistory,
  });

  const renderFinTypingIndicator = useMemo(() => {
    if (!showTypingIndicator) return null;

    return (
      <FinTypingBlock />
    );
  }, [showTypingIndicator]);

  const renderOfferPolling = useMemo(() => {
    if (!showOfferPolling) return null;
    return <AiChatOfferPolling />;
  }, [showOfferPolling]);

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-4 pb-6">
      <div ref={contentRef} className="flex flex-col gap-3">
        {messages.map((message) => (
          <div key={message.id}>
            {renderChatMessage(message, {
              userId: chatUserId,
              onLiveOffersUpdated,
            })}
          </div>
        ))}
        {renderOfferPolling}
        {renderFinTypingIndicator}
        {/* Spacer keeps the last bubble fully above the footer after auto-scroll. */}
        <div className="min-h-3 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
};

export default AiChatMessageList;
