import type { AiChatFieldCaptureStatus, AiChatNextFieldConfig } from '@/types/ai-chat';

type RawFieldCaptureStatus = AiChatFieldCaptureStatus & {
  nextFieldConfigs?: AiChatNextFieldConfig[];
  nextFields?: string[];
};

/** Normalizes API variants (e.g. nextFieldConfigs array) into the shape the UI expects. */
export const normalizeFieldCaptureStatus = (
  status: AiChatFieldCaptureStatus | null | undefined,
): AiChatFieldCaptureStatus | null => {
  if (!status) {
    return null;
  }

  const raw = status as RawFieldCaptureStatus;

  return {
    ...status,
    nextField: status.nextField ?? raw.nextFields?.[0] ?? null,
    nextFieldConfig: status.nextFieldConfig ?? raw.nextFieldConfigs?.[0] ?? null,
  };
};
