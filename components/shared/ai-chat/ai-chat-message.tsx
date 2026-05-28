'use client';

import { JSX } from 'react';
import { cn } from '@/lib/utils';

interface AiChatMessageProps {
  text: string;
  role: 'assistant' | 'user';
}

const AiChatMessage = ({ text, role }: AiChatMessageProps): JSX.Element => {
  const isAssistant = role === 'assistant';

  return (
    <div className={cn('flex w-full', isAssistant ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed',
          isAssistant
            ? 'wc-ai-chat-bubble text-gray-800'
            : 'bg-brand-primary text-white',
        )}
      >
        {text}
      </div>
    </div>
  );
};

export default AiChatMessage;
