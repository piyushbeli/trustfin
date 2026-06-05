'use client';

import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import { FinTypingBlock } from './message-blocks/fin-typing-block';

/** Assistant-style status bubble shown while check-status-all runs for offers. */
const AiChatOfferPolling = () => {
  return <FinTypingBlock message={AI_CHAT_COPY.offerPollingTitle} />;
};

export default AiChatOfferPolling;
