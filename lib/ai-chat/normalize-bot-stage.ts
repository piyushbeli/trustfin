import type { AiChatBotStage } from '@/types/ai-chat';

/** Single place for backend typos/aliases so stage effects and offer-sync stay consistent. */
const STAGE_ALIASES: Record<string, AiChatBotStage> = {
  complete: 'completed',
  offerreceived: 'offer_received',
  offerreceieved: 'offer_received',
  offer_received: 'offer_received',
  utmclicked: 'utm_click',
  utm_clicked: 'utm_click',
};

export const normalizeBotStage = (stage: string | null | undefined): string => {
  if (!stage) {
    return '';
  }

  const trimmed = stage.trim();
  const alias = STAGE_ALIASES[trimmed.toLowerCase()];
  return alias ?? trimmed;
};

export const isFieldCaptureStage = (stage: string | null | undefined): boolean =>
  normalizeBotStage(stage).startsWith('field_capture:');

export const isOfferSyncStage = (stage: string | null | undefined): boolean =>
  normalizeBotStage(stage) === 'completed';

export const isOfferReceivedStage = (stage: string | null | undefined): boolean =>
  normalizeBotStage(stage) === 'offer_received';

export const isUtmClickStage = (stage: string | null | undefined): boolean =>
  normalizeBotStage(stage) === 'utm_click';

/** Poll check-status-all only when backend session.stage is `completed` (chat-query or chat-history). */
export const shouldPollOffersInChat = (stage: string | null | undefined): boolean =>
  isOfferSyncStage(stage);
