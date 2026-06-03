import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { fetchUserIp } from '@/lib/api/auth-service';

/** In-memory cache for the current page load; cleared only on full browser reload. */
let cachedConsentIp: string | null = null;
let prefetchPromise: Promise<string> | null = null;

/** Starts ipify fetch once per page load (first modal open or first chat API call). */
export const prefetchChatConsentIp = (): Promise<string> => {
  if (cachedConsentIp) {
    return Promise.resolve(cachedConsentIp);
  }

  if (prefetchPromise) {
    return prefetchPromise;
  }

  prefetchPromise = fetchUserIp()
    .then((ip) => {
      cachedConsentIp = ip;
      logAiChat('service', 'consent IP prefetched for chat', { hasIp: Boolean(ip) });
      return ip;
    })
    .catch((error) => {
      logAiChat('service', 'consent IP prefetch failed — using placeholder', {
        error: error instanceof Error ? error.message : String(error),
      });
      cachedConsentIp = '127.0.0.1';
      return cachedConsentIp;
    })
    .finally(() => {
      prefetchPromise = null;
    });

  return prefetchPromise;
};

/** Returns prefetched IP; falls back to fetch if submit runs before prefetch finished. */
export const getChatConsentIp = async (): Promise<string> => {
  if (cachedConsentIp) {
    return cachedConsentIp;
  }

  return prefetchChatConsentIp();
};
