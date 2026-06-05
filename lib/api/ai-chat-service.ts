import { getCookie } from 'cookies-next';
import { wecreditConfig } from '@/lib/config';
import {
  getChatApiErrorMessage,
  parseChatHistoryResponse,
  parseChatQueryResponse,
} from '@/lib/ai-chat/parse-chat-api-response';
import { ENDPOINTS, HEADER_AGENT_HOST, STORAGE_AUTH_TOKEN } from '@/lib/constants/api-keys';
import { getErrorMessage, isAbortError } from '@/lib/utils/error-helpers';
import type {
  ChatHistoryParams,
  ChatHistoryResponse,
  ChatQueryPayload,
  ChatQueryResponse,
} from '@/types/ai-chat';
import type { CheckStatusAllResponse } from '@/types/wecredit';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { getChatConsentIp } from '@/lib/ai-chat/chat-consent-ip';

const AI_CHAT_BASE = wecreditConfig.aiChatUrl;
const CHAT_HISTORY_NOT_FOUND_ERROR = 'chat_history_not_found';

interface ChatServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface RequestChatApiOptions {
  notFoundError?: string;
}

function buildHeaders(mobile?: string, consentIp?: string): Record<string, string> {
  const token = getCookie(STORAGE_AUTH_TOKEN);
  const headers: Record<string, string> = {
    ...wecreditConfig.headers,
    Accept: 'application/json',
  };

  if (mobile) {
    headers.mobile = mobile;
  }

  if (consentIp) {
    headers.consentIp = consentIp;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  delete headers[HEADER_AGENT_HOST];

  return headers;
}

async function parseResponseJson(response: Response): Promise<unknown | null> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function isChatHistoryNotFoundResponse(responseData: unknown, status: number): boolean {
  if (status === 404) {
    return true;
  }

  const message = getChatApiErrorMessage(responseData, '').toLowerCase();
  return message.includes('chat history not found') || message.includes('history not found');
}

async function requestChatApi<T>(
  request: RequestInfo | URL,
  requestInit: RequestInit,
  parseData: (raw: unknown) => T | null,
  options?: RequestChatApiOptions,
): Promise<ChatServiceResult<T>> {
  const requestUrl = String(request);
  const requestMethod = requestInit.method ?? 'GET';

  try {
    const response = await fetch(request, requestInit);
    const responseData = await parseResponseJson(response);
    const parsedData = responseData ? parseData(responseData) : null;
    const isHistoryNotFound = isChatHistoryNotFoundResponse(responseData, response.status);

    if (response.ok && parsedData) {
      return { success: true, data: parsedData };
    }

    if (options?.notFoundError && isHistoryNotFound) {
      return { success: false, error: options.notFoundError };
    }

    const error = getChatApiErrorMessage(
      responseData,
      `AI chat request failed with status ${response.status}`,
    );
    return { success: false, error };
  } catch (error) {
    if (isAbortError(error)) {
      return { success: false, error: 'aborted' };
    }

    const errorMessage = getErrorMessage(error, 'Failed to connect to AI chat service.');
    logAiChat('service', 'request failed', {
      method: requestMethod,
      url: requestUrl,
      error: errorMessage,
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function fetchChatHistory(
  params: ChatHistoryParams,
  signal?: AbortSignal,
): Promise<ChatServiceResult<ChatHistoryResponse>> {
  const historyUrl = new URL(AI_CHAT_BASE);
  historyUrl.searchParams.set('userId', params.userId);
  historyUrl.searchParams.set('organizationCode', params.organizationCode);
  historyUrl.searchParams.set('channel', params.channel);
  historyUrl.searchParams.set('endpoint', ENDPOINTS.AI_ASSISTANT.CHAT_HISTORY);
  if (params.sessionId) {
    historyUrl.searchParams.set('sessionId', params.sessionId);
  }

  return requestChatApi<ChatHistoryResponse>(
    historyUrl.toString(),
    {
      method: 'GET',
      headers: buildHeaders(params.mobile),
      signal,
    },
    parseChatHistoryResponse,
    { notFoundError: CHAT_HISTORY_NOT_FOUND_ERROR },
  );
}

export interface SubmitChatOfferParams {
  userId: string;
  organizationCode: string;
  channel: string;
  mobile?: string;
  sessionId?: string;
  /** Full check-status-all payload — persisted as the offer turn in chat-history. */
  offerData: CheckStatusAllResponse;
}

function parseChatOfferResponse(_raw: unknown): { saved: boolean } | null {
  // chat-offer may return an empty or varying envelope; treat HTTP 200 as success.
  return { saved: true };
}

/** Persists check-status offers via chat-offer; backend advances stage to offerreceived in history. */
export async function submitChatOffer(
  params: SubmitChatOfferParams,
  signal?: AbortSignal,
): Promise<ChatServiceResult<{ saved: boolean }>> {
  const consentIp = await getChatConsentIp();

  const offerPayload = {
    endpoint: ENDPOINTS.AI_ASSISTANT.CHAT_OFFER,
    userId: params.userId,
    organizationCode: params.organizationCode,
    channel: params.channel,
    offerData: params.offerData,
    ...(params.sessionId ? { sessionId: params.sessionId } : {}),
  };

  return requestChatApi<{ saved: boolean }>(
    AI_CHAT_BASE,
    {
      method: 'POST',
      headers: buildHeaders(params.mobile, consentIp),
      body: JSON.stringify(offerPayload),
      signal,
    },
    parseChatOfferResponse,
  );
}

export async function submitChatQuery(
  payload: ChatQueryPayload,
  signal?: AbortSignal,
): Promise<ChatServiceResult<ChatQueryResponse>> {
  const consentIp = await getChatConsentIp();

  const queryPayload = {
    endpoint: ENDPOINTS.AI_ASSISTANT.CHAT_QUERY,
    userId: payload.userId,
    organizationCode: payload.organizationCode,
    channel: payload.channel,
    query: payload.query,
    ...(payload.field ? { field: payload.field } : {}),
    ...(payload.sessionId ? { sessionId: payload.sessionId } : {}),
  };

  return requestChatApi<ChatQueryResponse>(
    AI_CHAT_BASE,
    {
      method: 'POST',
      headers: buildHeaders(payload.mobile, consentIp),
      body: JSON.stringify(queryPayload),
      signal,
    },
    parseChatQueryResponse,
  );
}
