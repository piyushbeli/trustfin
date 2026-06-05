'use client';

import { JSX } from 'react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';

/** Assistant-style status bubble shown while check-status-all runs for offers. */
const AiChatOfferPolling = (): JSX.Element => {
  return (
    <div className="flex w-full justify-start" role="status" aria-live="polite">
      <div className="wc-ai-chat-bubble max-w-[85%] rounded-2xl px-4 py-3 text-gray-800">
        <p className="text-[15px] font-medium leading-relaxed">{AI_CHAT_COPY.offerPollingTitle}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
          {AI_CHAT_COPY.offerPollingMessage}
        </p>
      </div>
    </div>
  );
};

export default AiChatOfferPolling;
