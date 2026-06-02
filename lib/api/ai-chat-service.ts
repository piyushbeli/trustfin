import { getCookie } from 'cookies-next';
import { wecreditConfig } from '@/lib/config';
import { ENDPOINTS, HEADER_AGENT_HOST, STORAGE_AUTH_TOKEN } from '@/lib/constants/api-keys';
import { getErrorMessage, isAbortError } from '@/lib/utils/error-helpers';
import type {
  ChatHistoryParams,
  ChatHistoryResponse,
  ChatQueryPayload,
  ChatQueryResponse,
} from '@/types/ai-chat';
import { fetchUserIp } from './auth-service';
import { fetchMockChatHistory, submitMockChatQuery } from './ai-chat-mock';

const AI_CHAT_ENV_BASE = wecreditConfig.aiChatUrl;

// TODO: Remove this once we have the env URL
const SHOULD_USE_STATIC_POSTMAN_FLOW = true

const AI_CHAT_BASE = AI_CHAT_ENV_BASE;
const SHOULD_USE_MOCK = process.env.NEXT_PUBLIC_AI_CHAT_MOCK === 'true';

interface ChatServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
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

async function parseResponse<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function requestWithFallback<T>(
  request: RequestInfo | URL,
  requestInit: RequestInit,
  mockResolver: () => Promise<T>,
): Promise<ChatServiceResult<T>> {
  if (SHOULD_USE_MOCK) {
    const data = await mockResolver();
    return { success: true, data };
  }

  try {
    const response = await fetch(request, requestInit);

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
  if (SHOULD_USE_STATIC_POSTMAN_FLOW) {
    const historyUrl = new URL(AI_CHAT_BASE);
    historyUrl.searchParams.set('userId', params.userId);
    historyUrl.searchParams.set('organizationCode', params.organizationCode);
    historyUrl.searchParams.set('channel', params.channel);
    historyUrl.searchParams.set('endpoint', ENDPOINTS.AI_ASSISTANT.CHAT_HISTORY);
    if (params.sessionId) {
      historyUrl.searchParams.set('sessionId', params.sessionId);
    }

    return requestWithFallback<ChatHistoryResponse>(
      historyUrl.toString(),
      {
        method: 'GET',
        headers: buildHeaders(params.mobile),
        signal,
      },
      () => fetchMockChatHistory(params),
    );
  }

  return requestWithFallback<ChatHistoryResponse>(
    `${AI_CHAT_BASE}/${ENDPOINTS.AI_ASSISTANT.CHAT_HISTORY}`,
    {
      method: 'POST',
      headers: buildHeaders(params.mobile),
      body: JSON.stringify(params),
      signal,
    },
    () => fetchMockChatHistory(params),
  );
}

export async function submitChatQuery(
  payload: ChatQueryPayload,
  signal?: AbortSignal,
): Promise<ChatServiceResult<ChatQueryResponse>> {
  const consentIp = await fetchUserIp();

  if (SHOULD_USE_STATIC_POSTMAN_FLOW) {
    const staticQueryPayload = {
      endpoint: ENDPOINTS.AI_ASSISTANT.CHAT_QUERY,
      userId: payload.userId,
      organizationCode: payload.organizationCode,
      channel: payload.channel,
      query: payload.query,
      ...(payload.field ? { field: payload.field } : {}),
      ...(payload.sessionId ? { sessionId: payload.sessionId } : {}),
    };

    return requestWithFallback<ChatQueryResponse>(
      AI_CHAT_BASE,
      {
        method: 'POST',
        headers: buildHeaders(payload.mobile, consentIp),
        body: JSON.stringify(staticQueryPayload),
        signal,
      },
      () => submitMockChatQuery(payload),
    );
  }

  return requestWithFallback<ChatQueryResponse>(
    `${AI_CHAT_BASE}/${ENDPOINTS.AI_ASSISTANT.CHAT_QUERY}`,
    {
      method: 'POST',
      headers: buildHeaders(payload.mobile, consentIp),
      body: JSON.stringify(payload),
      signal,
    },
    () => submitMockChatQuery(payload),
  );
}
