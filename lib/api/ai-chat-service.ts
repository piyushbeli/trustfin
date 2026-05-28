import { getCookie } from 'cookies-next';
import { wecreditConfig } from '@/lib/config';
import { STORAGE_AUTH_TOKEN } from '@/lib/constants/api-keys';
import { getErrorMessage, isAbortError } from '@/lib/utils/error-helpers';
import type {
  ChatHistoryParams,
  ChatHistoryResponse,
  ChatQueryPayload,
  ChatQueryResponse,
} from '@/types/ai-chat';
import { fetchMockChatHistory, submitMockChatQuery } from './ai-chat-mock';

const AI_CHAT_BASE = process.env.NEXT_PUBLIC_AI_CHAT_API_URL ?? `${wecreditConfig.apiUrl}/api/ai-chat`;
const SHOULD_USE_MOCK = process.env.NEXT_PUBLIC_AI_CHAT_MOCK === 'true';

interface ChatServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function buildHeaders(mobile?: string): Record<string, string> {
  const token = getCookie(STORAGE_AUTH_TOKEN);
  const headers: Record<string, string> = {
    ...wecreditConfig.headers,
    Accept: 'application/json',
  };

  if (mobile) {
    headers.mobile = mobile;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponse<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function requestWithFallback<T>(
  endpoint: string,
  body: Record<string, unknown>,
  mockResolver: () => Promise<T>,
  signal?: AbortSignal,
): Promise<ChatServiceResult<T>> {
  if (SHOULD_USE_MOCK) {
    const data = await mockResolver();
    return { success: true, data };
  }

  try {
    const response = await fetch(`${AI_CHAT_BASE}/${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(typeof body.mobile === 'string' ? body.mobile : undefined),
      body: JSON.stringify(body),
      signal,
    });

    const responseData = await parseResponse<T>(response);

    if (response.ok && responseData) {
      return { success: true, data: responseData };
    }

    if (response.status === 404) {
      const data = await mockResolver();
      return { success: true, data };
    }

    const error = `AI chat request failed with status ${response.status}`;
    return { success: false, error };
  } catch (error) {
    if (isAbortError(error)) {
      return { success: false, error: 'aborted' };
    }

    if (!SHOULD_USE_MOCK) {
      const data = await mockResolver();
      return { success: true, data };
    }

    return { success: false, error: getErrorMessage(error, 'Failed to connect to AI chat service.') };
  }
}

export async function fetchChatHistory(
  params: ChatHistoryParams,
  signal?: AbortSignal,
): Promise<ChatServiceResult<ChatHistoryResponse>> {
  return requestWithFallback<ChatHistoryResponse>(
    'chat-history',
    params as unknown as Record<string, unknown>,
    () => fetchMockChatHistory(params),
    signal,
  );
}

export async function submitChatQuery(
  payload: ChatQueryPayload,
  signal?: AbortSignal,
): Promise<ChatServiceResult<ChatQueryResponse>> {
  return requestWithFallback<ChatQueryResponse>(
    'chat-query',
    payload as unknown as Record<string, unknown>,
    () => submitMockChatQuery(payload),
    signal,
  );
}
