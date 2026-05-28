'use client';

import { JSX } from 'react';
import type { AiChatMessage } from '@/hooks/use-ai-chat';
import AiChatLoadingRow from './ai-chat-loading-row';
import AiChatLoginPanel from './ai-chat-login-panel';
import AiChatMessageList from './ai-chat-message-list';
import type { AiChatViewMode } from './ai-chat-view';

interface AiChatModalBodyProps {
  viewMode: AiChatViewMode;
  pendingFirstMessage: string | null;
  messages: AiChatMessage[];
  showTypingIndicator: boolean;
}

const AiChatModalBody = ({
  viewMode,
  pendingFirstMessage,
  messages,
  showTypingIndicator,
}: AiChatModalBodyProps): JSX.Element => {
  if (viewMode === 'login') {
    return <AiChatLoginPanel pendingFirstMessage={pendingFirstMessage} />;
  }

  if (viewMode === 'initialLoading') {
    return <AiChatLoadingRow />;
  }

  return <AiChatMessageList messages={messages} showTypingIndicator={showTypingIndicator} />;
};

export default AiChatModalBody;
