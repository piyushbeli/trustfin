import { completeAppLogin } from '@/lib/auth/complete-app-login';
import {
  clearChatUniqueId,
  getEffectiveChatUserId,
  setEffectiveChatUserId,
} from '@/lib/ai-chat/chat-identity';
import type { ChatQueryResponse } from '@/types/ai-chat';

export interface PromoteChatAuthResult {
  didPromote: boolean;
  effectiveUserId: string | null;
}

/**
 * When chat-query returns both effectiveUserId and authToken, promote the guest
 * session: clear chatuniqueid, persist effective id, and sync site auth cookies/store.
 */
export function promoteChatAuthFromResponse(data: ChatQueryResponse): PromoteChatAuthResult {
  const effectiveUserId = data.effectiveUserId?.trim() ?? '';
  const authToken = data.authToken?.trim() ?? '';

  if (!effectiveUserId || !authToken) {
    return { didPromote: false, effectiveUserId: getEffectiveChatUserId() };
  }

  const resolvedMobileFromResponse = data.mobile?.trim() ?? '';
  const isValidMobile = (value: string): boolean => /^[6-9]\d{9}$/.test(value);

  // Prefer backend-provided `mobile`, otherwise fall back when `effectiveUserId`
  // is itself a phone number.
  const resolvedMobile =
    resolvedMobileFromResponse && isValidMobile(resolvedMobileFromResponse)
      ? resolvedMobileFromResponse
      : isValidMobile(effectiveUserId)
        ? effectiveUserId
        : '';

  // Avoid half-login: without a valid mobile cookie, the app will treat the user as logged out.
  if (!resolvedMobile) {
    return { didPromote: false, effectiveUserId: getEffectiveChatUserId() };
  }

  const alreadyPromoted = getEffectiveChatUserId() === effectiveUserId;

  clearChatUniqueId();
  setEffectiveChatUserId(effectiveUserId);

  completeAppLogin({
    token: authToken,
    mobile: resolvedMobile,
    userId: effectiveUserId,
  });

  return { didPromote: !alreadyPromoted, effectiveUserId };
}
