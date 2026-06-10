import {
  isFieldCaptureStage,
  isOfferReceivedStage,
  isOfferSyncStage,
  isUtmClickStage,
  normalizeBotStage,
} from '@/lib/ai-chat/normalize-bot-stage';
import type { AiChatSession } from '@/types/ai-chat';

/** Resolves stage from chat-query root or nested session (both APIs may send either). */
export const resolveApiStage = (
  stage?: string | null,
  sessionStage?: string | null,
): string => {
  // After
  const raw = stage?.trim() || sessionStage?.trim() || '';
  console.log('[resolveApiStage]', {raw, stage, sessionStage});
  const normalized = normalizeBotStage(raw);
  return normalized || raw.trim();
};

/** Pending field name encoded in `field_capture:<field>`. */
export const getPendingFieldFromStage = (stage: string | null | undefined): string | null => {
  const normalized = normalizeBotStage(stage);
  if (!isFieldCaptureStage(normalized)) {
    return null;
  }

  const field = normalized.slice('field_capture:'.length);
  return field || null;
};

/** Field capture is done when backend stage is no longer `field_capture:*`. */
export const isSessionFieldCaptureComplete = (stage: string | null | undefined): boolean => {
  const normalized = normalizeBotStage(stage);
  return Boolean(normalized) && !isFieldCaptureStage(normalized);
};

export const deriveSessionFlagsFromStage = (stage: string | null | undefined) => {
  const normalizedStage = normalizeBotStage(stage);

  return {
    stage: normalizedStage,
    isFieldCaptureActive: isFieldCaptureStage(normalizedStage),
    isCompleted:
      isOfferSyncStage(normalizedStage) ||
      isOfferReceivedStage(normalizedStage) ||
      isUtmClickStage(normalizedStage),
  };
};

/** Normalize session from chat-history or chat-query so flags always match `stage`. */
export const normalizeSessionFromApi = (session: AiChatSession): AiChatSession => {
  const stage = resolveApiStage(session.stage);
  const flags = deriveSessionFlagsFromStage(stage);
  const fieldFromStage = getPendingFieldFromStage(stage);

  return {
    ...session,
    ...flags,
    nextField: session.nextField ?? session.pendingField ?? fieldFromStage,
    pendingField: session.pendingField ?? session.nextField ?? fieldFromStage,
  };
};
