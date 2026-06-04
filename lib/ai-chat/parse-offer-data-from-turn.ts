import type { AiChatHistoryTurn } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

function normalizeLenderRow(item: Record<string, unknown>): LenderOfferStatus | null {
  const lenderName =
    (typeof item.lenderName === 'string' && item.lenderName) ||
    (typeof item.lender_name === 'string' && item.lender_name) ||
    (typeof item.name === 'string' && item.name) ||
    null;

  if (!lenderName) {
    return null;
  }

  const rawStatus = item.wcStatus ?? item.wc_status ?? item.status;
  const wcStatus =
    typeof rawStatus === 'string' ? rawStatus.toUpperCase().replace(/\s+/g, '_') : undefined;

  return {
    ...(item as unknown as LenderOfferStatus),
    lenderName,
    ...(wcStatus ? { wcStatus: wcStatus as LenderOfferStatus['wcStatus'] } : {}),
  };
}

function isLenderOfferArray(value: unknown): value is LenderOfferStatus[] {
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }

  return value.some(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      normalizeLenderRow(item as Record<string, unknown>) !== null,
  );
}

function normalizeLenderArray(value: unknown): LenderOfferStatus[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) =>
      typeof item === 'object' && item !== null
        ? normalizeLenderRow(item as Record<string, unknown>)
        : null,
    )
    .filter((item): item is LenderOfferStatus => item !== null);
}

/** Tolerates offerData as lenders[], check-status envelope, or JSON string from API. */
export const parseOfferDataFromTurn = (offerData: unknown): LenderOfferStatus[] => {
  if (typeof offerData === 'string') {
    try {
      return parseOfferDataFromTurn(JSON.parse(offerData));
    } catch {
      return [];
    }
  }

  if (isLenderOfferArray(offerData)) {
    return normalizeLenderArray(offerData);
  }

  if (typeof offerData === 'object' && offerData !== null) {
    const record = offerData as Record<string, unknown>;
    const nestedLenders = record.lenders ?? record.offerData ?? record.data;
    const normalized = normalizeLenderArray(nestedLenders);
    if (normalized.length > 0) {
      return normalized;
    }
  }

  return [];
};

/** chat-history returns `offer`; older payloads used `offerData`. */
export const getOfferPayloadFromTurn = (turn: AiChatHistoryTurn): unknown =>
  turn.offer ?? turn.offerData ?? null;

export const parseOffersFromHistoryTurn = (turn: AiChatHistoryTurn): LenderOfferStatus[] =>
  parseOfferDataFromTurn(getOfferPayloadFromTurn(turn));

/** Whether more lenders can be checked (isRehitLenders === 0 on check-status envelope). */
export const parseCanReHitFromOfferPayload = (offerData: unknown): boolean => {
  if (typeof offerData === 'string') {
    try {
      return parseCanReHitFromOfferPayload(JSON.parse(offerData));
    } catch {
      return false;
    }
  }

  if (typeof offerData !== 'object' || offerData === null) {
    return false;
  }

  const record = offerData as Record<string, unknown>;
  const raw =
    record.isRehitLenders ?? record.is_rehit_lenders ?? record.isReHitLenders;

  if (typeof raw === 'number') {
    return raw === 0;
  }

  if (typeof raw === 'string') {
    const parsed = Number(raw);
    return !Number.isNaN(parsed) && parsed === 0;
  }

  return false;
};

export const parseCanReHitFromHistoryTurn = (turn: AiChatHistoryTurn): boolean =>
  parseCanReHitFromOfferPayload(getOfferPayloadFromTurn(turn));
