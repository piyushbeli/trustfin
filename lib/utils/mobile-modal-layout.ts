/** Shared layout classes for mobile fullscreen modals (AI chat, auth, etc.). */

export const MOBILE_MODAL_OVERLAY =
  'fixed inset-0 z-100 flex touch-manipulation';

export const MOBILE_MODAL_PANEL =
  'relative z-10 flex w-full flex-col overflow-hidden bg-white';

export const MOBILE_MODAL_BODY = 'flex min-h-0 flex-1 flex-col overflow-hidden';

export const MOBILE_MODAL_HEADER_SAFE =
  'shrink-0 pt-[calc(env(safe-area-inset-top)+1rem)]';

export const MOBILE_MODAL_FOOTER_CLUSTER =
  'sticky bottom-0 z-10 shrink-0 bg-white';

export const MOBILE_MODAL_FOOTER_SAFE =
  'pb-[calc(env(safe-area-inset-bottom)+1rem+var(--keyboard-inset-bottom,0px))]';

/** Keeps focused fields visible above the virtual keyboard on iOS Safari. */
export const scrollFocusedFieldIntoView = (element: HTMLElement | null): void => {
  if (!element) return;
  requestAnimationFrame(() => {
    element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
};
