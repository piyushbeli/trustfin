import { normalizeFieldCaptureStatus } from '@/lib/ai-chat/normalize-field-capture-status';
import { resolveNextFieldConfig } from '@/lib/ai-chat/resolve-next-field-config';
import {
  deriveSessionFlagsFromStage,
  getPendingFieldFromStage,
  normalizeSessionFromApi,
  resolveApiStage,
} from '@/lib/ai-chat/session-stage';
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
  const stage = resolveApiStage(data.stage, data.session?.stage);
  const flags = deriveSessionFlagsFromStage(stage);
  const nextFieldFromStage = getPendingFieldFromStage(stage);
  const nextField =
    fieldCaptureStatus?.nextField ?? data.session?.nextField ?? data.session?.pendingField ?? nextFieldFromStage;
  const pendingQuestion =
    fieldCaptureStatus?.nextQuestion ??
    data.session?.pendingQuestion ??
    data.answer ??
    currentSession?.pendingQuestion ??
    null;

  const session: AiChatSession = {
    userId,
    organizationCode: data.organizationCode ?? currentSession?.organizationCode ?? '',
    channel: data.channel ?? currentSession?.channel ?? '',
    stage: flags.stage,
    intent: data.intent ?? currentSession?.intent ?? null,
    nextField,
    pendingQuestion,
    pendingField: nextField,
    isFieldCaptureActive: flags.isFieldCaptureActive,
    isCompleted: flags.isCompleted,
    shouldAskNextQuestion: data.shouldAskNextQuestion,
    updatedAt: new Date().toISOString(),
  };

  return normalizeSessionFromApi(session);
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

  if (fieldCaptureStatus && nextSession.isFieldCaptureActive) {
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
  setNextFieldConfig(
    nextSession.isFieldCaptureActive ? resolveNextFieldConfig({ session: nextSession }) : null,
  );
};
