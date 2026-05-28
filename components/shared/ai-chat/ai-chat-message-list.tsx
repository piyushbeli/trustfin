'use client';

import { JSX, useEffect, useRef } from 'react';
import type { AiChatMessage as AiChatMessageType } from '@/hooks/use-ai-chat';
import AiChatMessage from './ai-chat-message';

interface AiChatMessageListProps {
  messages: AiChatMessageType[];
}

const AiChatMessageList = ({ messages }: AiChatMessageListProps): JSX.Element => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <AiChatMessage key={message.id} text={message.text} role={message.role} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default AiChatMessageList;
