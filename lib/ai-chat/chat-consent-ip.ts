import { fetchUserIp, prefetchUserIp } from '@/lib/utils/user-ip';

/** Starts shared ipify fetch when the chat modal opens (deduped app-wide). */
export const prefetchChatConsentIp = (): Promise<string> => prefetchUserIp();

/** Returns the shared consent IP used by chat API payloads. */
export const getChatConsentIp = (): Promise<string> => fetchUserIp();
