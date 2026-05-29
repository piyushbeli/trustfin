import type { AiChatTurn } from '@/types/ai-chat';

export interface MappedChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
}

const shouldShowAskedQuestion = (turn: AiChatTurn): boolean => {
  const askedQuestion = turn.askedQuestion?.trim();
  if (!askedQuestion) {
    return false;
  }

  if (turn.turnType === 'chat' || turn.turnType === 'field_help') {
    return true;
  }

  if (turn.turnType === 'field') {
    // Skip stale field prompt when turn includes a completion/thanks response
    return !turn.assistantResponse?.trim();
  }

  return false;
};

/** Maps chat-history turns to UI message bubbles in conversational order. */
export const mapHistoryTurnsToMessages = (turns: AiChatTurn[]): MappedChatMessage[] => {
  const mapped: MappedChatMessage[] = [];

  turns.forEach((turn) => {
    const userText = turn.userQuery?.trim() || turn.userAnswer?.trim();
    if (userText) {
      mapped.push({ id: `${turn.turnId}_user`, role: 'user', text: userText });
    }

    const assistantResponse = turn.assistantResponse?.trim();
    if (assistantResponse) {
      mapped.push({
        id: `${turn.turnId}_assistant`,
        role: 'assistant',
        text: assistantResponse,
      });
    }

    if (shouldShowAskedQuestion(turn) && turn.askedQuestion) {
      mapped.push({
        id: `${turn.turnId}_asked`,
        role: 'assistant',
        text: turn.askedQuestion,
      });
    }
  });

  return mapped;
};

/** Last askedQuestion on a turn (used to infer active field after reload). */
export const getLastAskedQuestionFromTurns = (turns: AiChatTurn[]): string | null => {
  for (let index = turns.length - 1; index >= 0; index -= 1) {
    const question = turns[index]?.askedQuestion?.trim();
    if (question) {
      return question;
    }
  }
  return null;
};
