import { mapHistoryTurnsToMessages } from '@/lib/ai-chat/map-history-turns-to-messages';
import { isFieldCaptureStage } from '@/lib/ai-chat/normalize-bot-stage';
import { normalizeSessionFromApi } from '@/lib/ai-chat/session-stage';
import type { AiChatRenderableMessage, ChatHistoryResponse } from '@/types/ai-chat';

/** Maps chat-history API payload to the message list shown in the modal (server is source of truth). */
export const mapHistoryResponseToMessages = (
  history: ChatHistoryResponse,
  options?: { suppressMessages?: boolean },
): AiChatRenderableMessage[] => {
  const turns = history.turns ?? [];
  const suppressMessages = Boolean(options?.suppressMessages);
  const mappedMessages = suppressMessages ? [] : mapHistoryTurnsToMessages(turns);
  const normalizedSession = normalizeSessionFromApi(history.session);

  const shouldAppendPendingQuestion =
    !suppressMessages &&
    normalizedSession.shouldAskNextQuestion &&
    isFieldCaptureStage(normalizedSession.stage) &&
    Boolean(normalizedSession.pendingQuestion) &&
    !mappedMessages.some(
      (message) =>
        message.kind === 'text' && message.text === normalizedSession.pendingQuestion,
    );

  if (shouldAppendPendingQuestion && normalizedSession.pendingQuestion) {
    mappedMessages.push({
      kind: 'text',
      id: `pending_${normalizedSession.updatedAt}`,
      role: 'assistant',
      text: normalizedSession.pendingQuestion,
    });
  }

  return mappedMessages;
};
