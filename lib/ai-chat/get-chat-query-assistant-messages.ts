import type { ChatQueryResponse } from '@/types/ai-chat';

interface ChatQueryAssistantMessage {
  id: string;
  role: 'assistant';
  text: string;
}

/** Builds assistant bubbles from a chat-query response (answer + next question when different). */
export const getChatQueryAssistantMessages = (
  data: ChatQueryResponse,
): ChatQueryAssistantMessage[] => {
  const messages: ChatQueryAssistantMessage[] = [];
  const timestamp = Date.now();
  const answer = data.answer?.trim();

  if (answer) {
    messages.push({
      id: `server_assistant_${timestamp}`,
      role: 'assistant',
      text: answer,
    });
  }

  const nextQuestion = data.fieldCaptureStatus?.nextQuestion?.trim();

  // API often sends a generic answer plus a separate field-capture question.
  if (nextQuestion && nextQuestion !== answer && data.shouldAskNextQuestion) {
    messages.push({
      id: `server_next_question_${timestamp + 1}`,
      role: 'assistant',
      text: nextQuestion,
    });
  }

  return messages;
};
