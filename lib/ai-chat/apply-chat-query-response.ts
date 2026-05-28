import { resolveNextFieldConfig } from '@/lib/ai-chat/resolve-next-field-config';
import { normalizeFieldCaptureStatus } from '@/lib/ai-chat/normalize-field-capture-status';
import type {
  AiChatFieldCaptureStatus,
  AiChatNextFieldConfig,
  AiChatSession,
  ChatQueryResponse,
} from '@/types/ai-chat';

interface BuildSessionParams {
  userId: string;
  currentSession?: AiChatSession | null;
}

export const buildSessionFromChatQueryResponse = (
  data: ChatQueryResponse,
  { userId, currentSession }: BuildSessionParams,
): AiChatSession => {
  const fieldCaptureStatus = normalizeFieldCaptureStatus(data.fieldCaptureStatus);
  const nextField = fieldCaptureStatus?.nextField ?? null;
  const pendingQuestion =
    fieldCaptureStatus?.nextQuestion ?? data.answer ?? currentSession?.pendingQuestion ?? null;

  return {
    userId,
    organizationCode: data.organizationCode ?? currentSession?.organizationCode ?? '',
    channel: data.channel ?? currentSession?.channel ?? '',
    stage: nextField ? `field_capture:${nextField}` : 'completed',
    intent: data.intent ?? currentSession?.intent ?? null,
    nextField,
    pendingQuestion,
    pendingField: nextField,
    isFieldCaptureActive: data.captureFields && Boolean(nextField),
    isCompleted: !nextField,
    shouldAskNextQuestion: data.shouldAskNextQuestion,
    updatedAt: new Date().toISOString(),
  };
};

export interface ApplyChatQueryResponseStateParams {
  data: ChatQueryResponse;
  currentSession: AiChatSession | null;
  userId: string;
  setSession: (session: AiChatSession) => void;
  setFieldCaptureStatus: (status: AiChatFieldCaptureStatus | null) => void;
  setNextFieldConfig: (config: AiChatNextFieldConfig | null) => void;
  setIsEscalated: (escalated: boolean) => void;
}

/** Syncs session, field capture, next input config, and escalation from a chat-query response. */
export const applyChatQueryResponseState = ({
  data,
  currentSession,
  userId,
  setSession,
  setFieldCaptureStatus,
  setNextFieldConfig,
  setIsEscalated,
}: ApplyChatQueryResponseStateParams): void => {
  const nextSession = buildSessionFromChatQueryResponse(data, {
    userId,
    currentSession,
  });

  setSession(nextSession);
  setIsEscalated(data.escalateToHuman);

  const fieldCaptureStatus = normalizeFieldCaptureStatus(data.fieldCaptureStatus);

  if (fieldCaptureStatus) {
    setFieldCaptureStatus(fieldCaptureStatus);
    setNextFieldConfig(
      resolveNextFieldConfig({
        fieldCaptureStatus,
        session: nextSession,
      }),
    );
    return;
  }

  setFieldCaptureStatus(null);
  setNextFieldConfig(resolveNextFieldConfig({ session: nextSession }));
};
