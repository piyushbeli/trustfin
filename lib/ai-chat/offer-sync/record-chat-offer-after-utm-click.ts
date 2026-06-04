import { getCookie } from 'cookies-next';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import {
  persistChatOfferForChat,
  runCheckStatusForChat,
} from '@/lib/ai-chat/offer-sync/run-check-and-save-offer';
import { updateUtmClicked } from '@/lib/api/wecredit';
import { STORAGE_AUTH_TOKEN, STORAGE_MOBILE } from '@/lib/constants/api-keys';
import type { AiChatOfferClickContext } from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

export interface RecordChatOfferAfterUtmClickParams extends AiChatOfferClickContext {
  offer: LenderOfferStatus;
  mobile?: string;
  token?: string;
}

export interface RecordChatOfferAfterUtmClickResult {
  openedUtm: boolean;
  utmUpdated: boolean;
  chatOfferPersisted: boolean;
}

/**
 * In-chat UTM click: update wecredit UTM status, refresh check-status-all,
 * persist via chat-offer, reload chat-history, then open the link.
 */
export const recordChatOfferAfterUtmClick = async ({
  offer,
  userId,
  onLiveOffersUpdated,
  mobile: mobileParam,
  token: tokenParam,
}: RecordChatOfferAfterUtmClickParams): Promise<RecordChatOfferAfterUtmClickResult> => {
  const emptyResult: RecordChatOfferAfterUtmClickResult = {
    openedUtm: false,
    utmUpdated: false,
    chatOfferPersisted: false,
  };

  const utmLink = offer.utmLink?.trim();
  if (!utmLink) {
    return emptyResult;
  }

  const mobile = mobileParam ?? (getCookie(STORAGE_MOBILE) as string | undefined);
  const token = tokenParam ?? (getCookie(STORAGE_AUTH_TOKEN) as string | undefined);
  const lenderName = offer.lenderName?.trim();
  const isUtmClicked = offer.wcStatus === 'UTM_CLICKED';

  if (!mobile || !token || !userId) {
    logAiChat('offer-sync', 'utm click skipped — missing auth or userId', {
      userId: userId || null,
      hasMobile: Boolean(mobile),
      hasToken: Boolean(token),
    });
    window.open(utmLink, '_blank', 'noopener,noreferrer');
    return { ...emptyResult, openedUtm: true };
  }

  let utmUpdated = false;

  if (lenderName && !isUtmClicked) {
    const utmResult = await updateUtmClicked(mobile, lenderName, token);
    utmUpdated = utmResult.success;
    logAiChat('offer-sync', 'updateUtmClicked after in-chat offer click', {
      userId,
      lenderName,
      success: utmResult.success,
      error: utmResult.error ?? null,
    });
  }

  const checkResult = await runCheckStatusForChat({
    mobile,
    token,
    userId,
  });

  if (!checkResult.success || !checkResult.data) {
    logAiChat('offer-sync', 'utm click — check-status failed, opening UTM without chat-offer', {
      userId,
      lenderName: lenderName ?? null,
      error: checkResult.error ?? null,
    });
    window.open(utmLink, '_blank', 'noopener,noreferrer');
    return { ...emptyResult, openedUtm: true, utmUpdated };
  }

  const persistResult = await persistChatOfferForChat({
    mobile,
    userId,
    checkStatusResponse: checkResult.data,
  });

  logAiChat('offer-sync', 'utm click — chat-offer persist finished', {
    userId,
    lenderName: lenderName ?? null,
    success: persistResult.success,
    lenderCount: checkResult.lenderCount,
  });

  if (persistResult.success) {
    await onLiveOffersUpdated?.(checkResult.data.lenders ?? []);
  }

  window.open(utmLink, '_blank', 'noopener,noreferrer');

  return {
    openedUtm: true,
    utmUpdated,
    chatOfferPersisted: persistResult.success,
  };
};
