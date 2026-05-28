'use client';

import { JSX } from 'react';
import { ShieldCheck } from 'lucide-react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat-copy';

const AiChatSecureBadge = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center gap-1 px-4 pb-4 text-[11px] font-semibold tracking-[0.16em] text-gray-400">
      <ShieldCheck className="h-3.5 w-3.5" />
      <span>{AI_CHAT_COPY.secureProcessing}</span>
    </div>
  );
};

export default AiChatSecureBadge;
