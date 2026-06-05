import type { ChatHistoryResponse, ChatQueryResponse } from '@/types/ai-chat';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { getResponseMessage } from '@/lib/utils/response-helpers';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isChatHistoryResponse(value: unknown): value is ChatHistoryResponse {
  return isRecord(value) && isRecord(value.session) && Array.isArray(value.turns);
}

function isChatQueryResponse(value: unknown): value is ChatQueryResponse {
  return isRecord(value) && typeof value.answer === 'string';
}

/** Unwraps common API envelopes so the chat UI always receives `{ session, turns }`. */
export function parseChatHistoryResponse(raw: unknown): ChatHistoryResponse | null {
  if (isChatHistoryResponse(raw)) {
    return raw;
  }

  if (isRecord(raw) && isChatHistoryResponse(raw.data)) {
    return raw.data;
  }

  logAiChat('parse', 'chat history parse failed', {
    rawType: raw === null ? 'null' : typeof raw,
    topLevelKeys: isRecord(raw) ? Object.keys(raw) : undefined,
  });
  return null;
}

/** Unwraps common API envelopes for chat-query responses. */
export function parseChatQueryResponse(raw: unknown): ChatQueryResponse | null {
  if (isChatQueryResponse(raw)) {
    return raw;
  }

  if (isRecord(raw) && isChatQueryResponse(raw.data)) {
    return raw.data;
  }

  logAiChat('parse', 'chat query parse failed', {
    rawType: raw === null ? 'null' : typeof raw,
    topLevelKeys: isRecord(raw) ? Object.keys(raw) : undefined,
  });
  return null;
}

export function getChatApiErrorMessage(raw: unknown, fallback: string): string {
  return getResponseMessage(raw) ?? fallback;
}
