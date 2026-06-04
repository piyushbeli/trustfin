import { checkStatusAll } from '@/lib/api/wecredit';
import { submitChatOffer } from '@/lib/api/ai-chat-service';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import type { CheckStatusAllResponse, LenderOfferStatus } from '@/types/wecredit';

const ORG_CODE = 'wecredit';
const CHANNEL = 'wecredit_bot';

export interface RunCheckStatusForChatParams {
  mobile: string;
  token: string;
  userId: string;
  signal?: AbortSignal;
  onCheckStatusSuccess?: (data: CheckStatusAllResponse, lenders: LenderOfferStatus[]) => void;
}

export interface RunCheckStatusForChatResult {
  success: boolean;
  data?: CheckStatusAllResponse;
  lenderCount: number;
  canReHit: boolean;
  statusCode?: string;
  error?: string;
}

/** Poll tick: check-status-all only. chat-offer runs separately once lenders exist. */
export const runCheckStatusForChat = async ({
  mobile,
  token,
  userId,
  signal,
  onCheckStatusSuccess,
}: RunCheckStatusForChatParams): Promise<RunCheckStatusForChatResult> => {
  // Network tab: POST to /api/forward with body.endpoint === 'check-status-all' (not ai-assistant URL).
  logAiChat('offer-sync', 'calling checkStatusAll (api/forward)', { userId, mobile });

  const statusResult = await checkStatusAll(mobile, token, signal);

  if (!statusResult.success || !statusResult.data) {
    logAiChat('offer-sync', 'checkStatusAll failed', {
      userId,
      error: statusResult.error ?? null,
    });
    return {
      success: false,
      lenderCount: 0,
      canReHit: true,
      error: statusResult.error,
    };
  }

  const data = statusResult.data;
  const lenders = data.lenders ?? [];

  logAiChat('offer-sync', 'checkStatusAll success', {
    userId,
    lenderCount: lenders.length,
    statusCode: data.statusCode,
    isRehitLenders: data.isRehitLenders,
  });

  onCheckStatusSuccess?.(data, lenders);

  return {
    success: true,
    data,
    lenderCount: lenders.length,
    canReHit: data.isRehitLenders === 0,
    statusCode: data.statusCode,
  };
};

export interface PersistChatOfferParams {
  mobile: string;
  userId: string;
  checkStatusResponse: CheckStatusAllResponse;
  signal?: AbortSignal;
}

/** Called once when check-status returns lenders — persists for chat-history on next modal open. */
export const persistChatOfferForChat = async ({
  mobile,
  userId,
  checkStatusResponse,
  signal,
}: PersistChatOfferParams): Promise<{ success: boolean; error?: string }> => {
  logAiChat('offer-sync', 'submitChatOffer starting (lenders ready)', {
    userId,
    lenderCount: checkStatusResponse.lenders?.length ?? 0,
  });

  const saveResult = await submitChatOffer(
    {
      userId,
      organizationCode: ORG_CODE,
      channel: CHANNEL,
      mobile,
      offerData: checkStatusResponse,
    },
    signal,
  );

  if (!saveResult.success) {
    logAiChat('offer-sync', 'submitChatOffer failed', {
      userId,
      error: saveResult.error ?? null,
    });
    return { success: false, error: saveResult.error };
  }

  logAiChat('offer-sync', 'submitChatOffer succeeded — caller should reload chat-history', {
    userId,
    lenderCount: checkStatusResponse.lenders?.length ?? 0,
  });

  return { success: true };
};
