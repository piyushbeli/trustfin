import { useEffect } from 'react';
import type { CSSProperties } from 'react';

const updateAppHeightVars = (): void => {
  if (typeof window === 'undefined') return;

  const viewportUnit = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--app-height', `${viewportUnit}px`);

  // Offset for virtual keyboard (iOS Safari); Android may also use visualViewport.
  const viewport = window.visualViewport;
  if (!viewport) {
    document.documentElement.style.setProperty('--keyboard-inset-bottom', '0px');
    return;
  }

  const keyboardInset = Math.max(
    0,
    window.innerHeight - viewport.height - viewport.offsetTop,
  );
  document.documentElement.style.setProperty(
    '--keyboard-inset-bottom',
    `${keyboardInset}px`,
  );
};

/**
 * Stable viewport height + keyboard inset for mobile fullscreen modals.
 * Sets --app-height and --keyboard-inset-bottom on documentElement.
 */
export const useAppHeight = (): CSSProperties => {
  useEffect((): (() => void) => {
    updateAppHeightVars();

    window.addEventListener('resize', updateAppHeightVars);

    const viewport = window.visualViewport;
    if (viewport) {
      viewport.addEventListener('resize', updateAppHeightVars);
      viewport.addEventListener('scroll', updateAppHeightVars);
    }

    return (): void => {
      window.removeEventListener('resize', updateAppHeightVars);
      if (viewport) {
        viewport.removeEventListener('resize', updateAppHeightVars);
        viewport.removeEventListener('scroll', updateAppHeightVars);
      }
      document.documentElement.style.removeProperty('--keyboard-inset-bottom');
    };
  }, []);

  return {
    height: 'calc(var(--app-height, 1vh) * 100)',
    minHeight: 'calc(var(--app-height, 1vh) * 100)',
  };
};
