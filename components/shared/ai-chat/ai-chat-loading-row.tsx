'use client';

import { JSX } from 'react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat-copy';

const AiChatLoadingRow = (): JSX.Element => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="flex min-h-full items-center justify-center text-sm text-gray-500">
        {AI_CHAT_COPY.loadingMessage}
      </div>
    </div>
  );
};

export default AiChatLoadingRow;
