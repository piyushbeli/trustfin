'use client';

import { JSX } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import { IMAGES } from '@/lib/constants/images';

interface AiChatHeaderProps {
  onClose: () => void;
}

const AiChatHeader = ({ onClose }: AiChatHeaderProps): JSX.Element => {
  return (
    <div className="flex items-center justify-between border-b border-brand-100 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={IMAGES.AI_BOT_FACE}
            alt="Finn assistant avatar"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="absolute -right-1 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-brand-primary">{AI_CHAT_COPY.title}</h2>
          <p className="text-sm text-gray-500">{AI_CHAT_COPY.onlineStatus}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close chat"
        className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
};

export default AiChatHeader;
