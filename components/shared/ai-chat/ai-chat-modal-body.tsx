'use client';

import { JSX } from 'react';
import type { AiChatRenderableMessage } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';
import AiChatLoadingRow from './ai-chat-loading-row';
import AiChatMessageList from './ai-chat-message-list';
import AiChatGuestWelcome from './ai-chat-guest-welcome';
import type { AiChatViewMode } from './ai-chat-view';

interface AiChatModalBodyProps {
  viewMode: AiChatViewMode;
  messages: AiChatRenderableMessage[];
  chatUserId: string;
  showTypingIndicator: boolean;
  showOfferPolling?: boolean;
  isCheckingOfferStatus?: boolean;
  isLoadingHistory?: boolean;
  onLiveOffersUpdated?: (offers: LenderOfferStatus[], canReHit: boolean) => void;
}

const AiChatModalBody = ({
  viewMode,
  messages,
  chatUserId,
  showTypingIndicator,
  showOfferPolling,
  isCheckingOfferStatus,
  isLoadingHistory,
  onLiveOffersUpdated,
}: AiChatModalBodyProps): JSX.Element => {
  if (viewMode === 'initialLoading') {
    return <AiChatLoadingRow />;
  }

  if (viewMode === 'guestWelcome') {
    return <AiChatGuestWelcome />;
  }

  return (
    <AiChatMessageList
      messages={messages}
      chatUserId={chatUserId}
      showTypingIndicator={showTypingIndicator}
      showOfferPolling={showOfferPolling}
      isCheckingOfferStatus={isCheckingOfferStatus}
      isLoadingHistory={isLoadingHistory}
      onLiveOffersUpdated={onLiveOffersUpdated}
    />
  );
};

export default AiChatModalBody;
