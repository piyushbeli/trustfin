import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import {
  parseCanReHitFromHistoryTurn,
  parseOffersFromHistoryTurn,
} from '@/lib/ai-chat/parse-offer-data-from-turn';
import type { AiChatRenderableMessage, AiChatTurn } from '@/types/ai-chat';

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
export const mapHistoryTurnsToMessages = (turns: AiChatTurn[]): AiChatRenderableMessage[] => {
  const mapped: AiChatRenderableMessage[] = [];

  turns.forEach((turn) => {
    const userText = turn.userQuery?.trim() || turn.userAnswer?.trim();
    if (userText) {
      mapped.push({ kind: 'text', id: `${turn.turnId}_user`, role: 'user', text: userText });
    }

    const assistantResponse = turn.assistantResponse?.trim();
    if (assistantResponse) {
      mapped.push({
        kind: 'text',
        id: `${turn.turnId}_assistant`,
        role: 'assistant',
        text: assistantResponse,
      });
    }

    if (shouldShowAskedQuestion(turn) && turn.askedQuestion) {
      mapped.push({
        kind: 'text',
        id: `${turn.turnId}_asked`,
        role: 'assistant',
        text: turn.askedQuestion,
      });
    }

    const normalizedTurnType = turn.turnType?.toLowerCase();

    if (normalizedTurnType === 'offer') {
      // Offer UI comes from persisted history, not from live check-status in the message list.
      const offers = parseOffersFromHistoryTurn(turn);
      if (offers.length > 0) {
        mapped.push({
          kind: 'offer_list',
          id: `${turn.turnId}_offers`,
          offers,
          canReHit: parseCanReHitFromHistoryTurn(turn),
        });
      } else {
        logAiChat('parse', 'offer turn had no parseable lenders', {
          turnId: turn.turnId,
          hasOffer: Boolean(turn.offer),
          hasOfferData: Boolean(turn.offerData),
        });
      }
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
