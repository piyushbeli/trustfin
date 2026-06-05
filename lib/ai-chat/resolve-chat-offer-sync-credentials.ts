import { getCookie } from 'cookies-next';
import { getEffectiveChatUserId } from '@/lib/ai-chat/chat-identity';
import { STORAGE_AUTH_TOKEN, STORAGE_MOBILE } from '@/lib/constants/api-keys';

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export interface ChatOfferSyncCredentials {
  mobile?: string;
  token?: string;
}

interface ResolveChatOfferSyncCredentialsParams {
  phoneNumber?: string | null;
  /** chatUserId is often the captured 10-digit mobile after field capture. */
  chatUserId?: string | null;
  /** Persisted session userId from chat-history / chat-query (often the mobile). */
  sessionUserId?: string | null;
  /** Fresh values from chat-query promotion (before cookies propagate). */
  responseMobile?: string | null;
  responseToken?: string | null;
}

export const normalizeIndianMobile = (value: string | null | undefined): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed || !INDIAN_MOBILE_REGEX.test(trimmed)) {
    return undefined;
  }
  return trimmed;
};

/**
 * Resolves mobile + token for in-chat check-status-all.
 * Chat guests are often promoted on the same response that sets stage to `completed`.
 */
export const resolveChatOfferSyncCredentials = ({
  phoneNumber,
  chatUserId,
  sessionUserId,
  responseMobile,
  responseToken,
}: ResolveChatOfferSyncCredentialsParams): ChatOfferSyncCredentials => {
  const token =
    responseToken?.trim() ||
    (getCookie(STORAGE_AUTH_TOKEN) as string | undefined)?.trim() ||
    undefined;

  const effectiveUserId = getEffectiveChatUserId();
  const mobile =
    normalizeIndianMobile(responseMobile) ??
    normalizeIndianMobile(phoneNumber) ??
    normalizeIndianMobile(getCookie(STORAGE_MOBILE) as string | undefined) ??
    normalizeIndianMobile(effectiveUserId) ??
    normalizeIndianMobile(sessionUserId) ??
    normalizeIndianMobile(chatUserId);

  return { mobile, token };
};

/** check-status-all only requires mobile (same gate as /offers page). */
export const canRunChatOfferSync = (credentials: ChatOfferSyncCredentials): boolean =>
  Boolean(credentials.mobile);
