'use client';

import { JSX } from 'react';

interface AiChatProgressProps {
  current: number;
  total: number;
  phaseLabel: string;
}

const AiChatProgress = ({ current, total, phaseLabel }: AiChatProgressProps): JSX.Element => {
  const safeTotal = total > 0 ? total : 1;
  const safeCurrent = Math.min(Math.max(current, 0), safeTotal);
  const progressValue = Math.round((safeCurrent / safeTotal) * 100);

  return (
    <div className="space-y-2 px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold tracking-wide text-brand-primary">
          Step {safeCurrent || 1} of {safeTotal}
        </p>
        <p className="text-xs font-semibold tracking-[0.12em] text-gray-400">{phaseLabel}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-brand-50">
        <div
          className="wc-hero-cta-gradient h-full rounded-full transition-all duration-300"
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
};

export default AiChatProgress;
