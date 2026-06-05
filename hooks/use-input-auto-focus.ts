'use client';

import {
  useCallback,
  useEffect,
  useRef,
  type FocusEvent,
  type RefObject,
} from 'react';

interface UseInputAutoFocusParams {
  shouldAutoFocus?: boolean;
  disabled?: boolean;
  /** Skip blur-restore while a send is in flight — avoids keyboard flicker on mobile. */
  isSubmitting?: boolean;
}

interface UseInputAutoFocusResult {
  inputRef: RefObject<HTMLInputElement | null>;
  restoreFocusOnBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

const isIntentionalBlurTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  // Send button and other footer controls intentionally take focus away from the field.
  return Boolean(target.closest('[data-ai-chat-input-bar]'));
};

/**
 * Keeps a text input focused when auto-focus mode is enabled.
 * Useful for chat-like inputs where accidental blur should not interrupt typing.
 */
export const useInputAutoFocus = ({
  shouldAutoFocus = false,
  disabled = false,
  isSubmitting = false,
}: UseInputAutoFocusParams): UseInputAutoFocusResult => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isSubmittingRef = useRef(isSubmitting);

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  useEffect(() => {
    if (!shouldAutoFocus || disabled) {
      return;
    }

    inputRef.current?.focus({ preventScroll: true });
  }, [disabled, shouldAutoFocus]);

  const restoreFocusOnBlur = useCallback((event: FocusEvent<HTMLInputElement>): void => {
    if (!shouldAutoFocus || disabled) {
      return;
    }

    if (isIntentionalBlurTarget(event.relatedTarget)) {
      return;
    }

    requestAnimationFrame(() => {
      if (isSubmittingRef.current) {
        return;
      }

      if (document.activeElement === document.body) {
        inputRef.current?.focus({ preventScroll: true });
      }
    });
  }, [disabled, shouldAutoFocus]);

  return { inputRef, restoreFocusOnBlur };
};
