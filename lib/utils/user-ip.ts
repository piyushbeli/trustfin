const IPIFY_URL = 'https://api.ipify.org?format=json';
const FALLBACK_IP = '127.0.0.1';

/** In-memory cache for the current page load; cleared only on full browser reload. */
let cachedUserIp: string | null = null;
let fetchPromise: Promise<string> | null = null;

async function fetchIpFromApi(): Promise<string> {
  try {
    const response = await fetch(IPIFY_URL);
    if (response.ok) {
      const data = (await response.json()) as { ip?: string };
      return data.ip || FALLBACK_IP;
    }
  } catch {
    // Network or parse failure — use placeholder so callers can continue.
  }
  return FALLBACK_IP;
}

/**
 * Starts the ipify request once per page load. Safe to call from multiple features
 * (chat modal, lead form, OTP, etc.) — concurrent callers share the same promise.
 */
export function prefetchUserIp(): Promise<string> {
  if (cachedUserIp) {
    return Promise.resolve(cachedUserIp);
  }

  if (fetchPromise) {
    return fetchPromise;
  }

  fetchPromise = fetchIpFromApi()
    .then((ip) => {
      cachedUserIp = ip;
      return ip;
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

/**
 * Returns the cached IP when available; otherwise fetches once and stores it.
 */
export async function fetchUserIp(): Promise<string> {
  return prefetchUserIp();
}
