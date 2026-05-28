export type AiChatInputType = 'number' | 'text' | 'date' | 'select';

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

interface BaseAiChatTurn {
  turnId: string;
  turnType: 'chat' | 'field';
  intent?: string | null;
  stageBefore?: string | null;
  stageAfter?: string | null;
  fieldValueStored?: boolean;
  createdAt: string;
}

export interface AiChatConversationTurn extends BaseAiChatTurn {
  turnType: 'chat';
  userQuery: string;
  assistantResponse: string;
}

export interface AiChatFieldTurn extends BaseAiChatTurn {
  turnType: 'field';
  field: string;
  askedQuestion?: string;
  userAnswer?: string;
  userQuery?: string;
  normalizedValue?: string;
  assistantResponse?: string;
  validation?: {
    isValid: boolean;
    errorMessage?: string | null;
  };
}

export type AiChatTurn = AiChatConversationTurn | AiChatFieldTurn;

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

export interface ChatQueryResponse {
  intent?: string | null;
  answer: string;
  organizationCode: string;
  lenderCode?: string | null;
  channel: string;
  captureFields: boolean;
  shouldAskNextQuestion: boolean;
  escalateToHuman: boolean;
  fieldCaptureStatus?: AiChatFieldCaptureStatus | null;
  validation?: {
    isValid: boolean;
    errorMessage?: string | null;
  };
}
