import { setAuthToken, setMobile } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';

export interface CompleteAppLoginParams {
  token: string;
  mobile: string;
  userId: string;
}

/**
 * Completes app login by syncing auth cookies + Zustand store.
 * Used by both OTP verify flow and chat-query promotion so behavior stays consistent.
 *
 * Note: we intentionally do not set `name` on the client. `User.name` remains optional.
 */
export function completeAppLogin({ token, mobile, userId }: CompleteAppLoginParams): void {
  const normalizedToken = token.trim();
  const normalizedMobile = mobile.trim();
  const normalizedUserId = userId.trim();

  setAuthToken(normalizedToken);
  setMobile(normalizedMobile);

  useAuthStore.getState().setUser(
    {
      id: normalizedUserId,
      phoneNumber: normalizedMobile,
    },
    normalizedToken,
  );
}

