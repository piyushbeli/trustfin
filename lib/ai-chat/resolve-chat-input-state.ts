import { isSessionFieldCaptureComplete } from '@/lib/ai-chat/session-stage';

export interface AiChatInputState {
  /** Field capture finished — derived from session.stage only. */
  isFieldCaptureComplete: boolean;
  /** Free-text input and send should be disabled. */
  isChatInputDisabled: boolean;
}

/**
 * Separates field-capture completion from offer-stage input locking.
 * Input is always enabled for now; add stage-based locking here when product asks.
 */
export const resolveAiChatInputState = (stage: string | null | undefined): AiChatInputState => ({
  isFieldCaptureComplete: isSessionFieldCaptureComplete(stage),
  isChatInputDisabled: false,
});
