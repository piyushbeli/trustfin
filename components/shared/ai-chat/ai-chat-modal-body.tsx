'use client';

import { JSX } from 'react';
import type { AiChatMessage } from '@/hooks/use-ai-chat';
import AiChatLoadingRow from './ai-chat-loading-row';
import AiChatMessageList from './ai-chat-message-list';
import type { AiChatViewMode } from './ai-chat-view';

interface AiChatModalBodyProps {
  viewMode: AiChatViewMode;
  messages: AiChatMessage[];
  showTypingIndicator: boolean;
}

const AiChatModalBody = ({
  viewMode,
  messages,
  showTypingIndicator,
}: AiChatModalBodyProps): JSX.Element => {
  if (viewMode === 'initialLoading') {
    return <AiChatLoadingRow />;
  }

  return <AiChatMessageList messages={messages} showTypingIndicator={showTypingIndicator} />;
};

export default AiChatModalBody;
