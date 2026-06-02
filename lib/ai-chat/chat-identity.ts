import {
  STORAGE_CHAT_UNIQUE_ID,
  STORAGE_EFFECTIVE_CHAT_USER_ID,
} from '@/lib/constants/api-keys';

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function readStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(key)?.trim();
  return value || null;
}

function writeStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, value);
}

function removeStorage(key: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

/** Returns persisted effective user id from chat-query promotion, if any. */
export function getEffectiveChatUserId(): string | null {
  return readStorage(STORAGE_EFFECTIVE_CHAT_USER_ID);
}

/** Persists effective user id after chat-query promotion. */
export function setEffectiveChatUserId(userId: string): void {
  const trimmed = userId.trim();
  if (!trimmed) return;
  writeStorage(STORAGE_EFFECTIVE_CHAT_USER_ID, trimmed);
}

/** Removes guest chat id once the user is promoted to an effective id. */
export function clearChatUniqueId(): void {
  removeStorage(STORAGE_CHAT_UNIQUE_ID);
}

/** Clears both guest and effective chat identity storage (used on logout). */
export function clearChatIdentityStorage(): void {
  removeStorage(STORAGE_CHAT_UNIQUE_ID);
  removeStorage(STORAGE_EFFECTIVE_CHAT_USER_ID);
}

/** Guest sessions use a UUID; promoted/authenticated sessions use a 10-digit mobile. */
export function isGuestChatUserId(userId: string): boolean {
  return !/^\d{10}$/.test(userId.trim());
}

/** Reads or creates a stable anonymous chat id for guest sessions. */
export function getOrCreateChatUniqueId(): string {
  const existing = readStorage(STORAGE_CHAT_UNIQUE_ID);
  if (existing) return existing;

  const nextId = generateUUID();
  writeStorage(STORAGE_CHAT_UNIQUE_ID, nextId);
  return nextId;
}

interface ResolveChatUserIdParams {
  isAuthenticated: boolean;
  phoneNumber?: string | null;
}

/**
 * Resolves userId for chat-query / chat-history:
 * 1. effectiveUserId (after promotion)
 * 2. phone number (site-authenticated, before promotion)
 * 3. chatuniqueid (guest)
 */
export function resolveChatUserId({
  isAuthenticated,
  phoneNumber,
}: ResolveChatUserIdParams): string {
  const effectiveUserId = getEffectiveChatUserId();
  if (effectiveUserId) return effectiveUserId;

  const normalizedPhone = phoneNumber?.trim();
  if (isAuthenticated && normalizedPhone) return normalizedPhone;

  return getOrCreateChatUniqueId();
}
