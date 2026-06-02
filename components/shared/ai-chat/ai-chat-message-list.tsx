'use client';

import { JSX, useEffect, useMemo, useRef } from 'react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import type { AiChatMessage as AiChatMessageType } from '@/hooks/use-ai-chat';
import AiChatMessage from './ai-chat-message';

interface AiChatMessageListProps {
  messages: AiChatMessageType[];
  showTypingIndicator?: boolean;
}

const AiChatMessageList = ({
  messages,
  showTypingIndicator = false,
}: AiChatMessageListProps): JSX.Element => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, showTypingIndicator]);

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
          <AiChatMessage key={message.id} text={message.text} role={message.role} />
        ))}
        {renderFinTypingIndicator}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default AiChatMessageList;
