'use client';

import { JSX } from 'react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';

interface AiChatOfferPollingProps {
  isCheckingStatus?: boolean;
}

/** Compact polling UI while check-status-all runs (same flow as /offers PollingState). */
const AiChatOfferPolling = ({ isCheckingStatus = false }: AiChatOfferPollingProps): JSX.Element => {
  const statusLabel = isCheckingStatus
    ? AI_CHAT_COPY.offerPollingHint
    : AI_CHAT_COPY.offerPollingMessage;

  return (
    <div
      className="flex w-full flex-col items-center gap-3 rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-6"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-brand-primary border-t-transparent"
        aria-hidden
      />
      <p className="text-center text-sm font-medium text-foreground">{statusLabel}</p>
      <div className="flex justify-center gap-1" aria-hidden>
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-primary [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-primary [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-primary [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default AiChatOfferPolling;
