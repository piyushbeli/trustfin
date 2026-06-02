'use client';

import { JSX } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/lib/constants/images';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';

const AiChatGuestWelcome = (): JSX.Element => {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-4">
      <div className="w-full max-w-md flex flex-col items-center text-center gap-4">
        <Image
          src={IMAGES.LOGOS.TRUSTFIN_LOGO}
          alt="Trustfin logo"
          width={180}
          height={48}
          priority
          className="h-auto w-auto"
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-brand-primary">{AI_CHAT_COPY.guestWelcomeTitle}</h3>
          <p className="text-sm text-muted-foreground">{AI_CHAT_COPY.guestWelcomeSubtitle}</p>
        </div>

        <p className="text-sm text-muted-foreground italic">{AI_CHAT_COPY.guestWelcomeCta}</p>
      </div>
    </div>
  );
};

export default AiChatGuestWelcome;

