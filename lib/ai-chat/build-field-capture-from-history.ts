import { inferFieldFromAskedQuestion } from '@/lib/ai-chat/infer-field-from-asked-question';
import { getLastAskedQuestionFromTurns } from '@/lib/ai-chat/map-history-turns-to-messages';
import { resolveNextFieldConfig } from '@/lib/ai-chat/resolve-next-field-config';
import type { AiChatFieldCaptureStatus, AiChatNextFieldConfig, AiChatSession, AiChatTurn } from '@/types/ai-chat';

interface BuildFieldCaptureFromHistoryResult {
  fieldCaptureStatus: AiChatFieldCaptureStatus | null;
  nextFieldConfig: AiChatNextFieldConfig | null;
}

/** Derives active field capture state when reloading chat-history. */
export const buildFieldCaptureFromHistory = (
  session: AiChatSession,
  turns: AiChatTurn[],
  previousStatus?: AiChatFieldCaptureStatus | null,
): BuildFieldCaptureFromHistoryResult => {
  const isCaptureActive =
    session.isFieldCaptureActive || (session.shouldAskNextQuestion && !session.isCompleted);

  if (!isCaptureActive) {
    return { fieldCaptureStatus: null, nextFieldConfig: null };
  }

  const sessionNextField = session.pendingField ?? session.nextField ?? null;
  const lastAskedQuestion = getLastAskedQuestionFromTurns(turns);
  const inferredField =
    sessionNextField ?? inferFieldFromAskedQuestion(lastAskedQuestion) ?? inferFieldFromAskedQuestion(session.pendingQuestion);

  if (!inferredField) {
    return { fieldCaptureStatus: null, nextFieldConfig: null };
  }

  const nextQuestion =
    session.pendingQuestion ?? lastAskedQuestion ?? previousStatus?.nextQuestion ?? null;

  const partialStatus: AiChatFieldCaptureStatus = {
    requiredFields: previousStatus?.requiredFields ?? [],
    optionalFields: previousStatus?.optionalFields ?? [],
    capturedFields: previousStatus?.capturedFields ?? [],
    missingFields: previousStatus?.missingFields ?? [],
    nextField: inferredField,
    nextQuestion,
  };

  const fieldCaptureStatus: AiChatFieldCaptureStatus = {
    ...partialStatus,
    nextFieldConfig: resolveNextFieldConfig({
      session,
      fieldCaptureStatus: partialStatus,
    }),
  };

  return {
    fieldCaptureStatus,
    nextFieldConfig: fieldCaptureStatus.nextFieldConfig ?? resolveNextFieldConfig({ fieldCaptureStatus, session }),
  };
};
