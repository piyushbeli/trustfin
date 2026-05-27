'use client';

import React from 'react';
import { useLoadingStore } from '@/stores/loading-store';
import { Loader2 } from 'lucide-react';

/**
 * Global loading screen component
 * Controlled by useLoadingStore to show a full-screen overlay with a spinner and messages.
 */
export const LoadingScreen: React.FC = () => {
  const { isVisible, message, subtext } = useLoadingStore();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-primary px-6 text-center text-white">
      <div className="mb-6">
        <Loader2 className="h-12 w-12 animate-spin text-white/80" />
      </div>

      <h2 className="mb-2 text-xl font-medium">{message}</h2>

      <p className="text-white/90 text-sm md:text-base max-w-xs md:max-w-md">{subtext}</p>
    </div>
  );
};
