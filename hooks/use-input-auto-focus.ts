'use client';

import { useCallback, useEffect, useRef, type RefObject } from 'react';

interface UseInputAutoFocusParams {
  shouldAutoFocus?: boolean;
  disabled?: boolean;
}

interface UseInputAutoFocusResult {
  inputRef: RefObject<HTMLInputElement | null>;
  restoreFocusOnBlur: () => void;
}

/**
 * Keeps a text input focused when auto-focus mode is enabled.
 * Useful for chat-like inputs where accidental blur should not interrupt typing.
 */
export const useInputAutoFocus = ({
  shouldAutoFocus = false,
  disabled = false,
}: UseInputAutoFocusParams): UseInputAutoFocusResult => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!shouldAutoFocus || disabled) {
      return;
    }

    inputRef.current?.focus({ preventScroll: true });
  }, [disabled, shouldAutoFocus]);

  const restoreFocusOnBlur = useCallback((): void => {
    if (!shouldAutoFocus || disabled) {
      return;
    }

    requestAnimationFrame(() => {
      if (document.activeElement === document.body) {
        inputRef.current?.focus({ preventScroll: true });
      }
    });
  }, [disabled, shouldAutoFocus]);

  return { inputRef, restoreFocusOnBlur };
};
