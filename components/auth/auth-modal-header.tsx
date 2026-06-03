'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { IMAGES } from '@/lib/constants/images';

interface AuthModalHeaderProps {
  onClose: () => void;
}

/**
 * Compact auth modal header with TrustFin logo and close button.
 */
export const AuthModalHeader = ({ onClose }: AuthModalHeaderProps): React.ReactNode => {
  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
      <Image
        src={IMAGES.LOGOS.TRUSTFIN_LOGO}
        alt="TrustFin.ai"
        width={140}
        height={36}
        className="h-9 w-auto"
        priority
      />
      <button
        type="button"
        onClick={onClose}
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-50 text-gray-700 hover:bg-brand-100 transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </header>
  );
};
