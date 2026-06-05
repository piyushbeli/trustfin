import type { CheckStatusAllResponse, LenderOfferStatus } from '@/types/wecredit';

export type AiChatInputType = 'number' | 'text' | 'date' | 'select';

/** Backend-driven bot stages after field capture (plus field_capture:* while capturing). */
export type AiChatBotStage =
  | 'completed'
  | 'offer_received'
  | 'utm_click'
  | `field_capture:${string}`;

export interface AiChatOption {
  label: string;
  value: string;
}

export interface AiChatValidationConfig {
  errorMessage?: string | null;
  regex?: string | null;
  allowedValues?: string[] | null;
}

export interface AiChatNextFieldConfig {
  field: string;
  label: string;
  inputType: AiChatInputType;
  uiType?: string;
  required: boolean;
  placeholder?: string;
  options: AiChatOption[];
  validation?: AiChatValidationConfig;
}

export interface AiChatFieldCaptureStatus {
  requiredFields: string[];
  optionalFields: string[];
  capturedFields: string[];
  missingFields: string[];
  nextField?: string | null;
  nextQuestion?: string | null;
  nextFieldConfig?: AiChatNextFieldConfig | null;
}

export interface AiChatSession {
  userId: string;
  organizationCode: string;
  channel: string;
  stage: string;
  intent?: string | null;
  nextField?: string | null;
  pendingQuestion?: string | null;
  pendingField?: string | null;
  isFieldCaptureActive: boolean;
  isCompleted: boolean;
  shouldAskNextQuestion: boolean;
  updatedAt: string;
}

export type AiChatTurnType = 'chat' | 'field' | 'field_help' | 'offer';

/** Unified chat-history turn shape from the AI assistant API. */
export interface AiChatHistoryTurn {
  turnId: string;
  turnType: AiChatTurnType;
  userQuery?: string;
  assistantResponse?: string;
  askedQuestion?: string;
  createdAt: string;
  /** Persisted check-status payload when turnType is `offer` (chat-history uses `offer`). */
  offer?: CheckStatusAllResponse;
  /** @deprecated Prefer `offer` — some responses used offerData */
  offerData?: LenderOfferStatus[] | CheckStatusAllResponse;
  // Legacy / optional metadata
  field?: string;
  userAnswer?: string;
  normalizedValue?: string;
  intent?: string | null;
  stageBefore?: string | null;
  stageAfter?: string | null;
  fieldValueStored?: boolean;
  validation?: {
    isValid: boolean;
    errorMessage?: string | null;
  };
}

export type AiChatTurn = AiChatHistoryTurn;

/** @deprecated Use AiChatHistoryTurn */
export type AiChatConversationTurn = AiChatHistoryTurn;

/** @deprecated Use AiChatHistoryTurn */
export type AiChatFieldTurn = AiChatHistoryTurn;

export interface ChatHistoryResponse {
  session: AiChatSession;
  turns: AiChatTurn[];
}

export interface ChatHistoryParams {
  userId: string;
  organizationCode: string;
  channel: string;
  sessionId?: string;
  mobile?: string;
}

export interface ChatQueryPayload {
  userId: string;
  organizationCode: string;
  channel: string;
  query: string;
  field?: string;
  sessionId?: string;
  mobile?: string;
}

/** Messages rendered in the chat modal (text bubbles or offer blocks). */
export type AiChatRenderableMessage =
  | {
      kind: 'text';
      id: string;
      role: 'assistant' | 'user';
      text: string;
    }
  | {
      kind: 'offer_list';
      id: string;
      offers: LenderOfferStatus[];
      /** From check-status isRehitLenders — show Explore More when true. */
      canReHit?: boolean;
    };

export interface ChatQueryResponse {
  intent?: string | null;
  answer: string;
  organizationCode: string;
  lenderCode?: string | null;
  channel: string;
  captureFields: boolean;
  shouldAskNextQuestion: boolean;
  escalateToHuman: boolean;
  /** Returned when guest chat promotes to authenticated user */
  effectiveUserId?: string | null;
  authToken?: string | null;
  mobile?: string | null;
  fieldCaptureStatus?: AiChatFieldCaptureStatus | null;
  validation?: {
    isValid: boolean;
    errorMessage?: string | null;
  };
  /** Primary stage from chat-query; prefer over local inference. */
  stage?: string;
  /** Some chat-query envelopes nest the same session object as chat-history. */
  session?: Pick<
    AiChatSession,
    'stage' | 'nextField' | 'pendingField' | 'pendingQuestion' | 'isCompleted' | 'isFieldCaptureActive'
  >;
}

/** Identifiers passed from in-chat offer UI when recording UTM / chat-offer. */
export interface AiChatOfferClickContext {
  userId: string;
  /** Reloads chat-history after check-status / chat-offer (e.g. UTM click). */
  onLiveOffersUpdated?: (offers: LenderOfferStatus[]) => void;
}
